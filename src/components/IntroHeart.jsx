import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Heart } from 'lucide-react';
import { sound } from '../utils/audioSystem';

export default function IntroHeart({ onNext }) {
  const [isPulled, setIsPulled] = useState(false);
  const [particles, setParticles] = useState([]);
  const controls = useAnimation();

  const handleTrigger = (e) => {
    if (isPulled) return;
    setIsPulled(true);

    // Audio feedback
    sound.init();
    sound.playHeartBeat();
    sound.playSparkle(1046.5);

    // Generate burst particles
    const newParticles = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      angle: (i / 16) * 360,
      dist: 50 + Math.random() * 60,
      size: 10 + Math.random() * 12,
    }));
    setParticles(newParticles);

    // Transition to next after brief release animation
    setTimeout(() => {
      onNext();
    }, 1100);
  };

  return (
    <div className="screen-wrapper" style={{ minHeight: '80vh', userSelect: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ marginBottom: '2.5rem' }}
      >
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-subtle)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          A little something…
        </p>
        <h2 className="font-serif title-gradient-pink" style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          lineHeight: 1.3,
        }}>
          for someone very special ❤️
        </h2>
      </motion.div>

      {/* Interactive Floating / Pullable Heart Container */}
      <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Soft radial glow halo */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 117, 160, 0.4) 0%, rgba(244, 63, 94, 0.05) 70%, transparent 100%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />

        {/* Burst particles */}
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const targetX = Math.cos(rad) * p.dist;
          const targetY = Math.sin(rad) * p.dist;

          return (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, scale: 0.8, opacity: 1 }}
              animate={{ x: targetX, y: targetY, scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                color: '#ff75a0',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              <Heart size={p.size} fill="#ff75a0" />
            </motion.div>
          );
        })}

        {/* The Heart */}
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.45}
          onDragStart={() => sound.playHeartBeat()}
          onDragEnd={(e, info) => {
            const offset = Math.hypot(info.offset.x, info.offset.y);
            if (offset > 30) {
              handleTrigger();
            }
          }}
          onClick={handleTrigger}
          onTap={handleTrigger}
          animate={
            isPulled
              ? { scale: [1, 1.35, 0], opacity: [1, 1, 0] }
              : {
                  scale: [1, 1.08, 1],
                  y: [0, -6, 0],
                }
          }
          transition={
            isPulled
              ? { duration: 0.7, ease: 'backIn' }
              : {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          style={{
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            touchAction: 'none',
          }}
        >
          <div style={{
            position: 'relative',
            filter: 'drop-shadow(0 0 25px rgba(255, 117, 160, 0.75))',
          }}>
            <svg width="110" height="110" viewBox="0 0 24 24" fill="url(#heartGradient)">
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff75a0" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Pull / Tap instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ marginTop: '2.5rem' }}
      >
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--accent-pink-light)',
          fontWeight: 500,
          letterSpacing: '0.04em',
        }}>
          {isPulled ? 'Opening your surprise...' : 'Pull or tap the heart'}
        </p>

        <p className="font-handwriting" style={{
          fontSize: '1.25rem',
          color: 'var(--text-muted)',
          marginTop: '0.75rem',
        }}>
          Just for you, Srilu...
        </p>
      </motion.div>
    </div>
  );
}
