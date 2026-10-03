import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audioSystem';

export default function WishScreen({ onNext }) {
  const [wished, setWished] = useState(false);

  const handleMakeWish = () => {
    if (wished) return;
    setWished(true);
    sound.init();
    sound.playSparkle(1174.66);
    setTimeout(() => sound.playSparkle(1396.91), 300);
  };

  return (
    <div className="screen-wrapper" style={{ minHeight: '80vh', userSelect: 'none' }}>
      {!wished ? (
        <motion.div
          key="wish-prompt"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', maxWidth: '380px' }}
        >
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginBottom: '0.8rem',
            fontStyle: 'italic',
          }}>
            Close your eyes for a second...
          </p>

          <h2 className="font-serif title-gradient-gold" style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '2rem',
          }}>
            Make a wish... ✨
          </h2>

          {/* Interactive Rising Balloon / Heart to tap */}
          <div
            onClick={handleMakeWish}
            style={{
              position: 'relative',
              width: '160px',
              height: '180px',
              margin: '0 auto 2rem auto',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Balloon halo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(253, 224, 71, 0.35) 0%, rgba(245, 158, 11, 0.05) 70%, transparent 100%)',
                filter: 'blur(20px)',
              }}
            />

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <svg width="100" height="120" viewBox="0 0 100 120">
                <defs>
                  <radialGradient id="balloonGlow" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="30%" stopColor="#ffb8d2" />
                    <stop offset="70%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#9f1239" />
                  </radialGradient>
                </defs>
                {/* Balloon Body */}
                <ellipse cx="50" cy="48" rx="42" ry="46" fill="url(#balloonGlow)" />
                {/* Knot */}
                <polygon points="50,92 44,100 56,100" fill="#9f1239" />
                {/* String */}
                <path d="M50,100 Q45,110 52,118" stroke="#f472b6" strokeWidth="2" fill="none" />
                {/* Highlights */}
                <ellipse cx="34" cy="30" rx="9" ry="14" fill="#ffffff" opacity="0.5" transform="rotate(-25 34 30)" />
              </svg>
            </motion.div>

            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                fontSize: '0.85rem',
                color: 'var(--accent-gold-light)',
                marginTop: '0.5rem',
                fontWeight: 500,
              }}
            >
              Tap to release your wish 🎈
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="wish-revealed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          {/* Ascending balloon animation */}
          <motion.div
            initial={{ y: 50, scale: 0.9, opacity: 1 }}
            animate={{ y: -120, scale: 0.6, opacity: 0.2 }}
            transition={{ duration: 3.5, ease: 'easeOut' }}
            style={{ margin: '0 auto', width: '50px', height: '60px' }}
          >
            <div style={{ fontSize: '2.5rem' }}>✨🎈</div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}
          >
            Because today isn't just another day...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
            className="glass-panel"
            style={{
              padding: '1.8rem 1.5rem',
              margin: '0.5rem auto 2rem auto',
              borderColor: 'rgba(255, 117, 160, 0.3)',
            }}
          >
            <h1 className="font-serif title-gradient-pink" style={{
              fontSize: '2.1rem',
              fontWeight: 700,
              lineHeight: 1.25,
            }}>
              Today is YOUR day. ❤️
            </h1>
            <p className="font-handwriting" style={{
              fontSize: '1.35rem',
              color: 'var(--accent-gold-light)',
              marginTop: '0.5rem',
            }}>
              May all your silent wishes come true.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <button onClick={onNext} className="btn-primary" style={{ minWidth: '190px' }}>
              Continue <ArrowRight size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
