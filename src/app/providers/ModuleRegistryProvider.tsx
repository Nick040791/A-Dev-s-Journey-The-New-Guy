import type { ReactNode } from 'react';

import { moduleRegistry } from '@/modules';
import { ModuleRegistryContext } from '@/app/providers/module-registry-context';

export function ModuleRegistryProvider({ children }: { children: ReactNode }) {
  return (
    <ModuleRegistryContext.Provider value={moduleRegistry}>
      {children}
    </ModuleRegistryContext.Provider>
  );
}
