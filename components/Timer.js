import { useEffect, useRef, useState } from 'react';

export default function Timer({ duration = 20, onComplete, resetKey }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  // Reset timer when resetKey or duration changes
  useEffect(() => {
    console.log('[Timer] Resetting timer', { duration, resetKey });
    setTimeLeft(duration);
  }, [duration, resetKey]);

  useEffect(() => {
    // Clear any existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        console.log('[Timer] Ticking', { previous: prev, next });

        if (next <= 0) {
          // Clear interval immediately when reaching 0
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          if (onComplete) {
            onComplete();
          }

          return 0;
        }

        return next;
      });
    }, 1000);

    // Cleanup to prevent memory leaks
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [duration, resetKey, onComplete]);

  const progress = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= 5;

  return (
    <div
      className={isWarning ? 'timer-warning' : ''}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
          color: '#e5e7eb'
        }}
      >
        <span>Time remaining</span>
        <span
          style={{
            fontVariantNumeric: 'tabular-nums',
            fontWeight: 600,
            color: isWarning ? '#EF4444' : '#2563EB',
            transition: 'all 0.3s ease',
            animation: isWarning ? 'timer-pulse 1s ease-in-out infinite' : 'none'
          }}
        >
          {timeLeft}s
        </span>
      </div>
      <div
        style={{
          position: 'relative',
          height: '0.5rem',
          borderRadius: '999px',
          backgroundColor: 'rgba(255,255,255,0.08)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'left',
            transform: `scaleX(${Math.max(progress, 0) / 100})`,
            backgroundColor: isWarning ? '#EF4444' : '#2563EB',
            transition: 'all 0.3s ease',
            animation: isWarning ? 'timer-pulse 1s ease-in-out infinite' : 'none'
          }}
        />
      </div>
    </div>
  );
}

