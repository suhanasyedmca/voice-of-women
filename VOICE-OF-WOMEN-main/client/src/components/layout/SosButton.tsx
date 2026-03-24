import { useState, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function SosButton() {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const HOLD_DURATION = 3000; // 3 seconds

  const startPress = () => {
    setIsPressing(true);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          return 100;
        }
        return prev + (100 / (HOLD_DURATION / 100)); // update every 100ms
      });
    }, 100);

    pressTimer.current = setTimeout(() => {
      setIsPressing(false);
      setShowConfirm(true);
      clearInterval(intervalRef.current!);
      setProgress(100);
    }, HOLD_DURATION);
  };

  const endPress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!showConfirm) {
      setIsPressing(false);
      setProgress(0);
    }
  };

  const triggerAlert = () => {
    // Dispatch to Socket / Backend here
    toast.error('EMERGENCY SOS SENT. Helpers and 181 notified.', {
      duration: 5000,
      icon: '🚨'
    });
    setShowConfirm(false);
    setProgress(0);
  };

  return (
    <>
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
      >
        <button 
          className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${isPressing ? 'scale-95 bg-red-700' : 'bg-red-600 hover:bg-red-500 hover:scale-105'}`}
        >
          {/* Animated Pulse Ring */}
          {!isPressing && !showConfirm && (
            <div className="absolute inset-0 rounded-full border-4 border-red-500 sos-pulse pointer-events-none" />
          )}

          {/* Progress Ring during hold */}
          {isPressing && (
            <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeDasharray="226" /* 2 * PI * r */
                strokeDashoffset={226 - (226 * progress) / 100}
                className="transition-all duration-100 ease-linear"
              />
            </svg>
          )}

          <AlertCircle className="w-10 h-10" />
        </button>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-2">Send SOS Alert?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                This will immediately alert nearby verified helpers and emergency services. Your exact location is hidden.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={triggerAlert}
                  className="flex-1 py-3 px-4 rounded-xl font-medium bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30"
                >
                  Confirm SOS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
