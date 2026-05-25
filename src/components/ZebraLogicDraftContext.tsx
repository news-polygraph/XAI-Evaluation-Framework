/** @jsxImportSource @emotion/react */
import React, { createContext, useContext, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Entries {
  Amount: number;
  [rowName: string]: string[] | number;
}

/** draft[itemId][rowKey][col] = selectedValue */
type DraftStore = Record<number, Record<string, Record<number, string>>>;

interface DraftContextValue {
  getDraft: (itemId: number, entries: Entries) => Record<string, Record<number, string>>;
  setCell: (itemId: number, rowKey: string, col: number, value: string) => void;
  resetDraft: (itemId: number, entries: Entries) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ZebraLogicDraftContext = createContext<DraftContextValue | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildEmptyDraft(entries: Entries): Record<string, Record<number, string>> {
  const draft: Record<string, Record<number, string>> = {};
  const rowKeys = Object.keys(entries).filter((k) => k !== 'Amount');
  for (const key of rowKeys) {
    draft[key] = {};
    for (let col = 1; col <= entries.Amount; col++) {
      draft[key][col] = '';
    }
  }
  return draft;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * Wrap your top-level survey/questionnaire component with this provider.
 * It stores draft state in a ref (not useState) so updates don't force
 * re-renders of the provider itself — only the table re-renders via its
 * own local useState that is synced on demand.
 */
export const ZebraLogicDraftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // useRef so the store survives across page navigation without triggering
  // a full tree re-render on every cell change.
  const storeRef = useRef<DraftStore>({});

  const getDraft = useCallback(
    (itemId: number, entries: Entries): Record<string, Record<number, string>> => {
      if (!storeRef.current[itemId]) {
        storeRef.current[itemId] = buildEmptyDraft(entries);
      }
      return storeRef.current[itemId];
    },
    [],
  );

  const setCell = useCallback(
    (itemId: number, rowKey: string, col: number, value: string) => {
      if (!storeRef.current[itemId]) return;
      storeRef.current[itemId] = {
        ...storeRef.current[itemId],
        [rowKey]: {
          ...storeRef.current[itemId][rowKey],
          [col]: value,
        },
      };
    },
    [],
  );

  const resetDraft = useCallback((itemId: number, entries: Entries) => {
    storeRef.current[itemId] = buildEmptyDraft(entries);
  }, []);

  return (
    <ZebraLogicDraftContext.Provider value={{ getDraft, setCell, resetDraft }}>
      {children}
    </ZebraLogicDraftContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useZebraLogicDraft() {
  const ctx = useContext(ZebraLogicDraftContext);
  if (!ctx) {
    throw new Error('useZebraLogicDraft must be used inside <ZebraLogicDraftProvider>');
  }
  return ctx;
}