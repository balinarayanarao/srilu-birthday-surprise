import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { sound } from '../utils/audioSystem';
import { fireGentleConfetti } from '../utils/confetti';

export default function BirthdayReveal({ onNext }) {
  useEffect(() => {
    sound.init();
    sound.playCelebration();
    const t = setTimeout(() => {
      fireGentleConfetti();
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  // Calculate coordinates for mini hearts forming a heart shape
  const miniHearts = useMemo(() => {
    const points = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * (Math.PI * 2);
      // Classic parametric heart equation
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({
        id: i,
        // Scale and shift coordinates
        targetX: x * 4.6,
        targetY: y * 4.6,
        initialX: (Math.random() - 0.5) * 260,
        initialY: 150 + Math.random() * 120,
        size: 14 + (i % 3) * 3,
        delay: (i * 0.05),
      });
    }
    return points;
  }, []);

  return (
    <div
      onClick={onNext}
      className="screen-wrapper"
      style={{
        minHeight: '82vh',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '1rem',
      }}
    >
      {/* Floating mini hearts assembling into a giant heart balloon */}
      <div style={{
        position: 'relative',
        width: '240px',
        height: '210px',
        margin: '0 auto 1.5rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Central warm glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.65, scale: [1, 1.15, 1] }}
          transition={{
            opacity: { delay: 1, duration: 1 },
            scale: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
          }}
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 117, 160, 0.45) 0%, rgba(244, 63, 94, 0.1) 60%, transparent 100%)',
            filter: 'blur(28px)',
          }}
        />

        {/* Small hearts animating into heart formation */}
        {miniHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{
              x: h.initialX,
              y: h.initialY,
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              x: h.targetX,
              y: h.targetY,
              opacity: [0, 1, 0.85],
              scale: 1,
            }}
            transition={{
              duration: 1.4,
              delay: h.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              color: h.id % 2 === 0 ? '#ff75a0' : '#f43f5e',
              filter: 'drop-shadow(0 0 6px rgba(255, 117, 160, 0.7))',
            }}
          >
            <Heart size={h.size} fill="currentColor" />
          </motion.div>
        ))}

        {/* Central glowing heart emblem that pulses softly once assembled */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [0.95, 1.05, 0.95] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.8 },
            scale: { delay: 1.2, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={{
            position: 'relative',
            zIndex: 10,
            color: '#f43f5e',
            filter: 'drop-shadow(0 0 16px rgba(255, 117, 160, 0.85))',
          }}
        >
          <Heart size={44} fill="#ff75a0" />
        </motion.div>
      </div>

      {/* Birthday Reveal Text */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
          marginBottom: '0.6rem',
        }}>
          It's officially your day...
        </p>

        <h1 className="font-serif title-gradient-pink" style={{
          fontSize: 'clamp(2rem, 7vw, 2.6rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '0.8rem',
        }}>
          HAPPY BIRTHDAY, SRILU! 🎂❤️
        </h1>

        <p style={{
          fontSize: '0.98rem',
          color: 'var(--text-subtle)',
          lineHeight: 1.5,
          maxWidth: '340px',
          margin: '0 auto',
        }}>
          And just like that, another beautiful chapter begins.
        </p>

        {/* Continue Button & Tap anywhere hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          style={{ marginTop: '1.4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="btn-primary"
            style={{ minWidth: '190px' }}
          >
            Continue 🎂
          </button>
          <div className="tap-anywhere-hint" style={{ marginTop: '0.2rem' }}>
            <span>Or tap anywhere to continue</span>
            <Sparkles size={14} color="#ffd700" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
