import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AccentStyle, DensityMode, ShellView } from '@/shared/types/shell';
import type { ThemePresetId } from '@/shared/theme/theme-presets';

interface ShellState {
  currentView: ShellView;
  themePresetId: ThemePresetId;
  density: DensityMode;
  glow: number;
  accentStyle: AccentStyle;
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;
  outputOpen: boolean;
  isSettingsOpen: boolean;
  setCurrentView: (view: ShellView) => void;
  setThemePresetId: (presetId: ThemePresetId) => void;
  setDensity: (density: DensityMode) => void;
  setGlow: (glow: number) => void;
  setAccentStyle: (accentStyle: AccentStyle) => void;
  setSettingsOpen: (open: boolean) => void;
  syncPanelState: (state: Partial<Pick<ShellState, 'leftPanelCollapsed' | 'rightPanelCollapsed' | 'outputOpen'>>) => void;
}

export const useShellStore = create<ShellState>()(
  persist(
    (set) => ({
      currentView: 'briefing',
      themePresetId: 'arcade-pulse',
      density: 'comfortable',
      glow: 68,
      accentStyle: 'beam',
      leftPanelCollapsed: false,
      rightPanelCollapsed: false,
      outputOpen: true,
      isSettingsOpen: false,
      setCurrentView: (currentView) => set({ currentView }),
      setThemePresetId: (themePresetId) => set({ themePresetId }),
      setDensity: (density) => set({ density }),
      setGlow: (glow) => set({ glow }),
      setAccentStyle: (accentStyle) => set({ accentStyle }),
      setSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),
      syncPanelState: (state) => set(state),
    }),
    {
      name: 'new-guy-shell-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentView: state.currentView,
        themePresetId: state.themePresetId,
        density: state.density,
        glow: state.glow,
        accentStyle: state.accentStyle,
        leftPanelCollapsed: state.leftPanelCollapsed,
        rightPanelCollapsed: state.rightPanelCollapsed,
        outputOpen: state.outputOpen,
      }),
    },
  ),
);