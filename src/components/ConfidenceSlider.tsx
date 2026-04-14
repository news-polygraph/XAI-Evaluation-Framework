import React, { useState } from "react";

export default function ConfidenceSlider({
  initialScore,
  onChange,
}: {
  initialScore?: number;
  onChange: (score: number) => void;
}) {
  const [score, setScore] = useState<number | undefined>(initialScore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setScore(value);
    onChange(value);
  };

  return (
    <div css={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      <h2>Your Confidence</h2>
      <p css={{ fontSize: "14px", color: "#4F4F4F", margin: 0 }}>
        How confident are you in your answer?
      </p>
      
      <div css={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
        <span css={{ fontSize: "12px", color: "#666", fontWeight: 600 }}>0%</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={score !== undefined ? score : 50} 
          onChange={handleChange}
          css={{ 
            flex: 1, 
            accentColor: "#19B394", 
            cursor: "pointer",
            height: "6px"
          }}
        />
        <span css={{ fontSize: "12px", color: "#666", fontWeight: 600 }}>100%</span>
      </div>
      
      <div css={{ textAlign: "center", fontSize: "14px", fontWeight: "bold", color: "#19B394" }}>
        {score !== undefined ? `${score}% Confident` : "Please set your confidence"}
      </div>
    </div>
  );
}
