import { NextResponse } from 'next/server';
import {
  AUTO_ENTREPRENEUR_RATES,
  SUARL_RATES,
  FISCAL_YEAR,
  FISCAL_YEAR_LABEL,
} from '../../../data/fiscal-rates';

export const runtime = 'nodejs';
export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/fiscal_rates?select=*&order=fiscal_year.desc&limit=1`,
        {
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
          },
          next: { revalidate: 3600 },
        }
      );

      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0 && rows[0].rates) {
          return NextResponse.json(
            {
              source: 'database',
              fiscalYear: rows[0].fiscal_year || FISCAL_YEAR,
              rates: rows[0].rates,
              publishedAt: rows[0].published_at,
            },
            {
              headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
              },
            }
          );
        }
      }
    } catch (err) {
      console.warn('Fiscal rates database fetch failed, falling back to statutory file:', err);
    }
  }

  // Resilient Statutory Fallback
  return NextResponse.json(
    {
      source: 'statutory_file',
      fiscalYear: FISCAL_YEAR,
      rates: {
        ...AUTO_ENTREPRENEUR_RATES,
        suarlCorporateTaxRate: SUARL_RATES.corporateTaxRate,
        suarlMinimumCapitalTND: SUARL_RATES.minimumBankCapitalTND,
        fiscalYearLabel: FISCAL_YEAR_LABEL,
      },
      publishedAt: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
