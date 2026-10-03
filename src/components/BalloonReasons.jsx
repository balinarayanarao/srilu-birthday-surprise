import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { balloonsData } from '../data/memories';
import { sound } from '../utils/audioSystem';
import { fireGentleConfetti } from '../utils/confetti';
import { ArrowRight, CheckCircle2, Sparkles, X } from 'lucide-react';

export default function BalloonReasons({ onNext }) {
  const [poppedIds, setPoppedIds] = useState(new Set());
  const [activeReason, setActiveReason] = useState(null);

  const handlePop = (balloon) => {
    if (poppedIds.has(balloon.id)) {
      // Re-read reason
      setActiveReason(balloon);
      return;
    }

    sound.init();
    sound.playPop();

    const nextPopped = new Set(poppedIds);
    nextPopped.add(balloon.id);
    setPoppedIds(nextPopped);
    setActiveReason(balloon);

    if (nextPopped.size === balloonsData.length) {
      setTimeout(() => {
        fireGentleConfetti();
      }, 500);
    }
  };

  const allPopped = poppedIds.size === balloonsData.length;

  return (
    <div className="screen-wrapper" style={{ minHeight: '85vh', userSelect: 'none' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '1.2rem' }}
      >
        <h2 className="font-serif title-gradient-pink" style={{
          fontSize: '1.85rem',
          fontWeight: 700,
        }}>
          Pop the balloons 🎈
        </h2>
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-subtle)',
          marginTop: '0.2rem',
        }}>
          Each one hides a little reason... ({poppedIds.size}/5 popped)
        </p>
      </motion.div>

      {/* Floating Balloons Cluster */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '14px',
        maxWidth: '380px',
        margin: '0 auto 1.5rem auto',
        minHeight: '140px',
        alignItems: 'center',
      }}>
        {balloonsData.map((b, index) => {
          const isPopped = poppedIds.has(b.id);
          const floatDelay = index * 0.4;

          return (
            <div key={b.id} style={{ position: 'relative' }}>
              {!isPopped ? (
                <motion.div
                  onClick={() => handlePop(b)}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 2.8 + (index % 3) * 0.4,
                    repeat: Infinity,
                    delay: floatDelay,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '6px',
                  }}
                >
                  <svg width="60" height="78" viewBox="0 0 60 78">
                    <defs>
                      <radialGradient id={`bg-${b.id}`} cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="35%" stopColor={b.lightColor} />
                        <stop offset="80%" stopColor={b.color} />
                        <stop offset="100%" stopColor="#4a044e" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="30" cy="32" rx="26" ry="30" fill={`url(#bg-${b.id})`}
                      filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
                    <polygon points="30,62 25,68 35,68" fill={b.color} />
                    <path d="M30,68 Q27,73 31,78" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
                    <ellipse cx="20" cy="20" rx="6" ry="10" fill="#fff" opacity="0.45" transform="rotate(-30 20 20)" />
                  </svg>
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginTop: '-2px',
                  }}>
                    #{b.id}
                  </span>
                </motion.div>
              ) : (
                /* Popped icon placeholder (shows collected checkmark) */
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setActiveReason(b)}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: `1px solid ${b.lightColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: `0 0 12px ${b.color}40`,
                  }}
                  title="Click to re-read"
                >
                  <span style={{ fontSize: '1.2rem' }}>{b.emoji}</span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Popped Reason Banner / Card */}
      <AnimatePresence mode="wait">
        {activeReason && (
          <motion.div
            key={activeReason.id}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.4 }}
            className="glass-panel"
            style={{
              padding: '1.4rem 1.2rem',
              width: '100%',
              maxWidth: '380px',
              margin: '0 auto 1.2rem auto',
              borderLeft: `4px solid ${activeReason.color}`,
              textAlign: 'left',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.78rem', color: activeReason.lightColor, fontWeight: 600, letterSpacing: '0.05em' }}>
                REASON #{activeReason.id} {activeReason.emoji}
              </span>
              <button
                onClick={() => setActiveReason(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }}
              >
                <X size={15} />
              </button>
            </div>
            <p className="font-serif" style={{
              fontSize: '1.15rem',
              color: '#fff',
              lineHeight: 1.45,
              fontWeight: 500,
            }}>
              "{activeReason.reason}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Balloons Popped Completion Reveal */}
      {allPopped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', maxWidth: '380px', marginTop: '0.5rem' }}
        >
          <div className="glass-panel" style={{
            padding: '1.2rem 1.4rem',
            marginBottom: '1.2rem',
            borderColor: 'rgba(253, 224, 71, 0.35)',
          }}>
            <p className="font-handwriting" style={{
              fontSize: '1.35rem',
              color: 'var(--accent-gold-light)',
              lineHeight: 1.4,
            }}>
              Maybe now you understand why you're so special... ✨
            </p>
          </div>

          <button onClick={onNext} className="btn-primary" style={{ width: '100%', maxWidth: '240px' }}>
            Continue <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
