import { createContext, useContext } from 'react';

import type { ModuleRegistry } from '@/shared/types/module-contracts';

export const ModuleRegistryContext = createContext<ModuleRegistry | null>(null);

export function useModuleRegistry(): ModuleRegistry {
  const value = useContext(ModuleRegistryContext);

  if (!value) {
    throw new Error('useModuleRegistry must be used within ModuleRegistryProvider.');
  }

  return value;
}