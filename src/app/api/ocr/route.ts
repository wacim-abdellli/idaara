import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { sampleDocumentsList } from '../../../data/sampleDocuments';
import { OCRAnalysisResult } from '../../../types/chat';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

function getGeminiKey(): string {
  return (process.env.GEMINI_API_KEY || '').trim();
}

function getGroqKey(): string {
  return (process.env.GROQ_API_KEY || '').trim();
}

const DOCUMENT_ANALYSIS_SCHEMA_PROMPT = `
Return ONLY a valid JSON object matching this exact schema:
{
  "documentType": {
    "ar": "الاسم الدقيق للوثيقة بالعربية",
    "fr": "Nom exact du document en français",
    "derja": "Esm el war9a bed-Derja",
    "en": "Exact document name in English"
  },
  "issuingAuthority": {
    "ar": "المؤسسة أو الهيكل المصدر (وزارة / قباضة / نادي / محكمة)",
    "fr": "Organisme émetteur",
    "derja": "El haykal el masdour",
    "en": "Issuing entity"
  },
  "referenceNumber": "رقم المرجع أو الوصل الفعلي إن وجد أو null",
  "dateDetected": "التاريخ الفعلي المكتوب بالوثيقة أو null",
  "urgency": "low" | "medium" | "high" | "critical",
  "deadlineDate": "الآجال القانونية إن وجدت أو غير محدد",
  "penaltyRisk": {
    "ar": "المخاطر والخطايا القانونية إن وجدت أو غير منطبق",
    "fr": "Risques ou Non applicable",
    "derja": "Mochkla wala le",
    "en": "Risk or Not applicable"
  },
  "summary": {
    "ar": ["نقطة 1 تشرح محتوى الوثيقة الحقيقية بدقة", "نقطة 2 تشرح المطلوب", "نقطة 3 توضح الآجال أو التفاصيل"],
    "fr": ["point 1", "point 2", "point 3"],
    "derja": ["no9ta 1", "no9ta 2", "no9ta 3"],
    "en": ["point 1", "point 2", "point 3"]
  },
  "actionItems": [
    {
      "task": {"ar": "الخطوة الأولى", "fr": "Étape 1", "derja": "5otwa 1", "en": "Step 1"},
      "office": {"ar": "المكان المطلوب", "fr": "Bureau", "derja": "El ma9arr", "en": "Office"},
      "requiredPapers": ["ورقة 1", "ورقة 2"],
      "feeTND": 0
    }
  ],
  "legalContext": {
    "ar": "السياق القانوني أو التنظيمي التونسي",
    "fr": "Contexte juridique tunisien",
    "derja": "El 9anoun el tounsi el ma3ni",
    "en": "Tunisian legal context"
  }
}`;

