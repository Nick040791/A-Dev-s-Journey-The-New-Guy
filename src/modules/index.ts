import { mockAiMentor } from '@/modules/ai-mentor/mockAiMentor';
import { mockConversationEngine } from '@/modules/conversation-engine/mockConversationEngine';
import { mockEvaluationEngine } from '@/modules/evaluation-engine/mockEvaluationEngine';
import { mockMissionEngine } from '@/modules/mission-engine/mockMissionEngine';
import { mockNarrativeState } from '@/modules/narrative-state/mockNarrativeState';
import { mockPresentationFx } from '@/modules/presentation-fx/mockPresentationFx';
import type { ModuleRegistry } from '@/shared/types/module-contracts';

export const moduleRegistry: ModuleRegistry = {
  missionEngine: mockMissionEngine,
  evaluationEngine: mockEvaluationEngine,
  conversationEngine: mockConversationEngine,
  aiMentor: mockAiMentor,
  narrativeState: mockNarrativeState,
  presentationFx: mockPresentationFx,
};