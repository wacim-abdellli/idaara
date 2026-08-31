import { describe, it, expect } from 'vitest';
import { GET } from '../app/api/fiscal-rates/route';

describe('/api/fiscal-rates endpoint', () => {
  it('returns valid JSON with statutory rates and fiscal year', async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toHaveProperty('fiscalYear');
    expect(json).toHaveProperty('rates');
    expect(json.rates).toHaveProperty('servicesTaxRate', 0.01);
    expect(json.rates).toHaveProperty('commerceTaxRate', 0.005);
    expect(json.rates).toHaveProperty('annualRevenueCeilingTND', 75000);
    expect(json.rates).toHaveProperty('suarlCorporateTaxRate', 0.15);
  });
});
