'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage } from '../types/chat';
import { useAuth } from '../context/AuthContext';

export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: ChatMessage[];
}

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

function areSessionsDuplicates(a: ChatSession, b: ChatSession): boolean {
  const msgsA = a.messages || [];
  const msgsB = b.messages || [];

  if (msgsA.length === 0 && msgsB.length === 0) {
    return a.title === b.title;
  }
  if (msgsA.length === 0 || msgsB.length === 0) {
    return a.title === b.title;
  }

  const minLen = Math.min(msgsA.length, msgsB.length);
  for (let i = 0; i < minLen; i++) {
    if (msgsA[i].sender !== msgsB[i].sender || msgsA[i].content !== msgsB[i].content) {
      return false;
    }
  }

  return true;
}

export function deduplicateSessions(sessions: ChatSession[]): { unique: ChatSession[]; duplicateIds: string[] } {
  const unique: ChatSession[] = [];
  const duplicateIds: string[] = [];

  for (const session of sessions) {
    const matchIndex = unique.findIndex((u) => areSessionsDuplicates(u, session));
    if (matchIndex === -1) {
      unique.push(session);
    } else {
      const existing = unique[matchIndex];
      const sessionLen = session.messages?.length || 0;
      const existLen = existing.messages?.length || 0;
      if (sessionLen > existLen) {
        duplicateIds.push(existing.id);
        unique[matchIndex] = session;
      } else {
        duplicateIds.push(session.id);
      }
    }
  }

  return { unique, duplicateIds };
}

const STORAGE_SESSIONS_KEY = 'idaara_copilot_saved_sessions';
const STORAGE_ACTIVE_ID_KEY = 'idaara_copilot_active_session_id';

