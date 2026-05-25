/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useCallback, useEffect } from 'react';
import { useZebraLogicDraft } from './ZebraLogicDraftContext';
import { Entries } from './ZebraLogicDraftContext';
import TutorialTooltip from './TutorialTooltip';
import { TutorialTooltipStep } from '../model/tutorial-tooltip-step';;

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  itemId: number;
  entries: Entries;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const wrapperStyles = css`
  margin-top: 28px;

  .draft-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .draft-label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #888;
  }

  .draft-reset {
    font-size: 12px;
    font-weight: 600;
    color: #19B394;
    background: none;
    border: 1px solid #19B394;
    border-radius: 5px;
    padding: 3px 10px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: #19B394;
      color: #fff;
    }
  }

  .table-scroll {
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid #E5E5E5;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    min-width: 340px;
    font-size: 13px;
  }

  thead tr { background: #F3F3F3; }

  th {
    padding: 8px 10px;
    font-weight: 700;
    color: #555;
    text-align: center;
    border-bottom: 2px solid #E5E5E5;
    white-space: nowrap;

    &:first-of-type { text-align: left; padding-left: 14px; }
  }

  td {
    padding: 6px 8px;
    text-align: center;
    border-bottom: 1px solid #F0F0F0;

    &:first-of-type {
      text-align: left;
      padding-left: 14px;
      font-weight: 600;
      color: #333;
      white-space: nowrap;
    }
  }

  tbody tr:last-of-type td { border-bottom: none; }
  tbody tr:hover td { background: #FAFAFA; }

  select {
    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23999'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 7px center;
    border: 1px solid #D8D8D8;
    border-radius: 5px;
    padding: 4px 24px 4px 8px;
    font-size: 12px;
    color: #1D1D1F;
    cursor: pointer;
    min-width: 90px;
    transition: border-color 0.15s, box-shadow 0.15s;

    &:focus {
      outline: none;
      border-color: #19B394;
      box-shadow: 0 0 0 2px #19B39420;
    }

    &.filled {
      background-color: #F0FBF8;
      border-color: #19B394;
      font-weight: 600;
    }
  }

  .draft-note {
    margin-top: 8px;
    font-size: 11px;
    color: #ABABAB;
    text-align: right;
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRowKeys(entries: Entries): string[] {
  return Object.keys(entries).filter((k) => k !== 'Amount');
}

// ─── Component ────────────────────────────────────────────────────────────────

const ZebraLogicDraftTable: React.FC<Props> = ({ itemId, entries}) => {
  const { getDraft, setCell, resetDraft } = useZebraLogicDraft();

  // Local state is initialised from the shared store so the table
  // renders immediately with whatever the user previously filled in.
  const [draft, setDraft] = useState<Record<string, Record<number, string>>>(
    () => getDraft(itemId, entries),
  );

  // When the item changes (different question), re-sync local state from store.
  useEffect(() => {
    setDraft(getDraft(itemId, entries));
  }, [itemId]);  // eslint-disable-line react-hooks/exhaustive-deps

  const rowKeys = getRowKeys(entries);
  const columns = Array.from({ length: entries.Amount }, (_, i) => i + 1);

  const handleChange = useCallback(
    (rowKey: string, col: number, value: string) => {
      // Write to the shared store first …
      setCell(itemId, rowKey, col, value);
      // … then mirror into local state so the UI re-renders.
      setDraft((prev) => ({
        ...prev,
        [rowKey]: { ...prev[rowKey], [col]: value },
      }));
    },
    [itemId, setCell],
  );

  const handleReset = useCallback(() => {
    resetDraft(itemId, entries);
    setDraft(getDraft(itemId, entries));
  }, [itemId, entries, resetDraft, getDraft]);

  return (
    <div css={wrapperStyles}>


      <div className="draft-header">
        <span className="draft-label">Draft Area</span>
        <button className="draft-reset" onClick={handleReset} type="button">
          Reset
        </button>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>House</th>
              {columns.map((col) => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {rowKeys.map((rowKey) => {
              const options = entries[rowKey] as string[];
              return (
                <tr key={rowKey}>
                  <td>{rowKey}</td>
                  {columns.map((col) => {
                    const value = draft[rowKey]?.[col] ?? '';
                    return (
                      <td key={col}>
                        <select
                          value={value}
                          className={value ? 'filled' : ''}
                          onChange={(e) => handleChange(rowKey, col, e.target.value)}
                          aria-label={`${rowKey} for house ${col}`}
                        >
                          <option value="">—</option>
                          {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="draft-note">Draft only — not recorded or submitted.</p>
    </div>
  );
};

export default ZebraLogicDraftTable;