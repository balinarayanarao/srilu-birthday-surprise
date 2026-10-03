import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import AmbientBackground from './components/AmbientBackground';
import ProgressIndicator from './components/ProgressIndicator';
import SoundToggle from './components/SoundToggle';

import IntroHeart from './components/IntroHeart';
import WishScreen from './components/WishScreen';
import BirthdayReveal from './components/BirthdayReveal';
import Cake from './components/Cake';
import BalloonReasons from './components/BalloonReasons';
import MemoryLane from './components/MemoryLane';
import Letter from './components/Letter';
import FinalReveal from './components/FinalReveal';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -16, scale: 0.98 },
  };

  return (
    <div className="app-container">
      {/* Soft floating particles & glow atmosphere */}
      <AmbientBackground />

      {/* Subtle Sound Effects Toggle */}
      <SoundToggle />

      {/* Top subtle progress bar and back navigation */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
        canGoBack={currentStep > 1 && currentStep < 8}
      />

      {/* Main Interactive Screen with Stage Transition */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {currentStep === 1 && <IntroHeart onNext={handleNext} />}
            {currentStep === 2 && <WishScreen onNext={handleNext} />}
            {currentStep === 3 && <BirthdayReveal onNext={handleNext} />}
            {currentStep === 4 && <Cake onNext={handleNext} />}
            {currentStep === 5 && <BalloonReasons onNext={handleNext} />}
            {currentStep === 6 && <MemoryLane onNext={handleNext} />}
            {currentStep === 7 && <Letter onNext={handleNext} />}
            {currentStep === 8 && <FinalReveal />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
