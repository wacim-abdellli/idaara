import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, isSupabaseServerConfigured } from '../../../lib/supabase/server';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

export const runtime = 'nodejs';

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

    return NextResponse.json({ sessions: data || [] });
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

    const { data, error } = await supabase
      .from('copilot_sessions')
      .upsert({
        id: id || undefined,
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