export function useCopilotSessions(onAutoQuery?: (query: string) => void) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => generateUUID());
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<ChatSession | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Load Chat Sessions (Cloud DB if signed in, fallback to LocalStorage) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;

    async function loadSessions() {
      // 1. Instantly restore from localStorage cache (0ms, zero-flash on reload)
      let hasLocal = false;
      try {
        const savedSessions = localStorage.getItem(STORAGE_SESSIONS_KEY);
        const savedActiveId = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const seenIds = new Set<string>();
            const loadedSessions: ChatSession[] = [];
            for (const s of parsed) {
              if (s && s.id && !seenIds.has(s.id)) {
                seenIds.add(s.id);
                loadedSessions.push(s);
              }
            }
            const { unique: cleanLoaded } = deduplicateSessions(loadedSessions);
            if (cleanLoaded.length > 0 && isMounted) {
              const activeSession = cleanLoaded.find((s) => s.id === savedActiveId) || cleanLoaded[0];
              setSessions(cleanLoaded);
              setCurrentSessionId(activeSession.id);
              setMessages(activeSession.messages || []);
              setIsInitialized(true);
              hasLocal = true;
            }
          }
        }
      } catch (localErr) {
        console.warn('Failed to load local session cache:', localErr);
      }

      // 2. Background cloud DB sync
      if (user) {
        try {
          const res = await fetch('/api/sessions');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.sessions) && isMounted) {
              if (data.sessions.length > 0) {
                const rawCloudSessions: ChatSession[] = data.sessions.map((s: { id: string; title: string; messages: ChatMessage[]; updated_at: string }) => ({
                  id: s.id,
                  title: s.title,
                  timestamp: new Date(s.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  messages: s.messages || [],
                }));

                const { unique: cloudSessions, duplicateIds } = deduplicateSessions(rawCloudSessions);

                // Background purge of ghost duplicate sessions
                if (duplicateIds.length > 0) {
                  duplicateIds.forEach((dupId) => {
                    if (isValidUUID(dupId)) {
                      fetch(`/api/sessions/${dupId}`, { method: 'DELETE' }).catch(() => {});
                    }
                  });
                }

                setSessions(cloudSessions);

                // If not restored from local storage, adopt first cloud session
                if (!hasLocal && cloudSessions.length > 0) {
                  setCurrentSessionId(cloudSessions[0].id);
                  setMessages(cloudSessions[0].messages);
                }

                if (typeof window !== 'undefined') {
                  localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(cloudSessions));
                }
              }
            }
          }
        } catch (err) {
          console.warn('Could not fetch cloud sessions:', err);
        }
      }

      if (isMounted) {
        setIsInitialized(true);
      }
    }

    loadSessions();

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q && q.trim()) {
      const sanitized = q.trim().slice(0, 500).replace(/[\x00-\x1F\x7F]/g, '');
      if (sanitized.length > 0 && onAutoQuery) {
        onAutoQuery(sanitized);
      }
    }

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ── Persist Active Messages & Sessions (Dual: Cloud + Local) ──
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;

    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_ACTIVE_ID_KEY, currentSessionId);

        const firstUserMsg = messages.find((m) => m.sender === 'user')?.content || 'Discussion';
        const defaultTitle = firstUserMsg.slice(0, 32) + (firstUserMsg.length > 32 ? '...' : '');

        let targetTitle = defaultTitle;

        // eslint-disable-next-line react-hooks/set-state-in-effect -- update session title and message cache when active messages change
        setSessions((prev) => {
          const exists = prev.find((s) => s.id === currentSessionId);
          let updated: ChatSession[];
          if (exists) {
            targetTitle = exists.title && exists.title !== 'Discussion' ? exists.title : defaultTitle;
            updated = prev.map((s) => (s.id === currentSessionId ? { ...s, title: targetTitle, messages } : s));
          } else {
            updated = [
              {
                id: currentSessionId,
                title: defaultTitle,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                messages,
              },
              ...prev.slice(0, 20),
            ];
          }
          localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
          return updated;
        });

        // Cloud sync with debounce
        if (user) {
          if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
          saveTimeoutRef.current = setTimeout(async () => {
            try {
              const safeId = isValidUUID(currentSessionId) ? currentSessionId : generateUUID();
              if (safeId !== currentSessionId) {
                setCurrentSessionId(safeId);
                if (typeof window !== 'undefined') {
                  localStorage.setItem(STORAGE_ACTIVE_ID_KEY, safeId);
                }
              }

              const res = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: safeId,
                  title: targetTitle,
                  messages,
                }),
              });

              if (res.ok) {
                const data = await res.json();
                if (data.session?.id && data.session.id !== safeId) {
                  setCurrentSessionId(data.session.id);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem(STORAGE_ACTIVE_ID_KEY, data.session.id);
                  }
                }
              }
            } catch (cloudErr) {
              console.warn('Debounced cloud session save failed:', cloudErr);
            }
          }, 2000);
        }
      }
    } catch (err) {
      console.warn('Failed to persist messages:', err);
    }

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [messages, isInitialized, currentSessionId, user]);

  const handleNewChat = useCallback(() => {
    const newId = generateUUID();
    setCurrentSessionId(newId);
    setMessages([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ACTIVE_ID_KEY, newId);
    }
  }, []);

  const loadSession = useCallback((session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages || []);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ACTIVE_ID_KEY, session.id);
    }
  }, []);

  const promptDeleteSession = useCallback((e: React.MouseEvent, sess: ChatSession) => {
    e.stopPropagation();
    setSessionToDelete(sess);
  }, []);

  const confirmDeleteSession = useCallback(async () => {
    if (!sessionToDelete) return;
    const id = sessionToDelete.id;

    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
      }
      return updated;
    });

    if (currentSessionId === id) {
      handleNewChat();
    }
    setSessionToDelete(null);

    // Delete from cloud if user is logged in
    if (user && isValidUUID(id)) {
      try {
        await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Cloud session delete failed:', err);
      }
    }
  }, [sessionToDelete, currentSessionId, handleNewChat, user]);

  const startRenaming = useCallback((e: React.MouseEvent, sess: ChatSession) => {
    e.stopPropagation();
    setEditingSessionId(sess.id);
    setEditingTitle(sess.title);
  }, []);

  const saveRenamedTitle = useCallback(async (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent, id?: string) => {
    if (e) e.stopPropagation();
    const targetId = id || editingSessionId;
    if (!targetId) return;

    const trimmed = editingTitle.trim();
    if (trimmed) {
      setSessions((prev) => {
        const updated = prev.map((s) => (s.id === targetId ? { ...s, title: trimmed } : s));
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      if (user && isValidUUID(targetId)) {
        try {
          await fetch(`/api/sessions/${targetId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: trimmed }),
          });
        } catch (err) {
          console.warn('Cloud session rename failed:', err);
        }
      }
    }
    setEditingSessionId(null);
  }, [editingSessionId, editingTitle, user]);

  const cancelRenaming = useCallback((e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setEditingSessionId(null);
  }, []);

  return {
    messages,
    setMessages,
    sessions,
    currentSessionId,
    isInitialized,
    sessionToDelete,
    setSessionToDelete,
    editingSessionId,
    setEditingSessionId,
    editingTitle,
    setEditingTitle,
    handleNewChat,
    loadSession,
    promptDeleteSession,
    confirmDeleteSession,
    startRenaming,
    saveRenamedTitle,
    cancelRenaming,
  };
}
