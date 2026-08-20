import { NextRequest, NextResponse } from 'next/server';
import { sampleDocumentsList } from '../../../data/sampleDocuments';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // Return the primary simulated analysis report or parsed structure
    const sample = sampleDocumentsList[0].simulatedOCRResult;

    return NextResponse.json({
      success: true,
      analysis: sample,
      filename: file instanceof File ? file.name : 'document-scan.png',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process OCR analysis', details: String(error) },
      { status: 500 }
    );
  }
}
