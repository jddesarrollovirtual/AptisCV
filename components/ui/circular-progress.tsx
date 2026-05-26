import React, { useState, useEffect } from 'react';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ 
  score, 
  size = 200, 
  strokeWidth = 12 
}) => {
  const [displayedScore, setDisplayedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const end = Math.min(Math.max(score, 0), 100);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayedScore(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayedScore / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 50) return '#ef4444';
    if (s < 75) return '#eab308';
    return '#22c55e';
  };

  const currentColor = getColor(displayedScore);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full drop-shadow-xl">
        <circle
          style={{ stroke: '#334155' }}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-100 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={currentColor}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ 
            filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))',
            stroke: currentColor 
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-6xl font-bold tracking-tighter" style={{ color: currentColor }}>
          {displayedScore}%
        </span>
        <span className="text-sm text-slate-400 font-medium uppercase tracking-widest mt-1">ATS Match</span>
      </div>
    </div>
  );
};
