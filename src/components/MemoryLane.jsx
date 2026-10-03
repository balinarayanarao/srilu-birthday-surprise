import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memories } from '../data/memories';
import { sound } from '../utils/audioSystem';
import { ChevronLeft, ChevronRight, Maximize2, X, ArrowRight, Heart } from 'lucide-react';

export default function MemoryLane({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [hasSeenAll, setHasSeenAll] = useState(false);

  const currentMemory = memories[currentIndex];

  const handleNext = () => {
    sound.init();
    sound.playSparkle(987.77);
    if (currentIndex < memories.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      if (nextIdx === memories.length - 1) {
        setHasSeenAll(true);
      }
    } else {
      setHasSeenAll(true);
    }
  };

  const handlePrev = () => {
    sound.init();
    sound.playSparkle(783.99);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const handleSelectThumb = (idx) => {
    sound.init();
    sound.playSparkle(880);
    setCurrentIndex(idx);
    if (idx === memories.length - 1) {
      setHasSeenAll(true);
    }
  };

  return (
    <div className="screen-wrapper" style={{ minHeight: '85vh', userSelect: 'none', padding: '0.5rem 0' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '1.2rem', width: '100%', maxWidth: '440px' }}
      >
        <h2 className="font-serif title-gradient-pink" style={{
          fontSize: '1.85rem',
          fontWeight: 700,
        }}>
          A walk down memory lane
        </h2>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-subtle)',
          marginTop: '0.2rem',
        }}>
          Because some moments deserve to stay forever.
        </p>

        {/* Counter badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.08)',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '0.78rem',
          color: 'var(--accent-pink-light)',
          marginTop: '0.6rem',
        }}>
          <Heart size={12} fill="#ff75a0" />
          <span>Memory {currentIndex + 1} of {memories.length}</span>
        </div>
      </motion.div>

      {/* Polaroid Card Area with Touch Swipe */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          margin: '0 auto 1.2rem auto',
          minHeight: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'pan-y',
        }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMemory.id}
            initial={{ opacity: 0, scale: 0.92, rotate: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: currentMemory.rotation, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: -currentMemory.rotation, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              backgroundColor: '#fffdfa',
              borderRadius: '8px',
              padding: '12px 12px 20px 12px',
              boxShadow: '0 18px 40px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {/* Washi tape graphic at top */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70px',
              height: '22px',
              backgroundColor: 'rgba(255, 182, 193, 0.75)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              transformOrigin: 'center',
              rotate: '-2deg',
              borderRadius: '2px',
            }} />

            {/* Photo Container */}
            <div
              onClick={() => setLightboxImage(currentMemory)}
              style={{
                position: 'relative',
                width: '100%',
                // Adjust container aspect ratio based on whether photo is landscape or portrait
                aspectRatio: currentMemory.orientation === 'landscape' ? '16 / 11' : '4 / 5',
                overflow: 'hidden',
                borderRadius: '4px',
                backgroundColor: '#1a0b2e',
                cursor: 'pointer',
              }}
            >
              <img
                src={currentMemory.image}
                alt={`Memory ${currentMemory.id}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  // Ensure faces are not cut off
                  objectPosition: currentMemory.orientation === 'landscape' ? 'center 30%' : 'center 20%',
                  transition: 'transform 0.5s ease',
                  display: 'block',
                }}
                loading="eager"
              />

              {/* Tap to zoom indicator */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                background: 'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(6px)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}>
                <Maximize2 size={13} />
              </div>
            </div>

            {/* Polaroid Handwritten Caption */}
            <div style={{ marginTop: '14px', padding: '0 6px' }}>
              <p className="font-handwriting" style={{
                color: '#2d1822',
                fontSize: '1.25rem',
                lineHeight: 1.35,
                fontWeight: 600,
              }}>
                "{currentMemory.caption}"
              </p>
              <span style={{
                display: 'inline-block',
                marginTop: '6px',
                fontSize: '0.72rem',
                color: '#8c707d',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {currentMemory.date}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '1rem',
      }}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn-secondary"
          style={{
            padding: '8px 14px',
            opacity: currentIndex === 0 ? 0.35 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
          aria-label="Previous memory"
        >
          <ChevronLeft size={18} /> Prev
        </button>

        {/* Thumbnail dots / quick jump */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {memories.map((_, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectThumb(idx)}
              style={{
                width: idx === currentIndex ? '16px' : '7px',
                height: '7px',
                borderRadius: '999px',
                backgroundColor: idx === currentIndex ? 'var(--accent-pink)' : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="btn-secondary"
          style={{ padding: '8px 14px' }}
          aria-label="Next memory"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Completion message after viewing or advancing through memories */}
      {(hasSeenAll || currentIndex === memories.length - 1) && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '360px', margin: '0.5rem auto 0 auto' }}
        >
          <p className="font-handwriting" style={{
            fontSize: '1.28rem',
            color: 'var(--accent-gold-light)',
            marginBottom: '0.8rem',
          }}>
            8 photos aren't enough to hold all the memories. Let's keep going...
          </p>

          <button onClick={onNext} className="btn-primary" style={{ width: '100%', maxWidth: '240px' }}>
            Continue <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10, 4, 20, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Close image preview"
            >
              <X size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '92vw',
                maxHeight: '75vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={lightboxImage.image}
                alt="Enlarged memory"
                style={{
                  maxWidth: '100%',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                }}
              />
              <p className="font-handwriting" style={{
                color: 'var(--accent-pink-light)',
                fontSize: '1.35rem',
                marginTop: '16px',
                textAlign: 'center',
                maxWidth: '380px',
              }}>
                "{lightboxImage.caption}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
