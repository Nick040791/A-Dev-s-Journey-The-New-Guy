import { useCallback, useEffect, useRef, useState } from 'react';

interface IntroVideoProps {
  onComplete: () => void;
}

export function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const skippedRef = useRef(false);
  const [fading, setFading] = useState(false);

  /* Trigger fade-to-black; onComplete fires after CSS transition ends */
  const handleSkip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    if (videoRef.current) videoRef.current.pause();
    setFading(true);
  }, []);

  /* Force play — browsers may block autoPlay even with muted */
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        /* autoplay blocked — skip straight to menu */
        handleSkip();
      });
    }
  }, [handleSkip]);

  /* Skip on any keypress */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      handleSkip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSkip]);

  return (
    <div className="intro-video-backdrop">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="intro-video"
        onEnded={handleSkip}
        playsInline
        src="/assets/video/intro.mp4"
      />
      <button
        className="intro-skip-button"
        onClick={handleSkip}
        type="button"
      >
        SKIP ▸
      </button>
      {/* Fade-to-black overlay — onTransitionEnd fires onComplete after CSS transition */}
      <div
        className={`intro-fade-overlay${fading ? ' active' : ''}`}
        onTransitionEnd={fading ? onComplete : undefined}
      />
    </div>
  );
}
