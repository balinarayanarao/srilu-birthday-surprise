import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import photo8 from '../assets/photo8.jpg';
import { sound } from '../utils/audioSystem';
import { fireCelebrationShower } from '../utils/confetti';

export default function FinalReveal() {
  useEffect(() => {
    sound.init();
    sound.playCelebration();
    fireCelebrationShower();
  }, []);

  return (
    <div className="screen-wrapper" style={{ minHeight: '85vh', userSelect: 'none', padding: '1rem 0 2rem 0' }}>
      {/* Top Birthday Announcement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', maxWidth: '420px', marginBottom: '1.2rem' }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
        }}>
          <span style={{
            fontSize: '1rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold-light)',
            fontWeight: 700,
          }}>
            HAPPY
          </span>
          <span style={{
            fontSize: '1.15rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--accent-pink-light)',
            fontWeight: 700,
          }}>
            BIRTHDAY
          </span>
          <h1 className="font-serif title-gradient-pink" style={{
            fontSize: 'clamp(2.3rem, 8vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginTop: '0.2rem',
          }}>
            SRILU! ❤️
          </h1>
        </div>

        <p className="font-handwriting" style={{
          fontSize: '1.4rem',
          color: 'var(--accent-gold-light)',
          marginTop: '0.4rem',
        }}>
          To my forever Chelli
        </p>

        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-subtle)',
          lineHeight: 1.45,
          marginTop: '0.4rem',
          maxWidth: '320px',
          margin: '0.4rem auto 0 auto',
        }}>
          Thank you for being one of the most beautiful parts of my life.
        </p>
      </motion.div>

      {/* Featured Photo 8 with Soft Golden Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, type: 'spring' }}
        style={{
          width: '100%',
          maxWidth: '380px',
          margin: '0 auto 1.4rem auto',
          position: 'relative',
        }}
      >
        {/* Soft Golden Glow Aura */}
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '24px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(255, 117, 160, 0.2) 60%, transparent 80%)',
          filter: 'blur(16px)',
          zIndex: 0,
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '20px',
          padding: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(253, 224, 71, 0.4)',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(245, 158, 11, 0.35)',
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            borderRadius: '14px',
            overflow: 'hidden',
          }}>
            <img
              src={photo8}
              alt="Srilu and Annaya"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                display: 'block',
              }}
            />
            {/* Subtle gloss overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.3) 100%)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </motion.div>

      {/* Concluding Emotional Words */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ width: '100%', maxWidth: '360px', marginBottom: '1rem' }}
      >
        <p className="font-serif" style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
        }}>
          "Some bonds are chosen by life..."
        </p>
        <p className="font-serif" style={{
          fontSize: '1.05rem',
          color: 'var(--accent-gold-light)',
          fontStyle: 'italic',
          marginTop: '0.2rem',
        }}>
          "...and some become family."
        </p>

        <h3 className="font-handwriting title-gradient-pink" style={{
          fontSize: '1.85rem',
          fontWeight: 700,
          marginTop: '0.8rem',
        }}>
          Happy Birthday, Chelli. ❤️
        </h3>
      </motion.div>
    </div>
  );
}
