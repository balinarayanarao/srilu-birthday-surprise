import React, { useMemo } from 'react';

export default function AmbientBackground() {
  // Generate random twinkling stars and gentle floating orbs
  const stars = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.3 + Math.sin(i) * 5) % 100}%`,
      top: `${(i * 3.7 + Math.cos(i) * 5) % 100}%`,
      size: (i % 3) + 1.5,
      delay: (i * 0.35) % 5,
      duration: 3 + (i % 4),
      opacity: 0.2 + (i % 5) * 0.15,
    }));
  }, []);

  const orbs = useMemo(() => {
    return [
      { top: '10%', left: '15%', size: '280px', color: 'rgba(255, 117, 160, 0.12)' },
      { top: '55%', right: '5%', size: '320px', color: 'rgba(168, 85, 247, 0.12)' },
      { bottom: '10%', left: '20%', size: '300px', color: 'rgba(245, 158, 11, 0.08)' },
    ];
  }, []);

  return (
    <div className="ambient-particles-bg" aria-hidden="true">
      {/* Soft color atmospheric gradients */}
      {orbs.map((orb, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(45px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
      ))}

      {/* Twinkling tiny stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: star.id % 2 === 0 ? '#ffb8d2' : '#fde047',
            opacity: star.opacity,
            boxShadow: `0 0 8px ${star.id % 2 === 0 ? '#ff75a0' : '#f59e0b'}`,
            animation: `starTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes starTwinkle {
          0% { transform: scale(0.6); opacity: 0.15; }
          100% { transform: scale(1.3); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
