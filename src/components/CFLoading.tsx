'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CFLoadingProps {
  onComplete?: () => void;
  status?: 'success' | 'error';
}

export default function CFLoading({ onComplete, status = 'success' }: CFLoadingProps) {
  const [states, setStates] = useState<{ text: string; color: string }[]>([]);
  const [stateIndex, setStateIndex] = useState(0);

  useEffect(() => {
    // Generate random test cases
    const testCases = [1];
    const numSteps = 3 + Math.floor(Math.random() * 3); // 3 to 5 steps
    let currentTest = 1;
    
    for (let i = 0; i < numSteps; i++) {
      currentTest += Math.floor(Math.random() * 20) + 5; // Increment by 5-25
      testCases.push(currentTest);
    }

    const finalState = status === 'success' 
      ? { text: 'Accepted', color: 'text-green-500' }
      : { text: `Wrong Answer on test ${testCases[testCases.length - 1] + 1}`, color: 'text-red-500' };

    const generatedStates = [
      { text: 'In queue', color: 'text-slate-400' },
      ...testCases.map(t => ({ text: `Running on test ${t}`, color: 'text-slate-300' })),
      finalState
    ];

    setStates(generatedStates);
  }, [status]);

  useEffect(() => {
    if (states.length === 0) return;

    // If we reached the last state, wait a bit then call onComplete
    if (stateIndex >= states.length - 1) {
      const timeout = setTimeout(() => {
        onComplete?.();
      }, 1500); // Show final verdict longer (1.5s)
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setStateIndex(prev => prev + 1);
    }, 400 + Math.random() * 400);

    return () => clearTimeout(timeout);
  }, [stateIndex, states, onComplete]);

  if (states.length === 0) return null;

  const currentState = states[stateIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white fixed inset-0 z-50">
      <div className="space-y-6 text-center">
        <motion.div
          key={stateIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`text-3xl font-bold font-mono ${currentState.color}`}
        >
          {currentState.text}
        </motion.div>
        
        {stateIndex < states.length - 1 && (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full mx-auto"
          />
        )}
      </div>
    </div>
  );
}
