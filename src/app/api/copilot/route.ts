import { NextRequest, NextResponse } from 'next/server';
import { parseAndReason } from '../../../lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, locale = 'derja' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt string is required' },
        { status: 400 }
      );
    }

    const result = parseAndReason(prompt, locale);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process copilot request', details: String(error) },
      { status: 500 }
    );
  }
}
