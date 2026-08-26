'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChecklistContextType {
  checkedItems: Record<string, boolean>;
  toggleItem: (docId: string) => void;
  isItemChecked: (docId: string) => boolean;
  getProgressForProcedure: (docIds: string[]) => { completed: number; total: number; percentage: number };
  resetProcedureChecklist: (docIds: string[]) => void;
}

const ChecklistContext = createContext<ChecklistContextType | undefined>(undefined);

export function ChecklistProvider({ children }: { children: React.ReactNode }) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('idaara_checklist');
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe localStorage restore
        setCheckedItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleItem = (docId: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [docId]: !prev[docId] };
      localStorage.setItem('idaara_checklist', JSON.stringify(updated));
      return updated;
    });
  };

  const isItemChecked = (docId: string) => {
    return !!checkedItems[docId];
  };

  const getProgressForProcedure = (docIds: string[]) => {
    if (!docIds || docIds.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const completed = docIds.filter((id) => !!checkedItems[id]).length;
    const total = docIds.length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  const resetProcedureChecklist = (docIds: string[]) => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      docIds.forEach((id) => {
        delete updated[id];
      });
      localStorage.setItem('idaara_checklist', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ChecklistContext.Provider
      value={{
        checkedItems,
        toggleItem,
        isItemChecked,
        getProgressForProcedure,
        resetProcedureChecklist,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
}

export function useChecklist() {
  const context = useContext(ChecklistContext);
  if (!context) {
    throw new Error('useChecklist must be used within a ChecklistProvider');
  }
  return context;
}
