import { Logs, MonitorCog, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Settings2 } from 'lucide-react';

import type { ShellNavigationItem } from '@/shared/config/shell-navigation';
import { cx } from '@/shared/lib/cx';
import type { ShellView } from '@/shared/types/shell';
import type { ThemePreset } from '@/shared/theme/theme-presets';

interface TopBarProps {
  currentView: ShellView;
  items: ShellNavigationItem[];
  preset: ThemePreset;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  outputOpen: boolean;
  onViewChange: (view: ShellView) => void;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onToggleOutput: () => void;
  onOpenSettings: () => void;
}

export function TopBar({
  currentView,
  items,
  preset,
  leftCollapsed,
  rightCollapsed,
  outputOpen,
  onViewChange,
  onToggleLeft,
  onToggleRight,
  onToggleOutput,
  onOpenSettings,
}: TopBarProps) {
  const platform = window.shellBridge?.platform?.toUpperCase() ?? 'BROWSER';

  return (
    <header className="top-bar-shell">
      <div className="top-bar-brand">
        <div className="top-bar-brand-copy">
          <p className="panel-eyebrow">Module 01 / Game Shell</p>
          <h1 className="font-display text-[1.2rem] uppercase tracking-[0.16em] text-(--text-primary)">
            Software Engineer // The New Guy
          </h1>
        </div>
        <div className="top-bar-meta hidden xl:flex">
          <span className="shell-chip top-bar-meta-chip">{preset.tag}</span>
          <span className="shell-chip top-bar-meta-chip">{platform}</span>
          <span className="shell-chip top-bar-meta-chip">Electron + Vite + React</span>
        </div>
      </div>

      <nav className="top-bar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={cx('nav-pill', currentView === item.id && 'nav-pill-active')}
            onClick={() => onViewChange(item.id)}
            type="button"
          >
            <span className="nav-pill-eyebrow">{item.eyebrow}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="top-bar-actions">
        <button aria-label="Toggle chat panel" className="chrome-button" onClick={onToggleLeft} type="button">
          {leftCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
        <button aria-label="Toggle output drawer" className="chrome-button" onClick={onToggleOutput} type="button">
          <Logs className={cx('h-4 w-4', !outputOpen && 'opacity-60')} />
        </button>
        <button aria-label="Toggle mission panel" className="chrome-button" onClick={onToggleRight} type="button">
          {rightCollapsed ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
        </button>
        <button aria-label="Open settings" className="chrome-button chrome-button-primary" onClick={onOpenSettings} type="button">
          <Settings2 className="h-4 w-4" />
          <span>Style Lab</span>
        </button>
        <div className="shell-chip hidden lg:flex">
          <MonitorCog className="h-4 w-4" />
          <span>{preset.label}</span>
        </div>
      </div>
    </header>
  );
}