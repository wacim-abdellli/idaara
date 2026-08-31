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

const STORAGE_SESSIONS_KEY = 'idaara_copilot_saved_sessions';
const STORAGE_ACTIVE_ID_KEY = 'idaara_copilot_active_session_id';

export function useCopilotSessions(onAutoQuery?: (query: string) => void) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => `session-${Date.now()}`);
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
      if (user) {
        try {
          const res = await fetch('/api/sessions');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.sessions) && data.sessions.length > 0 && isMounted) {
              const cloudSessions: ChatSession[] = data.sessions.map((s: { id: string; title: string; messages: ChatMessage[]; updated_at: string }) => ({
                id: s.id,
                title: s.title,
                timestamp: new Date(s.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                messages: s.messages || [],
              }));

              setSessions(cloudSessions);
              setCurrentSessionId(cloudSessions[0].id);
              setMessages(cloudSessions[0].messages);
              setIsInitialized(true);
              return;
            }
          }
        } catch (err) {
          console.warn('Could not fetch cloud sessions, falling back to local storage:', err);
        }
      }

      // Local storage fallback
      try {
        const savedSessions = localStorage.getItem(STORAGE_SESSIONS_KEY);
        const loadedSessions: ChatSession[] = [];
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions);
          if (Array.isArray(parsed)) {
            const seenIds = new Set<string>();
            for (const s of parsed) {
              if (s && s.id && !seenIds.has(s.id)) {
                seenIds.add(s.id);
                loadedSessions.push(s);
              }
            }
            if (isMounted) {
              setSessions(loadedSessions);
              localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(loadedSessions));
            }
          }
        }

        const savedActiveId = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
        if (savedActiveId && loadedSessions.length > 0 && isMounted) {
          const activeSession = loadedSessions.find((s) => s.id === savedActiveId);
          if (activeSession) {
            setCurrentSessionId(activeSession.id);
            setMessages(activeSession.messages || []);
          }
        }
      } catch (err) {
        console.warn('Failed to load chat history from storage:', err);
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
              await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: currentSessionId.startsWith('session-') ? undefined : currentSessionId,
                  title: targetTitle,
                  messages,
                }),
              });
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
    const newId = `session-${Date.now()}`;
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
    if (user && !id.startsWith('session-')) {
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

      if (user && !targetId.startsWith('session-')) {
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
