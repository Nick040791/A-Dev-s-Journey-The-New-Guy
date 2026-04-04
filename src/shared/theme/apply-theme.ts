import type { AccentStyle, DensityMode } from '@/shared/types/shell';
import { densityScale, getThemePreset, type ThemePresetId } from '@/shared/theme/theme-presets';

interface ThemeState {
  accentStyle: AccentStyle;
  density: DensityMode;
  glow: number;
  themePresetId: ThemePresetId;
}

export function applyTheme(root: HTMLElement, state: ThemeState): void {
  const preset = getThemePreset(state.themePresetId);
  const density = densityScale[state.density];

  Object.entries(preset.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.style.setProperty('--panel-padding', density.panelPadding);
  root.style.setProperty('--density-gap', density.gap);
  root.style.setProperty('--radius-panel', density.radius);
  root.style.setProperty('--topbar-height', density.topBarHeight);
  root.style.setProperty('--glow-strength', Math.max(0.28, state.glow / 100).toFixed(2));
  root.dataset.accentStyle = state.accentStyle;
  root.dataset.density = state.density;
  root.dataset.themePreset = state.themePresetId;
}