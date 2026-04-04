import { evaluationSignals } from '@/mocks/shell-data';
import type { EvaluationEngine } from '@/shared/types/module-contracts';

export const mockEvaluationEngine: EvaluationEngine = {
  getStatus() {
    return {
      name: 'Workspace / Evaluation Engine',
      state: 'mocked',
      summary: 'Static validation telemetry; no real execution sandbox attached.',
    };
  },
  getWorkspaceSnapshot(filePath: string) {
    return {
      status: `Previewing ${filePath}`,
      activeRuleSet: 'module-01-shell-preview',
      lastRun: 'A few seconds ago',
      signals: evaluationSignals,
    };
  },
};