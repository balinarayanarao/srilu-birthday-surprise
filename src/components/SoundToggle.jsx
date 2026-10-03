import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audioSystem';

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const handleToggle = (e) => {
    e.stopPropagation();
    sound.init();
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playSparkle(880);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '14px',
      right: '16px',
      zIndex: 100,
    }}>
      <button
        onClick={handleToggle}
        className="sound-toggle-btn"
        title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
        aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(26, 12, 46, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '7px 12px',
          borderRadius: '999px',
          color: isMuted ? 'var(--text-subtle)' : 'var(--accent-pink-light)',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.25s ease',
          fontSize: '0.8rem',
          userSelect: 'none',
        }}
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>
          {isMuted ? 'Muted' : 'Sound'}
        </span>
      </button>
    </div>
  );
}
