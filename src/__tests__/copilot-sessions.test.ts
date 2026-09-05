import { describe, it, expect } from 'vitest';
import { generateUUID, isValidUUID, deduplicateSessions, ChatSession } from '../hooks/useCopilotSessions';
import { deduplicateCloudSessions } from '../app/api/sessions/route';

describe('Copilot Sessions - UUID & Deduplication Engine', () => {
  describe('UUID Generation & Validation', () => {
    it('generates valid RFC4122 v4 UUID format', () => {
      const uuid = generateUUID();
      expect(typeof uuid).toBe('string');
      expect(isValidUUID(uuid)).toBe(true);
    });

    it('rejects legacy session ids like session-178...', () => {
      expect(isValidUUID('session-1788588794012')).toBe(false);
      expect(isValidUUID('')).toBe(false);
      expect(isValidUUID('random-string')).toBe(false);
    });

    it('accepts real standard UUIDs', () => {
      expect(isValidUUID('e4b9c9f0-2a8d-4f6b-9c7a-1e2f3a4b5c6d')).toBe(true);
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
    });
  });

  describe('Deduplication of Ghost Duplicate Sessions', () => {
    it('deduplicates progressive snapshot saves with identical starting history', () => {
      const ghostSessions: ChatSession[] = [
        {
          id: 'uuid-1',
          title: 'hi',
          timestamp: '10:00',
          messages: [{ id: 'm1', sender: 'user', content: 'hi', timestamp: '10:00' }],
        },
        {
          id: 'uuid-2',
          title: 'hi',
          timestamp: '10:01',
          messages: [
            { id: 'm1', sender: 'user', content: 'hi', timestamp: '10:00' },
            { id: 'm2', sender: 'assistant', content: '3asslema! kifech najem n3awnek?', timestamp: '10:01' },
          ],
        },
        {
          id: 'uuid-3',
          title: 'hi',
          timestamp: '10:02',
          messages: [
            { id: 'm1', sender: 'user', content: 'hi', timestamp: '10:00' },
            { id: 'm2', sender: 'assistant', content: '3asslema! kifech najem n3awnek?', timestamp: '10:01' },
            { id: 'm3', sender: 'user', content: 'n7eb na3mel passeport', timestamp: '10:02' },
          ],
        },
      ];

      const { unique, duplicateIds } = deduplicateSessions(ghostSessions);

      expect(unique).toHaveLength(1);
      expect(unique[0].id).toBe('uuid-3');
      expect(unique[0].messages).toHaveLength(3);

      expect(duplicateIds).toContain('uuid-1');
      expect(duplicateIds).toContain('uuid-2');
    });

    it('preserves distinct conversations that start differently', () => {
      const sessions: ChatSession[] = [
        {
          id: 'uuid-passport',
          title: 'Passeport',
          timestamp: '10:00',
          messages: [{ id: 'm1', sender: 'user', content: 'chneya wra9 el passeport?', timestamp: '10:00' }],
        },
        {
          id: 'uuid-cin',
          title: 'CIN',
          timestamp: '10:05',
          messages: [{ id: 'm2', sender: 'user', content: 'kifech nbaddel CIN?', timestamp: '10:05' }],
        },
      ];

      const { unique, duplicateIds } = deduplicateSessions(sessions);

      expect(unique).toHaveLength(2);
      expect(duplicateIds).toHaveLength(0);
    });

    it('deduplicates cloud raw rows correctly', () => {
      const rawRows = [
        {
          id: 'cloud-1',
          title: 'hi',
          messages: [{ sender: 'user', content: 'hi' }],
        },
        {
          id: 'cloud-2',
          title: 'hi',
          messages: [
            { sender: 'user', content: 'hi' },
            { sender: 'assistant', content: 'Ahla bik!' },
          ],
        },
      ];

      const { unique, duplicateIds } = deduplicateCloudSessions(rawRows);

      expect(unique).toHaveLength(1);
      expect(unique[0].id).toBe('cloud-2');
      expect(duplicateIds).toEqual(['cloud-1']);
    });
  });
});
