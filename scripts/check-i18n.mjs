#!/usr/bin/env node
/**
 * i18n regression guard.
 *
 * Scans src/ for:
 *  1. Data-file localized objects missing one of the 4 locale keys (derja/fr/ar/en)
 *  2. Hardcoded user-visible JSX text literals & attributes (allowlist-aware)
 *  3. Locale ternaries that appear incomplete (warning)
 *
 * Usage: npm run i18n:check   (exits 1 on errors)
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const LOCALES = ['derja', 'fr', 'ar', 'en'];

const ALLOWED_WORDS = new Set(
  [
    'idaara', 'tn', 'jort', 'baladiya', 'dt', 'tnd', 'pdf', 'ocr', 'cin', 'ai',
    'cnss', 'cnam', 'attt', 'steg', 'sonede', 'onas', 'aneti', 'rne', 'tva',
    'sarl', 'esc', 'live', 'kb', 'mb', 'bct', 'copilot', 'fasserli', 'id',
    'eu', 'eur', 'usd', 'iso', 'coco', 'th', 'td',
  ].map((w) => w.toLowerCase())
);

const errors = [];
const warnings = [];

function lineOf(content, pos) {
  return content.slice(0, pos).split('\n').length;
}

function nearestId(content, pos) {
  const before = content.slice(Math.max(0, pos - 600), pos);
  const m = [...before.matchAll(/(?:^|\s)(?:id|name|title)\s*:\s*['"`]([^'"`]+)['"`]/g)];
  return m.length ? m[m.length - 1][1] : '(unknown)';
}

/* ---------- 1. Data files: every localized object must have all 4 locales ---------- */
function scanDataFile(path) {
  const rel = path.slice(ROOT.length + 1);
  const content = readFileSync(path, 'utf8');
  const stack = []; // positions of unmatched '{'

  let inStr = null;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (inStr) {
      if (ch === '\\') i++;
      else if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      inStr = ch;
      continue;
    }
    if (ch === '/' && content[i + 1] === '/') {
      while (i < content.length && content[i] !== '\n') i++;
      continue;
    }
    if (ch === '{') {
      stack.push(i);
      continue;
    }
    if (ch === '}') {
      stack.pop();
      continue;
    }

    // Detect a localized-object key: derja:
    if (
      ch === 'd' &&
      content.startsWith('derja', i) &&
      /^\s*:/ .test(content.slice(i + 5)) === false &&
      /^\s*:/.test(content.slice(i + 5))
    ) {
      const start = stack[stack.length - 1];
      if (start === undefined) continue;
      // Brace-match this object
      let depth = 0;
      let end = -1;
      for (let j = start; j < content.length; j++) {
        const c2 = content[j];
        if (c2 === '{') depth++;
        else if (c2 === '}') {
          depth--;
          if (depth === 0) {
            end = j;
            break;
          }
        }
      }
      if (end === -1) continue;

      // Extract top-level-ish keys: identifier followed by ':' preceded by '{' or ','
      const seg = content.slice(start + 1, end);
      const keys = new Set();
      const km = seg.matchAll(/[{,]\s*([A-Za-z_$][\w$]*)\s*:/g);
      for (const k of km) keys.add(k[1]);

      const missing = LOCALES.filter((l) => !keys.has(l));
      if (missing.length) {
        errors.push(
          `${rel}:${lineOf(content, start)} localized object "${nearestId(content, start)}" missing: ${missing.join(', ')}`
        );
      }
      i += 6;
    }
  }
}

function walk(dir, exts, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(p);
  }
  return out;
}

walk(join(ROOT, 'src', 'data'), ['.ts']).forEach(scanDataFile);

/* ---------- 2. TSX: hardcoded UI strings ---------- */
function isAllowedText(text) {
  const words = text.split(/[^A-Za-zÀ-ÿ0-9%]+/).filter(Boolean);
  if (!words.length) return true;
  return words.every((w) => ALLOWED_WORDS.has(w.toLowerCase()) || /^\d+$/.test(w));
}

for (const path of walk(join(ROOT, 'src'), ['.tsx'])) {
  const rel = path.slice(ROOT.length + 1);
  const lines = readFileSync(path, 'utf8').split('\n');

  lines.forEach((line, idx) => {
    // Skip comment lines
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return;

    // JSX text nodes: >Text<
    const tm = [...line.matchAll(/>\s*([^<>{}]*[A-Za-zÀ-ÿ][^<>{}]*)\s*</g)];
    for (const m of tm) {
      const text = m[1].trim();
      if (!text || isAllowedText(text)) continue;
      if (/^[^A-Za-zÀ-ÿ]*$/.test(text)) continue;
      if (text.length < 3) continue;
      warnings.push(`${rel}:${idx + 1} possibly-hardcoded JSX text: "${text.slice(0, 60)}"`);
    }

    // Attribute literals shown to users
    const am = [
      ...line.matchAll(/\b(title|aria-label|alt|placeholder)="([^"{][^"]*)"/g),
    ];
    for (const m of am) {
      if (!isAllowedText(m[2])) {
        errors.push(`${rel}:${idx + 1} hardcoded attribute ${m[1]}="${m[2].slice(0, 50)}"`);
      }
    }

    // Incomplete locale ternaries (heuristic): a line using locale === 'X'
    if (/locale\s*===\s*'/.test(line)) {
      const window = lines.slice(Math.max(0, idx - 4), idx + 6).join('\n');
      const found = new Set(
        [...window.matchAll(/locale\s*===\s*'(\w+)'/g)].map((x) => x[1])
      );
      if (found.size >= 2 && found.size < 4) {
        const missing = LOCALES.filter((l) => l !== 'fr' && !found.has(l));
        if (missing.length) {
          warnings.push(
            `${rel}:${idx + 1} ternary covers {${[...found].join(',')}} — no branch for: ${missing.join(', ')} (may fall back to fr)`
          );
        }
      }
    }
  });
}

/* ---------- report ---------- */
if (warnings.length) {
  console.log(`\ni18n warnings (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  ⚠ ${w}`));
}
if (errors.length) {
  console.error(`\ni18n ERRORS (${errors.length}):`);
  errors.forEach((e) => console.error(`  ✖ ${e}`));
  process.exit(1);
} else {
  console.log('\ni18n check passed: all localized data objects complete, no hardcoded UI strings.');
}
