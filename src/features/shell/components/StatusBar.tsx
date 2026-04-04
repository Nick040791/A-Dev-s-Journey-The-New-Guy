import { GitBranch } from 'lucide-react';

import { useShellStore } from '@/features/shell/state/use-shell-store';
import { getThemePreset } from '@/shared/theme/theme-presets';

export function StatusBar() {
  const themePresetId = useShellStore((state) => state.themePresetId);
  const preset = getThemePreset(themePresetId);

  return (
    <footer className="status-bar">
      <div className="status-bar-item">
        <GitBranch className="h-3.5 w-3.5" />
        <span>Ui-Concept</span>
      </div>
      <div className="status-bar-item">
        <span>0 errors</span>
      </div>
      <div className="status-bar-item">
        <span>2 warnings</span>
      </div>

      <div className="status-bar-spacer" />

      <div className="status-bar-item">
        <span>TypeScript</span>
      </div>
      <div className="status-bar-item">
        <span>Spaces: 2</span>
      </div>
      <div className="status-bar-item">
        <span>UTF-8</span>
      </div>
      <div className="status-bar-item">
        <span>{preset.label}</span>
      </div>
      <div className="status-bar-item">
        <span>XP: 240</span>
      </div>
    </footer>
  );
}
