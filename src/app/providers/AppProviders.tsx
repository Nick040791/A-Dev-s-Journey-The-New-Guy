import { useEffect, type ReactNode } from 'react';

import { useShellStore } from '@/features/shell/state/use-shell-store';
import { applyTheme } from '@/shared/theme/apply-theme';

import { ModuleRegistryProvider } from './ModuleRegistryProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  const accentStyle = useShellStore((state) => state.accentStyle);
  const density = useShellStore((state) => state.density);
  const glow = useShellStore((state) => state.glow);
  const themePresetId = useShellStore((state) => state.themePresetId);

  useEffect(() => {
    applyTheme(document.documentElement, {
      accentStyle,
      density,
      glow,
      themePresetId,
    });
  }, [accentStyle, density, glow, themePresetId]);

  return <ModuleRegistryProvider>{children}</ModuleRegistryProvider>;
}