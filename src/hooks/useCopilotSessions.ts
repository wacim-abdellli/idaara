'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types/chat';

export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: ChatMessage[];
}

const STORAGE_SESSIONS_KEY = 'idaara_copilot_saved_sessions';
const STORAGE_ACTIVE_ID_KEY = 'idaara_copilot_active_session_id';

export function useCopilotSessions(onAutoQuery?: (query: string) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => `session-${Date.now()}`);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<ChatSession | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  // ── Load Chat Sessions & Active Thread with Auto-Deduplication ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedSessions = localStorage.getItem(STORAGE_SESSIONS_KEY);
      const loadedSessions: ChatSession[] = [];
      if (savedSessions) {
        const parsed = JSON.parse(savedSessions);
        if (Array.isArray(parsed)) {
          // Deduplicate sessions strictly by unique ID
          const seenIds = new Set<string>();
          for (const s of parsed) {
            if (s && s.id && !seenIds.has(s.id)) {
              seenIds.add(s.id);
              loadedSessions.push(s);
            }
          }
          setSessions(loadedSessions);
          localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(loadedSessions));
        }
      }

      const savedActiveId = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
      if (savedActiveId && loadedSessions.length > 0) {
        const activeSession = loadedSessions.find((s) => s.id === savedActiveId);
        if (activeSession) {
          setCurrentSessionId(activeSession.id);
          setMessages(activeSession.messages || []);
        }
      }
    } catch (err) {
      console.warn('Failed to load chat history:', err);
    }
    setIsInitialized(true);

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q && q.trim()) {
      const sanitized = q.trim().slice(0, 500).replace(/[\x00-\x1F\x7F]/g, '');
      if (sanitized.length > 0 && onAutoQuery) {
        onAutoQuery(sanitized);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Persist Active Messages & Sessions ──
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_ACTIVE_ID_KEY, currentSessionId);

        const firstUserMsg = messages.find((m) => m.sender === 'user')?.content || 'Discussion';
        const defaultTitle = firstUserMsg.slice(0, 32) + (firstUserMsg.length > 32 ? '...' : '');

        setSessions((prev) => {
          const exists = prev.find((s) => s.id === currentSessionId);
          let updated: ChatSession[];
          if (exists) {
            const preservedTitle = exists.title && exists.title !== 'Discussion' ? exists.title : defaultTitle;
            updated = prev.map((s) => (s.id === currentSessionId ? { ...s, title: preservedTitle, messages } : s));
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
      }
    } catch (err) {
      console.warn('Failed to persist messages:', err);
    }
  }, [messages, isInitialized, currentSessionId]);

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

  const confirmDeleteSession = useCallback(() => {
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
  }, [sessionToDelete, currentSessionId, handleNewChat]);

  const startRenaming = useCallback((e: React.MouseEvent, sess: ChatSession) => {
    e.stopPropagation();
    setEditingSessionId(sess.id);
    setEditingTitle(sess.title);
  }, []);

  const saveRenamedTitle = useCallback((e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent, id?: string) => {
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
    }
    setEditingSessionId(null);
  }, [editingSessionId, editingTitle]);

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
