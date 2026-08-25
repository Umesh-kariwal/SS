'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

interface SecretAdminGestureProps {
  children: React.ReactNode;
  className?: string;
  onTrigger?: () => void;
}

export default function SecretAdminGesture({
  children,
  className = '',
  onTrigger,
}: SecretAdminGestureProps) {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    // Reset timer on each tap
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount >= 7) {
      setTapCount(0);
      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
        if (onTrigger) {
          onTrigger();
        } else {
          router.push('/admin/login');
        }
      }, 800);
      return;
    }

    // Reset tap count if 2.5 seconds pass without another tap
    timerRef.current = setTimeout(() => {
      setTapCount(0);
    }, 2500);
  };

  return (
    <div
      onClick={handleTap}
      onTouchStart={handleTap}
      className={`cursor-pointer relative select-none ${className}`}
    >
      {children}

      {/* Subtle feedback glow */}
      {tapCount > 0 && tapCount < 7 && (
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
      )}

      {/* Discreet 7th Tap Trigger Toast */}
      {showFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-dark/95 border border-brand-gold/40 text-white px-4 py-3 rounded-lg shadow-gold-glow flex items-center gap-3 backdrop-blur-md animate-fade-in">
          <div className="p-2 bg-brand-gold/20 rounded-full text-brand-gold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-medium text-sm text-brand-gold">Admin Portal Initiated</div>
            <div className="text-xs text-gray-300">Redirecting to secure login...</div>
          </div>
        </div>
      )}
    </div>
  );
}
