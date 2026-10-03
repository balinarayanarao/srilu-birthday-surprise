import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audioSystem';
import { fireGentleConfetti } from '../utils/confetti';

export default function Cake({ onNext }) {
  const [blownOut, setBlownOut] = useState(false);

  const handleBlowCandle = () => {
    if (blownOut) return;
    setBlownOut(true);
    sound.init();
    sound.playCandleBlow();
    setTimeout(() => {
      fireGentleConfetti();
    }, 300);
  };

  return (
    <div className="screen-wrapper" style={{ minHeight: '82vh', userSelect: 'none' }}>
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '1.5rem' }}
      >
        <span style={{
          fontSize: '0.88rem',
          color: 'var(--accent-gold-light)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          First things first 🎂
        </span>
        <h2 className="font-serif title-gradient-pink" style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginTop: '0.3rem',
        }}>
          Someone deserves a birthday cake.
        </h2>
      </motion.div>

      {/* The Animated Birthday Cake */}
      <div
        onClick={handleBlowCandle}
        style={{
          position: 'relative',
          width: '280px',
          height: '240px',
          margin: '0 auto 1.5rem auto',
          cursor: blownOut ? 'default' : 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {/* Warm Ambient Glow behind cake */}
        <motion.div
          animate={{
            scale: blownOut ? [1, 1.2, 1] : [1, 1.08, 1],
            opacity: blownOut ? 0.3 : [0.4, 0.75, 0.4],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '20px',
            width: '220px',
            height: '200px',
            borderRadius: '50%',
            background: blownOut
              ? 'radial-gradient(circle, rgba(255, 117, 160, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(253, 224, 71, 0.5) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 75%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />

        {/* SVG Cake Artwork */}
        <div style={{ position: 'relative', width: '240px', height: '220px' }}>
          <svg viewBox="0 0 240 220" width="100%" height="100%">
            <defs>
              <linearGradient id="cakePlate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>

              {/* Lavender floral frosting inspired by photo */}
              <linearGradient id="frostingBottom" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="60%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>

              <linearGradient id="frostingTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e9d5ff" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>

              <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#fdf2f8" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>

              <radialGradient id="flameGrad" cx="50%" cy="80%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fef08a" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </radialGradient>
            </defs>

            {/* Serving Plate */}
            <ellipse cx="120" cy="205" rx="100" ry="12" fill="url(#cakePlate)" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.5))" />
            <ellipse cx="120" cy="202" rx="90" ry="8" fill="#f3f4f6" opacity="0.6" />

            {/* Tier 1 (Bottom Cake) */}
            <rect x="40" y="145" width="160" height="52" rx="16" fill="url(#frostingBottom)" />
            {/* Piped cream bottom trim */}
            <path d="M40,145 Q50,158 60,145 Q70,158 80,145 Q90,158 100,145 Q110,158 120,145 Q130,158 140,145 Q150,158 160,145 Q170,158 180,145 Q190,158 200,145" fill="#fdf4ff" opacity="0.8" />
            {/* Delicate pearl decorations */}
            {[55, 75, 95, 115, 135, 155, 175, 190].map((cx, i) => (
              <circle key={i} cx={cx} cy="170" r="3" fill="#fef08a" opacity="0.9" />
            ))}

            {/* Tier 2 (Top Cake) */}
            <rect x="68" y="100" width="104" height="48" rx="14" fill="url(#frostingTop)" />
            {/* Piped cream top trim */}
            <path d="M68,100 Q78,110 88,100 Q98,110 108,100 Q118,110 128,100 Q138,110 148,100 Q158,110 172,100" fill="#ffffff" opacity="0.9" />
            {/* Floral rosettes on top tier */}
            {[82, 102, 120, 138, 158].map((cx, i) => (
              <circle key={`rose-${i}`} cx={cx} cy="100" r="5" fill="#f472b6" opacity="0.9" />
            ))}

            {/* Candle Stick */}
            <rect x="116" y="58" width="8" height="42" rx="3" fill="url(#candleGrad)" />
            {/* Candle stripes */}
            <line x1="116" y1="68" x2="124" y2="72" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
            <line x1="116" y1="80" x2="124" y2="84" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
            {/* Wick */}
            <line x1="120" y1="58" x2="120" y2="52" stroke="#4b5563" strokeWidth="1.5" />

            {/* Candle Flame (Interactive / Blow out) */}
            {!blownOut ? (
              <g className="flame-group">
                {/* Flame Outer Glow */}
                <ellipse cx="120" cy="38" rx="10" ry="16" fill="url(#flameGrad)" />
                {/* Flame Inner Core */}
                <ellipse cx="120" cy="40" rx="4" ry="9" fill="#ffffff" opacity="0.9" />
              </g>
            ) : (
              /* Smoke wisps when extinguished */
              <g className="smoke-group" opacity="0.8">
                <path d="M120,50 Q114,35 122,25 T118,10" stroke="#d8b4fe" strokeWidth="2" fill="none" opacity="0.6">
                  <animate attributeName="d" dur="2s" repeatCount="indefinite"
                    values="M120,50 Q114,35 122,25 T118,10; M120,50 Q126,38 116,22 T122,8; M120,50 Q114,35 122,25 T118,10" />
                </path>
                <circle cx="118" cy="18" r="3" fill="#e9d5ff" opacity="0.4" />
              </g>
            )}
          </svg>
        </div>

        {/* Tap Candle Prompt */}
        {!blownOut && (
          <motion.div
            onClick={handleBlowCandle}
            role="button"
            tabIndex={0}
            animate={{ scale: [1, 1.06, 1], y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              marginTop: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'rgba(253, 224, 71, 0.15)',
              border: '1px solid rgba(253, 224, 71, 0.35)',
              borderRadius: '999px',
              cursor: 'pointer',
            }}
          >
            <Sparkles size={14} color="#fde047" />
            <span style={{ fontSize: '0.82rem', color: '#fef08a', fontWeight: 600 }}>
              Tap the candle to blow it out 🕯️
            </span>
          </motion.div>
        )}
      </div>

      {/* Post-blow message & CTA */}
      <AnimatePresence>
        {blownOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ width: '100%', maxWidth: '380px' }}
          >
            <div className="glass-panel" style={{ padding: '1.4rem 1.2rem', marginBottom: '1.2rem' }}>
              <h3 className="font-serif title-gradient-pink" style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                marginBottom: '0.3rem',
              }}>
                Happy Birthday, Srilu! ❤️
              </h3>
              <p className="font-handwriting" style={{
                fontSize: '1.25rem',
                color: 'var(--accent-gold-light)',
              }}>
                Now the real surprise begins...
              </p>
            </div>

            <button onClick={onNext} className="btn-primary" style={{ width: '100%', maxWidth: '240px' }}>
              Continue <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .flame-group {
          transform-origin: 120px 48px;
          animation: flicker 1.4s infinite alternate ease-in-out;
        }
        @keyframes flicker {
          0% { transform: scale(1) rotate(-1deg); }
          50% { transform: scale(1.12) rotate(2deg); }
          100% { transform: scale(0.96) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
}
