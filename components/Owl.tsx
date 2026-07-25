import { useState, useEffect } from 'react';

export type OwlMood = 'idle' | 'bounce' | 'shake' | 'nod' | 'wiggle' | 'think' | 'celebrate' | 'wrong' | 'listen' | 'remind' | 'happy' | 'wise' | 'correct' | 'thinking' | 'listening';

interface OwlProps {
  mood?: OwlMood;
  size?: number;
  className?: string;
  animated?: boolean;
}

export function Owl({ mood = 'idle', size = 200, className = '' }: OwlProps) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass(`owl-${mood}`);
    if (mood !== 'idle' && mood !== 'remind' && mood !== 'listen') {
      const timer = setTimeout(() => setAnimationClass(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [mood]);

  return (
    <div 
      className={`relative inline-block ${animationClass} ${className}`}
      style={{ width: size, height: size * 1.2 }}
    >
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body */}
        <ellipse cx="100" cy="170" rx="70" ry="60" fill="#D2B48C" />
        <ellipse cx="100" cy="165" rx="60" ry="50" fill="#FFFDD0" />
        
        {/* Belly pattern */}
        <ellipse cx="100" cy="180" rx="35" ry="40" fill="#F5F5DC" />
        
        {/* Left Wing */}
        <g className="owl-wing-left">
          <ellipse cx="35" cy="160" rx="25" ry="45" fill="#8B4513" transform="rotate(-15 35 160)" />
          <ellipse cx="38" cy="158" rx="18" ry="38" fill="#D2B48C" transform="rotate(-15 38 158)" />
        </g>
        
        {/* Right Wing */}
        <g className="owl-wing-right">
          <ellipse cx="165" cy="160" rx="25" ry="45" fill="#8B4513" transform="rotate(15 165 160)" />
          <ellipse cx="162" cy="158" rx="18" ry="38" fill="#D2B48C" transform="rotate(15 162 158)" />
        </g>
        
        {/* Head */}
        <circle cx="100" cy="80" r="55" fill="#8B4513" />
        <circle cx="100" cy="82" r="48" fill="#D2B48C" />
        
        {/* Ear tufts */}
        <path d="M55 45 L65 75 L50 70 Z" fill="#8B4513" />
        <path d="M145 45 L135 75 L150 70 Z" fill="#8B4513" />
        <path d="M58 48 L65 72 L53 68 Z" fill="#A0522D" />
        <path d="M142 48 L135 72 L147 68 Z" fill="#A0522D" />
        
        {/* Face disc */}
        <ellipse cx="100" cy="90" rx="42" ry="35" fill="#FFFDD0" />
        
        {/* Eye whites */}
        <g className="owl-eye">
          <ellipse cx="78" cy="80" rx="18" ry="18" fill="white" />
          <ellipse cx="122" cy="80" rx="18" ry="18" fill="white" />
        </g>
        
        {/* Pupils */}
        <g className="owl-eye">
          <circle cx="80" cy="82" r="10" fill="#0f172a" />
          <circle cx="120" cy="82" r="10" fill="#0f172a" />
          <circle cx="83" cy="79" r="3" fill="white" />
          <circle cx="123" cy="79" r="3" fill="white" />
        </g>
        
        {/* Beak */}
        <path d="M100 95 L92 110 L100 105 L108 110 Z" fill="#F59E0B" />
        <path d="M100 95 L92 110 L100 105 Z" fill="#D97706" />
        
        {/* Feet */}
        <g fill="#F59E0B">
          <path d="M65 225 L60 235 L55 230 L60 240 L65 235 L70 240 L75 230 L70 235 Z" />
          <path d="M135 225 L130 235 L125 230 L130 240 L135 235 L140 240 L145 230 L140 235 Z" />
        </g>
        
        {/* Branch/Perch */}
        <rect x="20" y="228" width="160" height="12" rx="6" fill="#8B4513" />
        <rect x="25" y="230" width="150" height="6" rx="3" fill="#A0522D" />
        
        {/* Graduation cap (for celebrate) */}
        {mood === 'celebrate' && (
          <g className="animate-bounce">
            <rect x="60" y="25" width="80" height="8" fill="#0f172a" />
            <polygon points="100,5 60,30 140,30" fill="#0f172a" />
            <circle cx="100" cy="12" r="4" fill="#d4af37" />
            <line x1="130" y1="30" x2="145" y2="50" stroke="#d4af37" strokeWidth="2" />
            <circle cx="145" cy="55" r="5" fill="#d4af37" />
          </g>
        )}
        
        {/* Question mark (for think) */}
        {mood === 'think' && (
          <g className="animate-pulse">
            <text x="140" y="50" fontSize="30" fill="#0f766e" fontWeight="bold">?</text>
          </g>
        )}
        
        {/* Heart (for wrong) */}
        {mood === 'wrong' && (
          <g className="animate-ping">
            <text x="140" y="50" fontSize="24" fill="#ef4444">💔</text>
          </g>
        )}
      </svg>
      
      {/* Confetti particles for celebrate mood */}
      {mood === 'celebrate' && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute confetti"
              style={{
                left: `${30 + (i * 10)}%`,
                top: '20%',
                animationDelay: `${i * 0.1}s`,
                fontSize: '16px',
              }}
            >
              {['🎉', '⭐', '✨', '🌙', '📿'][i % 5]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
