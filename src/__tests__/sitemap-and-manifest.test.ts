import { describe, it, expect } from 'vitest';
import sitemap from '../app/sitemap';
import manifest from '../app/manifest';
import { proceduresData } from '../data/procedures';
import { documentTemplatesData } from '../data/documentTemplates';

describe('sitemap() & manifest() SEO/PWA Suite', () => {
  it('generates a complete sitemap including all 11 flagship routes', () => {
    const map = sitemap();
    const urls = map.map((entry) => entry.url);

    // Verify core routes
    expect(urls.some((u) => u.endsWith('/copilot'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/fasserli'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/documents'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/procedures'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/calculator'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/locator'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/concours'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/launchpad'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/portails'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/contacts'))).toBe(true);
  });

  it('includes all 24 civic procedures in the sitemap', () => {
    const map = sitemap();
    const urls = map.map((entry) => entry.url);

    expect(proceduresData.length).toBeGreaterThanOrEqual(24);
    for (const proc of proceduresData) {
      expect(urls.some((u) => u.includes(`/procedures/${proc.id}`))).toBe(true);
    }
  });

  it('includes all document templates in the sitemap', () => {
    const map = sitemap();
    const urls = map.map((entry) => entry.url);

    expect(documentTemplatesData.length).toBeGreaterThanOrEqual(8);
    for (const doc of documentTemplatesData) {
      expect(urls.some((u) => u.includes(`/documents/${doc.slug}`))).toBe(true);
    }
  });

  it('provides a valid PWA manifest matching civic platform branding', () => {
    const pwa = manifest();

    expect(pwa.name).toContain('Idaara');
    expect(pwa.short_name).toBe('Idaara');
    expect(pwa.display).toBe('standalone');
    expect(pwa.theme_color).toBe('#00C07F');
    expect(pwa.background_color).toBe('#090a0d');
    expect(pwa.shortcuts).toBeDefined();
    expect(pwa.shortcuts?.length).toBeGreaterThanOrEqual(4);
  });
});
