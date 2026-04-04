import { narrativeSnapshot } from '@/mocks/shell-data';
import type { NarrativeState } from '@/shared/types/module-contracts';

export const mockNarrativeState: NarrativeState = {
  getStatus() {
    return {
      name: 'Narrative / Relationship State',
      state: 'mocked',
      summary: 'Relationship and story flags are placeholders with no branching engine.',
    };
  },
  getNarrativeSnapshot() {
    return narrativeSnapshot;
  },
};