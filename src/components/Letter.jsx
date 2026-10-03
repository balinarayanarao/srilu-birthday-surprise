import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { letterParagraphs } from '../data/memories';
import { sound } from '../utils/audioSystem';
import { Mail, Heart, ArrowRight, Eye } from 'lucide-react';

export default function Letter({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const [autoReveal, setAutoReveal] = useState(true);
  const letterRef = useRef(null);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    sound.init();
    sound.playEnvelopeOpen();
  };

  // Progressive paragraph reveal for comfortable reading
  useEffect(() => {
    if (!isOpen || !autoReveal) return;

    if (visibleCount < letterParagraphs.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
        if (letterRef.current) {
          letterRef.current.scrollTo({
            top: letterRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 1600); // Gentle pacing for reading

      return () => clearTimeout(timer);
    }
  }, [isOpen, visibleCount, autoReveal]);

  const handleRevealAll = () => {
    setAutoReveal(false);
    setVisibleCount(letterParagraphs.length);
  };

  return (
    <div className="screen-wrapper" style={{ minHeight: '85vh', userSelect: 'none', padding: '0.5rem 0' }}>
      {!isOpen ? (
        <motion.div
          key="closed-envelope"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}
        >
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginBottom: '0.8rem',
            fontStyle: 'italic',
          }}>
            There's one more thing...
          </p>

          <h2 className="font-serif title-gradient-pink" style={{
            fontSize: '1.9rem',
            fontWeight: 700,
            marginBottom: '2rem',
          }}>
            A letter from your Annaya 💌
          </h2>

          {/* Interactive Envelope Graphic */}
          <motion.div
            onClick={handleOpenEnvelope}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: 'relative',
              width: '260px',
              height: '180px',
              margin: '0 auto 1.5rem auto',
              cursor: 'pointer',
              perspective: '800px',
            }}
          >
            {/* Envelope Body */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#4a154b',
              borderRadius: '12px',
              border: '2px solid rgba(255, 182, 193, 0.4)',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 117, 160, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Envelope Flap triangles */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: '130px solid transparent',
                borderRight: '130px solid transparent',
                borderTop: '95px solid #6b21a8',
                filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))',
              }} />

              {/* Envelope Bottom Folds */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: '130px solid #581c87',
                borderRight: '130px solid #581c87',
                borderTop: '90px solid transparent',
              }} />

              {/* Wax Seal with Heart */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #f59e0b 0%, #b45309 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                border: '2px solid #fef08a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}>
                <Heart size={24} fill="#fff" />
              </div>
            </div>

            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                fontSize: '0.85rem',
                color: 'var(--accent-pink-light)',
                marginTop: '1.2rem',
                fontWeight: 500,
              }}
            >
              Tap the envelope to open 💌
            </motion.p>
          </motion.div>
        </motion.div>
      ) : (
        /* The Opened Letter on Warm Cream Paper */
        <motion.div
          key="opened-letter"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}
        >
          {/* Paper Letter Container */}
          <div
            ref={letterRef}
            style={{
              backgroundColor: '#fbf7ee',
              color: '#2a1622',
              borderRadius: '16px',
              padding: '24px 20px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 182, 193, 0.2)',
              border: '1px solid #ebdcc5',
              maxHeight: '62vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              textAlign: 'left',
              position: 'relative',
              lineHeight: 1.65,
              fontSize: '1.05rem',
            }}
          >
            {/* Header / Watermark stamp */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px dashed #d5c3aa',
              paddingBottom: '10px',
              marginBottom: '16px',
            }}>
              <span className="font-handwriting" style={{ fontSize: '1.2rem', color: '#8c6077', fontWeight: 700 }}>
                To Srilu ❤️
              </span>
              <span style={{ fontSize: '0.75rem', color: '#9c8172', letterSpacing: '0.04em' }}>
                With love, Annaya
              </span>
            </div>

            {/* Paragraphs rendered step by step */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {letterParagraphs.slice(0, visibleCount).map((para, index) => {
                const isSpecial =
                  para.includes('My Chitti') ||
                  para.includes('Your Annaya') ||
                  para.includes('Dear Srilu');

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p
                      className="font-serif"
                      style={{
                        whiteSpace: 'pre-line',
                        color: isSpecial ? '#701a4f' : '#2d1822',
                        fontWeight: isSpecial ? 700 : 400,
                        fontSize: isSpecial ? '1.12rem' : '1.02rem',
                        lineHeight: 1.55,
                      }}
                    >
                      {para}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Reading indicator / Reveal all toggle */}
            {visibleCount < letterParagraphs.length && (
              <div style={{
                marginTop: '16px',
                paddingTop: '10px',
                borderTop: '1px solid #eee1cb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.75rem', color: '#8c707d', fontStyle: 'italic' }}>
                  Reading ({visibleCount}/{letterParagraphs.length})...
                </span>
                <button
                  onClick={handleRevealAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9333ea',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Eye size={12} /> Read Full Letter
                </button>
              </div>
            )}
          </div>

          {/* Action button once letter is finished */}
          {visibleCount >= letterParagraphs.length && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ marginTop: '1.2rem' }}
            >
              <button
                onClick={() => {
                  onNext();
                }}
                className="btn-primary"
                style={{ width: '100%', maxWidth: '270px' }}
              >
                The Final Surprise <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
