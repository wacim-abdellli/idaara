import { describe, it, expect } from 'vitest';
import { proceduresData, getProcedureById, getProcedureBySlug } from '../data/procedures';

describe('proceduresData — integrity and schema validation', () => {
  it('contains procedures with unique IDs and slugs', () => {
    expect(proceduresData.length).toBeGreaterThan(0);
    const ids = proceduresData.map((p) => p.id);
    const slugs = proceduresData.map((p) => p.slug);
    const uniqueIds = new Set(ids);
    const uniqueSlugs = new Set(slugs);

    expect(uniqueIds.size, 'Every procedure must have a unique ID').toBe(proceduresData.length);
    expect(uniqueSlugs.size, 'Every procedure must have a unique slug').toBe(proceduresData.length);
  });

  it('all procedures have valid non-negative costs and non-empty steps', () => {
    for (const proc of proceduresData) {
      expect(proc.estimatedTotalCostTND, `${proc.id} cost must be >= 0`).toBeGreaterThanOrEqual(0);
      expect(proc.steps.length, `${proc.id} must have at least 1 step`).toBeGreaterThan(0);
      expect(proc.requiredDocuments.length, `${proc.id} must have required documents`).toBeGreaterThan(0);
      expect(proc.title.fr, `${proc.id} must have French title`).toBeTruthy();
      expect(proc.title.ar, `${proc.id} must have Arabic title`).toBeTruthy();
    }
  });

  it('getProcedureById returns the correct procedure or undefined', () => {
    const passport = getProcedureById('passeport-renouvellement');
    expect(passport).toBeDefined();
    expect(passport?.estimatedTotalCostTND).toBe(86);

    const nonExistent = getProcedureById('non-existent-id-12345');
    expect(nonExistent).toBeUndefined();
  });

  it('getProcedureBySlug retrieves correct procedure', () => {
    const b3 = getProcedureBySlug('bulletin-3-b3');
    expect(b3).toBeDefined();
    expect(b3?.id).toBe('bulletin-3-b3');
  });
});
