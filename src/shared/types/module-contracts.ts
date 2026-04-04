import type { ShellView } from '@/shared/types/shell';

export interface ModuleStatus {
  name: string;
  state: 'mocked' | 'planned' | 'ready';
  summary: string;
}

export interface Objective {
  id: string;
  label: string;
  completed: boolean;
}

export interface MissionSnapshot {
  ticketId: string;
  title: string;
  phase: string;
  priority: string;
  summary: string;
  objectives: Objective[];
  notes: string[];
}

export type CharacterAccent = 'cyan' | 'pink' | 'lime' | 'violet' | 'amber';

export interface TeamMemberSnapshot {
  name: string;
  role: string;
  status: 'online' | 'syncing' | 'away' | 'urgent' | 'watching' | 'ready' | 'committing';
  focus: string;
  accent: CharacterAccent;
  initials: string;
  /** Column index (0-4) in roster.png sprite sheet */
  spriteCol: number;
}

export interface ChatMessage {
  id: string;
  speaker: string;
  role: string;
  timestamp: string;
  tone: 'info' | 'warning' | 'support';
  body: string;
}

export interface ConversationSnapshot {
  roster: TeamMemberSnapshot[];
  messages: ChatMessage[];
  inputPlaceholder: string;
}

export interface EvaluationSignal {
  label: string;
  value: string;
  tone: 'ok' | 'warn' | 'info';
}

export interface EvaluationSnapshot {
  status: string;
  activeRuleSet: string;
  lastRun: string;
  signals: EvaluationSignal[];
}

export interface MentorSnapshot {
  name: string;
  role: string;
  mood: string;
  note: string;
  focusAreas: string[];
}

export interface NarrativeSnapshot {
  sprintMood: string;
  relationshipTrend: string;
  flags: string[];
}

export interface FxSnapshot {
  chromeMode: string;
  pulseLevel: string;
  ambientNote: string;
}

export interface MissionEngine {
  getStatus(): ModuleStatus;
  getActiveMission(view: ShellView): MissionSnapshot;
}

export interface EvaluationEngine {
  getStatus(): ModuleStatus;
  getWorkspaceSnapshot(filePath: string): EvaluationSnapshot;
}

export interface ConversationEngine {
  getStatus(): ModuleStatus;
  getConversationSnapshot(): ConversationSnapshot;
}

export interface AiMentorLayer {
  getStatus(): ModuleStatus;
  getMentorSnapshot(view: ShellView): MentorSnapshot;
}

export interface NarrativeState {
  getStatus(): ModuleStatus;
  getNarrativeSnapshot(): NarrativeSnapshot;
}

export interface PresentationFxLayer {
  getStatus(): ModuleStatus;
  getFxSnapshot(): FxSnapshot;
}

export interface ModuleRegistry {
  missionEngine: MissionEngine;
  evaluationEngine: EvaluationEngine;
  conversationEngine: ConversationEngine;
  aiMentor: AiMentorLayer;
  narrativeState: NarrativeState;
  presentationFx: PresentationFxLayer;
}