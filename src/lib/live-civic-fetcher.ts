/**
 * Live Tunisian Civic & Government Data Ingestion Engine
 * Fetches and parses real-time official notices from Tunisian portals:
 * - www.concours.gov.tn (National Public Recruitment Portal)
 * - www.edunet.tn (Ministère de l'Éducation)
 */

interface LiveNotice {
  source: string;
  portalUrl: string;
  date?: string;
  title: string;
  summary?: string;
}

interface CacheEntry {
  timestamp: number;
  data: LiveNotice[];
}

let memoryCache: CacheEntry | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

/**
 * Fetch and extract live announcements from www.concours.gov.tn
 */
async function fetchConcoursGov(): Promise<LiveNotice[]> {
  try {
    const res = await fetch('http://www.concours.gov.tn', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return [];
    const html = await res.text();

    const notices: LiveNotice[] = [];

    // Parse dated announcements (format: YYYY-MM-DD followed by organization & title)
    const newsRegex = /(\d{4}-\d{2}-\d{2})\s+([^<\n\r]+?)(?=(?:\d{4}-\d{2}-\d{2}|إقرأ المزيد|طالب شغل|فضاء|$))/g;
    let match;
    while ((match = newsRegex.exec(html)) !== null && notices.length < 8) {
      const date = match[1].trim();
      const rawTitle = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (rawTitle.length > 10) {
        notices.push({
          source: 'بوابة المناظرات العمومية (concours.gov.tn)',
          portalUrl: 'https://www.concours.gov.tn',
          date,
          title: rawTitle,
        });
      }
    }

    return notices;
  } catch (err) {
    console.warn('Live fetch from concours.gov.tn failed or timed out:', err);
    return [];
  }
}

/**
 * Fetch and extract live notices from www.edunet.tn
 */
async function fetchEdunet(): Promise<LiveNotice[]> {
  try {
    const res = await fetch('http://www.edunet.tn', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return [];
    const html = await res.text();

    const notices: LiveNotice[] = [];

    // Clean text and extract "بلاغ" / "مناظرة" announcements
    const clean = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, '\n')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 15 && (l.includes('بلاغ') || l.includes('مناظرة') || l.includes('انتداب')));

    const uniqueLines = Array.from(new Set(clean)).slice(0, 6);

    for (const title of uniqueLines) {
      notices.push({
        source: "وزارة التربية (edunet.tn)",
        portalUrl: 'https://www.edunet.tn',
        title,
      });
    }

    return notices;
  } catch (err) {
    console.warn('Live fetch from edunet.tn failed or timed out:', err);
    return [];
  }
}

/**
 * Get all aggregated live Tunisian government notices (cached with 10-min TTL)
 */
export async function getLiveGovernmentNotices(): Promise<LiveNotice[]> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  const [concoursNotices, edunetNotices] = await Promise.allSettled([
    fetchConcoursGov(),
    fetchEdunet(),
  ]);

  const liveData: LiveNotice[] = [];

  if (concoursNotices.status === 'fulfilled') {
    liveData.push(...concoursNotices.value);
  }
  if (edunetNotices.status === 'fulfilled') {
    liveData.push(...edunetNotices.value);
  }

  memoryCache = {
    timestamp: now,
    data: liveData,
  };

  return liveData;
}

/**
 * Format live government feed as grounding context for Copilot prompt
 */
export async function buildLiveGroundingFeed(): Promise<string> {
  const notices = await getLiveGovernmentNotices();
  if (notices.length === 0) return '';

  const today = new Date().toISOString().split('T')[0];

  let feed = `\n═══════════════════════════════════════════════════════════════════════\n`;
  feed += `🔴 REAL-TIME LIVE TUNISIAN GOVERNMENT FEED (FETCHED LIVE FROM CONCOURS.GOV.TN & EDUNET.TN — ${today}):\n`;
  feed += `These are active live announcements currently published on official government servers:\n`;

  for (const n of notices) {
    const dateStr = n.date ? ` [${n.date}]` : '';
    feed += `- ${n.source}${dateStr}: ${n.title} (الرابط: ${n.portalUrl})\n`;
  }
  feed += `═══════════════════════════════════════════════════════════════════════\n`;

  return feed;
}
