import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, isSupabaseServerConfigured } from '../../../../lib/supabase/server';
import { checkRateLimit, getClientIp } from '../../../../lib/rate-limit';

export const runtime = 'nodejs';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = getClientIp(req);
  if (!await checkRateLimit(ip, 60)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ success: false, error: 'Database unconfigured' }, { status: 503 });
  }

  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, messages } = body;

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (typeof title === 'string') updatePayload.title = title;
    if (Array.isArray(messages)) updatePayload.messages = messages;

    const { data, error } = await supabase
      .from('copilot_sessions')
      .update(updatePayload)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, session: data });
  } catch (err) {
    console.error('Session update route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = getClientIp(req);
  if (!await checkRateLimit(ip, 60)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ success: false, error: 'Database unconfigured' }, { status: 503 });
  }

  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('copilot_sessions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Session delete route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
