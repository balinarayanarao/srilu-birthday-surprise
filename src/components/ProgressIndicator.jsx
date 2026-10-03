import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ProgressIndicator({ currentStep, totalSteps = 8, onBack, canGoBack = true }) {
  if (currentStep === 1 || currentStep === 8) {
    // Keep intro and finale extra clean and immersive, only showing minimal dots if desired
    return null;
  }

  return (
    <header className="progress-nav-bar" style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 0.25rem 1rem 0.25rem',
      position: 'relative',
      zIndex: 40,
    }}>
      {/* Back button */}
      <div style={{ width: '40px' }}>
        {canGoBack && onBack ? (
          <button
            onClick={onBack}
            className="btn-back"
            aria-label="Go back to previous screen"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowLeft size={18} />
          </button>
        ) : null}
      </div>

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(20, 9, 36, 0.6)',
        backdropFilter: 'blur(8px)',
        padding: '5px 12px',
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isPassed = stepNum < currentStep;

          return (
            <div
              key={stepNum}
              style={{
                width: isActive ? '18px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: isActive
                  ? 'var(--accent-pink)'
                  : isPassed
                  ? 'rgba(255, 182, 193, 0.5)'
                  : 'rgba(255, 255, 255, 0.18)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 0 10px rgba(255, 117, 160, 0.6)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Spacer to balance back button */}
      <div style={{ width: '40px' }} />
    </header>
  );
}
