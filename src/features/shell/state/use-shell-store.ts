import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AccentStyle, DensityMode } from '@/shared/types/shell';
import type { ThemePresetId } from '@/shared/theme/theme-presets';

interface ShellState {
  themePresetId: ThemePresetId;
  density: DensityMode;
  glow: number;
  accentStyle: AccentStyle;
  isSettingsOpen: boolean;
  setThemePresetId: (presetId: ThemePresetId) => void;
  setDensity: (density: DensityMode) => void;
  setGlow: (glow: number) => void;
  setAccentStyle: (accentStyle: AccentStyle) => void;
  setSettingsOpen: (open: boolean) => void;
}

export const useShellStore = create<ShellState>()(
  persist(
    (set) => ({
      themePresetId: 'arcade-pulse',
      density: 'comfortable',
      glow: 68,
      accentStyle: 'beam',
      isSettingsOpen: false,
      setThemePresetId: (themePresetId) => set({ themePresetId }),
      setDensity: (density) => set({ density }),
      setGlow: (glow) => set({ glow }),
      setAccentStyle: (accentStyle) => set({ accentStyle }),
      setSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),
    }),
    {
      name: 'new-guy-shell-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        themePresetId: state.themePresetId,
        density: state.density,
        glow: state.glow,
        accentStyle: state.accentStyle,
      }),
    },
  ),
);