import React, { useState } from 'react';

export default function TruthfulnessBoolean({ 
  initialScore, 
  interactive = false, 
  onChange 
}: { 
  initialScore?: boolean; 
  interactive?: boolean; 
  onChange?: (score: boolean) => void 
}) {
  const [score, setScore] = useState<boolean | undefined>(initialScore);

  const handleSelection = (value: boolean) => {
    if (!interactive) return;
    setScore(value);
    if (onChange) onChange(value);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', width: '100%', height: '40px' }}>
      <button 
        onClick={() => handleSelection(true)}
        style={{
          flex: 1, 
          backgroundColor: score === true ? '#19B394' : '#E5E5E5',
          color: score === true ? 'white' : 'black',
          border: 'none', borderRadius: '4px', cursor: interactive ? 'pointer' : 'default'
        }}>
        True
      </button>
      <button 
        onClick={() => handleSelection(false)}
        style={{
          flex: 1, 
          backgroundColor: score === false ? '#E60A3E' : '#E5E5E5',
          color: score === false ? 'white' : 'black',
          border: 'none', borderRadius: '4px', cursor: interactive ? 'pointer' : 'default'
        }}>
        False
      </button>
    </div>
  );
}
