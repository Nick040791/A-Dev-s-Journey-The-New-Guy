import { useEffect, useMemo, useRef, useState } from 'react';

import { cx } from '@/shared/lib/cx';

interface MenuItem {
  label: string;
  action: (() => void) | null;   // null = disabled
}

interface MainMenuProps {
  onStartDev: () => void;
  onReset: () => void;
}

export function MainMenu({ onStartDev, onReset }: MainMenuProps) {
  const items = useMemo<MenuItem[]>(() => [
    { label: '▸ DEV BUILD (TESTING)', action: onStartDev },
    { label: 'NEW GAME', action: null },
    { label: 'CONTINUE', action: null },
    { label: 'SETTINGS', action: null },
    { label: '↺ REPLAY INTRO', action: onReset },
  ], [onStartDev, onReset]);

  const [focusIndex, setFocusIndex] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  /* Keep a ref to current index so the keyboard effect never needs to re-register */
  const focusIndexRef = useRef(focusIndex);
  const itemsRef = useRef(items);
  focusIndexRef.current = focusIndex;
  itemsRef.current = items;

  /* Stable keyboard handler — registered once, reads state via refs */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const len = itemsRef.current.length;
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setFocusIndex((i) => (i <= 0 ? len - 1 : i - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusIndex((i) => (i >= len - 1 ? 0 : i + 1));
          break;
        case 'Enter':
        case ' ': {
          e.preventDefault();
          const item = itemsRef.current[focusIndexRef.current];
          if (item?.action) item.action();
          break;
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []); // empty deps — listener is permanent for the lifetime of this component

  /* Keep focused button in view */
  useEffect(() => {
    const btn = navRef.current?.children[focusIndex] as HTMLButtonElement | undefined;
    btn?.focus();
  }, [focusIndex]);

  return (
    <div className="main-menu-backdrop">
      <div className="main-menu-container">
        {/* Title */}
        <div className="main-menu-title-block">
          <h1 className="main-menu-title">
            A DEV'S<br />JOURNEY
          </h1>
          <p className="main-menu-subtitle">THE NEW GUY</p>
        </div>

        {/* Menu buttons */}
        <nav className="main-menu-nav" ref={navRef}>
          {items.map((item, i) => {
            const isActive = item.action !== null;
            const isFocused = i === focusIndex;
            return (
              <button
                key={item.label}
                aria-disabled={!isActive}
                className={cx(
                  'main-menu-button',
                  isActive && 'main-menu-button-primary',
                  !isActive && 'main-menu-button-disabled',
                  isFocused && 'main-menu-button-focused',
                )}
                onClick={() => { if (isActive) item.action!(); }}
                onMouseEnter={() => setFocusIndex(i)}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <p className="main-menu-footer">MODULE 01 — SHELL PREVIEW</p>
      </div>

      {/* Scanline overlay */}
      <div className="main-menu-scanlines" />
    </div>
  );
}
