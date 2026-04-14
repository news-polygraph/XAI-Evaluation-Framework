import React, { useState } from 'react';

export default function TruthfulnessMultipleChoice({ 
  initialScore, 
  options = [],
  interactive = false, 
  onChange 
}: { 
  initialScore?: string;
  options: string[];
  interactive?: boolean;
  onChange?: (score: string) => void;
}) {
  const [score, setScore] = useState<string | undefined>(initialScore);

  const handleSelection = (value: string) => {
    if (!interactive) return;
    setScore(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      {options.map((option, index) => (
        <label
          key={index}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '12px',
            borderRadius: '6px',
            border: score === option ? '1px solid #19B394' : '1px solid #E5E5E5',
            backgroundColor: score === option ? '#19B3941A' : '#FFFFFF', // 10% opacity of primary color
            cursor: interactive ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
          }}
        >
          <input
            type="radio"
            value={option}
            checked={score === option}
            onChange={() => handleSelection(option)}
            disabled={!interactive}
            style={{
              marginTop: '4px', // Align the radio button with the first line of text
              cursor: interactive ? 'pointer' : 'default',
              accentColor: '#19B394', // Colors the native radio button green
              transform: 'scale(1.2)' // Makes the radio button slightly larger
            }}
          />
          <span 
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.5', 
              color: '#1D1D1F' 
            }}
          >
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}
