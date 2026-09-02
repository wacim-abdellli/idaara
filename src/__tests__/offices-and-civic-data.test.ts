import { describe, it, expect } from 'vitest';
import { publicOfficesData, GOVERNORATES_LIST } from '../data/offices';
import { portailsData } from '../data/portails';
import { emergencyContacts, ministriesData } from '../data/contacts';

describe('Territorial Atlas & Public Offices Dataset (src/data/offices.ts)', () => {
  it('covers all 24 Tunisian governorates in GOVERNORATES_LIST', () => {
    expect(GOVERNORATES_LIST).toHaveLength(24);
    const expected = [
      'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
      'Bizerte', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Sousse',
      'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid',
      'Gabès', 'Médenine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kébili'
    ];
    for (const gov of expected) {
      expect(GOVERNORATES_LIST).toContain(gov);
    }
  });

  it('contains at least one public office for every single governorate', () => {
    const presentGovernorates = new Set(publicOfficesData.map((o) => o.governorate));
    for (const gov of GOVERNORATES_LIST) {
      expect(presentGovernorates.has(gov)).toBe(true);
    }
  });

  it('has valid GPS coordinates strictly within Tunisian geographic bounds', () => {
    for (const office of publicOfficesData) {
      const { lat, lng } = office.coordinates;
      // Tunisia bounding box: Latitude [30.0, 37.6], Longitude [7.5, 11.8]
      expect(lat).toBeGreaterThanOrEqual(30.0);
      expect(lat).toBeLessThanOrEqual(37.6);
      expect(lng).toBeGreaterThanOrEqual(7.5);
      expect(lng).toBeLessThanOrEqual(11.8);
    }
  });

  it('ensures every office has multilingual names, an address, and schedules', () => {
    for (const office of publicOfficesData) {
      expect(office.id).toBeTruthy();
      expect(office.name.fr).toBeTruthy();
      expect(office.name.ar).toBeTruthy();
      expect(office.name.derja).toBeTruthy();
      expect(office.address).toBeTruthy();
      expect(office.phone).toMatch(/^\+216/);
      expect(office.schedule.regular.hours).toBeTruthy();
      expect(office.schedule.ramadan.hours).toBeTruthy();
      expect(office.schedule.summer.hours).toBeTruthy();
    }
  });
});

describe('E-Government Portals Directory (src/data/portails.ts)', () => {
  it('contains valid HTTPS URLs and complete multilingual service descriptions', () => {
    expect(portailsData.length).toBeGreaterThan(10);
    for (const portal of portailsData) {
      expect(portal.id).toBeTruthy();
      expect(portal.name).toBeTruthy();
      expect(portal.url).toMatch(/^https:\/\//);
      expect(portal.description.ar).toBeTruthy();
      expect(portal.description.fr).toBeTruthy();
      expect(portal.description.en).toBeTruthy();
      expect(portal.description.derja).toBeTruthy();
      expect(portal.services.length).toBeGreaterThan(0);
    }
  });
});

describe('Emergency Contacts & Ministries Directory (src/data/contacts.ts)', () => {
  it('contains essential short emergency hotlines (197, 190, 198)', () => {
    const numbers = emergencyContacts.map((c) => c.number);
    expect(numbers).toContain('197'); // Police Secours
    expect(numbers).toContain('190'); // SAMU
    expect(numbers).toContain('198'); // Protection Civile
  });

  it('verifies ministries have addresses, phone numbers, and official websites', () => {
    expect(ministriesData.length).toBeGreaterThan(5);
    for (const min of ministriesData) {
      expect(min.id).toBeTruthy();
      expect(min.website).toMatch(/^https?:\/\//);
      expect(min.phone).toBeTruthy();
      expect(min.address).toBeTruthy();
    }
  });
});