export async function POST(req: NextRequest) {
  try {
    // Rate limit check (max 20 OCR requests per minute per IP)
    const ip = getClientIp(req);
    if (!checkRateLimit(ip, 20)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const sampleId = formData.get('sampleId') as string | null;
    const documentName = (formData.get('documentName') as string) || file?.name || 'document-scan.png';

    // 1. If static verified sample
    if (sampleId) {
      const found = sampleDocumentsList.find((s) => s.id === sampleId);
      if (found) {
        return NextResponse.json({
          success: true,
          analysis: found.simulatedOCRResult,
          filename: documentName,
        });
      }
    }

    let buffer: Buffer | null = null;
    let mimeType = 'image/png';

    // ── File size guard (10 MB max) ───────────────────────────────────────────
    const MAX_FILE_BYTES = 10 * 1024 * 1024;
    if (file && file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 10 MB.' },
        { status: 413 }
      );
    }

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);

      // Server-side magic-byte validation (reject spoofed executables / invalid files)
      const magicHex = buffer.slice(0, 4).toString('hex').toLowerCase();
      // JPEG: ffd8ff, PNG: 89504e47, PDF: 25504446 (%PDF), GIF: 47494638, WebP: 52494646 (RIFF)
      const validMagicPrefixes = ['ffd8ff', '89504e47', '25504446', '47494638', '52494646'];
      const isValidMagic = validMagicPrefixes.some((prefix) => magicHex.startsWith(prefix));
      if (!isValidMagic) {
        return NextResponse.json(
          { success: false, error: 'Invalid file format. Only real images (PNG, JPEG, WebP, GIF) and PDF files are supported.' },
          { status: 415 }
        );
      }

      mimeType = file.type || (documentName.endsWith('.pdf') ? 'application/pdf' : 'image/png');
    }

    const geminiKey = getGeminiKey();
    const groqKey = getGroqKey();

    // ─── METHOD 1: Google Gemini Multimodal Vision (Native Pixel Scanner - Fast & Free) ───
    if (geminiKey && buffer) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const base64 = buffer.toString('base64');
        const visionPrompt = `You are the Official Tunisian Administrative & Legal Document Decoder (Idaara AI Fasserli).
You have human-level OCR and visual document recognition capabilities for Tunisian administrative paperwork (CIN, Passport, Avis Fiscal, CNSS, B3, Municipal birth extracts, court summons, utility bills, school & club forms).

Analyze this uploaded document image in detail.
Read the actual visible text, headers, seals, stamps, and dates.
${DOCUMENT_ANALYSIS_SCHEMA_PROMPT}`;

        const result = await model.generateContent([
          visionPrompt,
          {
            inlineData: {
              mimeType: mimeType.includes('pdf') ? 'application/pdf' : 'image/png',
              data: base64,
            },
          },
        ]);

        const rawText = result.response.text();
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.documentType && parsed.summary) {
            const analysis: OCRAnalysisResult = {
              id: `ocr-${Date.now()}`,
              documentType: parsed.documentType,
              issuingAuthority: parsed.issuingAuthority || { ar: 'الهيكل المصدر', fr: 'Autorité', derja: 'El Haykal', en: 'Authority' },
              referenceNumber: parsed.referenceNumber || 'غير متوفر',
              dateDetected: parsed.dateDetected || 'غير متوفر',
              urgency: parsed.urgency || 'low',
              deadlineDate: parsed.deadlineDate || 'غير محدد',
              penaltyRisk: parsed.penaltyRisk || { ar: 'غير منطبق', fr: 'Non applicable', derja: 'Ghir montaba9', en: 'Not applicable' },
              summary: parsed.summary,
              actionItems: parsed.actionItems || [],
              legalContext: parsed.legalContext || { ar: 'إجراء إداري / تنظيمي', fr: 'Procédure administrative', derja: 'Ijra2 idari', en: 'Administrative procedure' },
            };

            return NextResponse.json({
              success: true,
              engine: 'gemini-vision',
              analysis,
              filename: documentName,
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini Vision engine fallback:', geminiErr);
      }
    }

    // ─── METHOD 2: Tesseract OCR + Groq 120B Cascade ───
    let extractedText = '';
    if (buffer) {
      try {
        const { default: Tesseract } = await import('tesseract.js');
        const ocrPromise = Tesseract.recognize(buffer, 'ara+fra+eng', {
          logger: () => {},
        });

        // 25s timeout for large 5MB images
        const timeoutPromise = new Promise<{ data: { text: string } }>((resolve) =>
          setTimeout(() => resolve({ data: { text: '' } }), 25000)
        );

        const raceResult = await Promise.race([ocrPromise, timeoutPromise]);
        extractedText = (raceResult?.data?.text || '').trim();
      } catch (ocrErr) {
        console.warn('Tesseract OCR engine fallback:', ocrErr);
      }
    }

    if (groqKey && extractedText.length > 10) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const prompt = `You are the Official Tunisian Administrative & Legal Document Decoder (Idaara AI Fasserli).
A citizen has uploaded an image file titled "${documentName}".
Our OCR engine extracted the following real text from the image:

=== EXTRACTED OCR TEXT FROM USER IMAGE ===
${extractedText || '(No clear text detected in image)'}
==========================================

Analyze the REAL document content extracted above with 100% honesty and accuracy.
${DOCUMENT_ANALYSIS_SCHEMA_PROMPT}`;

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.1,
            max_tokens: 1200,
            response_format: { type: 'json_object' },
          }),
        });

        clearTimeout(timeoutId);

        if (groqRes.ok) {
          const data = await groqRes.json();
          const rawContent = data.choices?.[0]?.message?.content || '{}';
          let parsed: Partial<OCRAnalysisResult> = {};
          try {
            parsed = JSON.parse(rawContent) as Partial<OCRAnalysisResult>;
          } catch {
            console.warn('[OCR] Groq returned malformed JSON, using fallback.');
          }

          if (parsed.documentType && parsed.summary) {
            const urgencyVal = parsed.urgency;
            const validUrgency = (urgencyVal === 'low' || urgencyVal === 'medium' || urgencyVal === 'high' || urgencyVal === 'critical')
              ? urgencyVal
              : 'low';

            const analysis: OCRAnalysisResult = {
              id: `ocr-${Date.now()}`,
              documentType: parsed.documentType,
              issuingAuthority: parsed.issuingAuthority || { ar: 'الهيكل المعني', fr: 'Autorité', derja: 'El Haykal', en: 'Authority' },
              referenceNumber: parsed.referenceNumber || 'غير متوفر',
              dateDetected: parsed.dateDetected || 'غير متوفر',
              urgency: validUrgency,
              deadlineDate: parsed.deadlineDate || 'غير محدد',
              penaltyRisk: parsed.penaltyRisk || { ar: 'غير منطبق', fr: 'Non applicable', derja: 'Ghir montaba9', en: 'Not applicable' },
              summary: parsed.summary,
              actionItems: parsed.actionItems || [],
              legalContext: parsed.legalContext || { ar: 'إجراء إداري / تنظيمي', fr: 'Procédure administrative', derja: 'Ijra2 idari', en: 'Administrative procedure' },
            };
            return NextResponse.json({
              success: true,
              engine: 'tesseract-groq',
              analysis,
              filename: documentName,
              ocrText: extractedText.slice(0, 500),
            });
          }
        }
      } catch (aiErr) {
        console.warn('AI OCR parsing fallback:', aiErr);
      }
    }

    // ─── METHOD 3: Fallback response ───
    const hasText = extractedText.length > 15;
    const fallbackAnalysis: OCRAnalysisResult = {
      id: `ocr-${Date.now()}`,
      documentType: {
        derja: hasText ? "Wathi9a Idariya Mfasra" : "Taswira 3adiya (Ghir Wadh7a)",
        fr: hasText ? "Document Administratif Détecté" : "Image Non Documentaire / Illisible",
        ar: hasText ? "وثيقة إدارية تم مسحها" : "صورة عادية أو غير مقروءة",
        en: hasText ? "Scanned Administrative Document" : "Unclear / Non-document Image",
      },
      issuingAuthority: {
        derja: hasText ? "El Haykal el Ma3ni" : "Ghir Mou7addad",
        fr: hasText ? "Organisme Concerné" : "Non Déterminé",
        ar: hasText ? "الهيكل المعني" : "غير محدد",
        en: hasText ? "Concerned Entity" : "Unspecified",
      },
      referenceNumber: "غير متوفر",
      dateDetected: new Date().getFullYear().toString(),
      urgency: "low",
      deadlineDate: "غير محدد",
      penaltyRisk: {
        derja: "Ghir montaba9.",
        fr: "Non applicable.",
        ar: "غير منطبق.",
        en: "Not applicable.",
      },
      summary: {
        derja: hasText
          ? [
              "Wathi9a tmét 9rayetha bel OCR.",
              "Fiha ma3loumet chakhsiya w bayanét idariya.",
              "Tnajjem testa3mel Idaara AI Copilot bech tfasser akther."
            ]
          : [
              "El taswira ma fihech ktaba idariya wadh7a.",
              "Thabbet men woudhou7 el taswira wel idhaa.",
              "Souwer war9a rasmiya bech Idaara AI tfasserha."
            ],
        fr: hasText
          ? [
              "Document analysé avec succès par le moteur OCR.",
              "Comporte des données et mentions textuelles.",
              "Consultez Idaara AI Copilot pour des démarches détaillées."
            ]
          : [
              "Aucun texte administratif clair détecté.",
              "Vérifiez la netteté de l'image et l'éclairage.",
              "Scannez un document officiel pour obtenir un décryptage juridique."
            ],
        ar: hasText
          ? [
              "تمت قراءة نص الوثيقة بنجاح عبر الماسح الضوئي.",
              "تحتوي على بيانات ومعطيات نصية تم استخراجها.",
              "يمكنك استشارة Idaara AI للحصول على مزيد من الإجراءات."
            ]
          : [
              "لم يتم العثور على نص إداري واضح في الصورة.",
              "يرجى التأكد من وضوح الصورة والإضاءة.",
              "قم بمسح وثيقة أو استمارة رسمية للحصول على التقرير القانوني."
            ],
        en: hasText
          ? [
              "Document successfully scanned by OCR engine.",
              "Contains extracted text data.",
              "Consult Idaara AI Copilot for next procedural steps."
            ]
          : [
              "No clear administrative text detected in image.",
              "Please ensure good lighting and document sharpness.",
              "Scan an official document to obtain legal breakdown."
            ],
      },
      actionItems: [
        {
          task: {
            ar: 'مراجعة بيانات الوثيقة',
            fr: 'Vérifier les données',
            derja: 'Thabbet fel ma3loumet',
            en: 'Check information',
          },
          office: {
            ar: 'الهيكل المختص',
            fr: 'Bureau compétent',
            derja: 'El ma9arr',
            en: 'Competent office',
          },
          requiredPapers: [],
        },
      ],
      legalContext: {
        ar: 'إجراء إداري / تنظيمي عام',
        fr: 'Procédure administrative générale',
        derja: 'Ijra2 idari 3am',
        en: 'General administrative procedure',
      },
    };

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
      filename: documentName,
    });
  } catch (error: unknown) {
    console.error('[OCR] Fatal error:', error);
    return NextResponse.json(
      { success: false, error: 'Document analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
