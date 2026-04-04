import {
  Files,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Settings,
} from 'lucide-react';

import { cx } from '@/shared/lib/cx';

export type ActivityView = 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'settings';

interface ActivityBarProps {
  activeView: ActivityView;
  onViewChange: (view: ActivityView) => void;
}

const topIcons: { id: ActivityView; icon: typeof Files; label: string }[] = [
  { id: 'explorer', icon: Files, label: 'Explorer' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'git', icon: GitBranch, label: 'Source Control' },
  { id: 'debug', icon: Bug, label: 'Run and Debug' },
  { id: 'extensions', icon: Blocks, label: 'Extensions' },
];

const bottomIcons: { id: ActivityView; icon: typeof Settings; label: string }[] = [
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  return (
    <aside className="activity-bar">
      {topIcons.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          aria-label={label}
          className={cx('activity-bar-icon', activeView === id && 'activity-bar-icon-active')}
          onClick={() => onViewChange(id)}
          type="button"
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}

      <div className="activity-bar-spacer" />

      {bottomIcons.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          aria-label={label}
          className={cx('activity-bar-icon', activeView === id && 'activity-bar-icon-active')}
          onClick={() => onViewChange(id)}
          type="button"
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}
    </aside>
  );
}
