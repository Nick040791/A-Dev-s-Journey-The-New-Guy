import { missionByView } from '@/mocks/shell-data';
import type { MissionEngine } from '@/shared/types/module-contracts';
import type { ShellView } from '@/shared/types/shell';

export const mockMissionEngine: MissionEngine = {
  getStatus() {
    return {
      name: 'Mission / Curriculum Engine',
      state: 'mocked',
      summary: 'Static mission snapshots only; no progression or scoring yet.',
    };
  },
  getActiveMission(view: ShellView) {
    return missionByView[view];
  },
};