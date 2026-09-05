import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, isSupabaseServerConfigured } from '../../../lib/supabase/server';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

export const runtime = 'nodejs';

function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

interface RawSessionRow {
  id: string;
  title: string;
  messages: unknown[];
  created_at?: string;
  updated_at?: string;
}

function areRawSessionsDuplicates(a: RawSessionRow, b: RawSessionRow): boolean {
  const msgsA = Array.isArray(a.messages) ? a.messages : [];
  const msgsB = Array.isArray(b.messages) ? b.messages : [];

  if (msgsA.length === 0 && msgsB.length === 0) {
    return a.title === b.title;
  }
  if (msgsA.length === 0 || msgsB.length === 0) {
    return a.title === b.title;
  }

  const minLen = Math.min(msgsA.length, msgsB.length);
  for (let i = 0; i < minLen; i++) {
    const itemA = msgsA[i] as { sender?: string; content?: string } | undefined;
    const itemB = msgsB[i] as { sender?: string; content?: string } | undefined;
    if (!itemA || !itemB || itemA.sender !== itemB.sender || itemA.content !== itemB.content) {
      return false;
    }
  }

  return true;
}

export function deduplicateCloudSessions(rows: RawSessionRow[]): { unique: RawSessionRow[]; duplicateIds: string[] } {
  const unique: RawSessionRow[] = [];
  const duplicateIds: string[] = [];

  for (const row of rows) {
    const matchIndex = unique.findIndex((u) => areRawSessionsDuplicates(u, row));
    if (matchIndex === -1) {
      unique.push(row);
    } else {
      const existing = unique[matchIndex];
      const rowLen = Array.isArray(row.messages) ? row.messages.length : 0;
      const existLen = Array.isArray(existing.messages) ? existing.messages.length : 0;
      if (rowLen > existLen) {
        duplicateIds.push(existing.id);
        unique[matchIndex] = row;
      } else {
        duplicateIds.push(row.id);
      }
    }
  }

  return { unique, duplicateIds };
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  if (!await checkRateLimit(ip, 60)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ sessions: [] });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('copilot_sessions')
      .select('id, title, messages, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.warn('Error fetching cloud sessions:', error);
      return NextResponse.json({ sessions: [] });
    }

    const { unique, duplicateIds } = deduplicateCloudSessions(data || []);

    // Clean up duplicate ghost records from DB
    if (duplicateIds.length > 0) {
      try {
        await supabase
          .from('copilot_sessions')
          .delete()
          .in('id', duplicateIds)
          .eq('user_id', user.id);
      } catch (cleanErr: unknown) {
        console.warn('Background cleanup of duplicate sessions failed:', cleanErr);
      }
    }

    return NextResponse.json({ sessions: unique });
  } catch (err) {
    console.error('Session list route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!await checkRateLimit(ip, 60)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ success: false, error: 'Database unconfigured' }, { status: 503 });
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, messages } = body;

    const validId = typeof id === 'string' && isValidUUID(id.trim()) ? id.trim() : undefined;

    const { data, error } = await supabase
      .from('copilot_sessions')
      .upsert({
        ...(validId ? { id: validId } : {}),
        user_id: user.id,
        title: title || 'New Chat',
        messages: Array.isArray(messages) ? messages : [],
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving cloud session:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, session: data });
  } catch (err) {
    console.error('Session create/upsert route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
