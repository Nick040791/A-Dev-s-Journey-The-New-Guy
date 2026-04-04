import { fxSnapshot } from '@/mocks/shell-data';
import type { PresentationFxLayer } from '@/shared/types/module-contracts';

export const mockPresentationFx: PresentationFxLayer = {
  getStatus() {
    return {
      name: 'Presentation / FX Layer',
      state: 'mocked',
      summary: 'Visual cues are CSS-driven placeholders with no runtime effects engine.',
    };
  },
  getFxSnapshot() {
    return fxSnapshot;
  },
};