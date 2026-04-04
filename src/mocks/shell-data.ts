import type {
  ChatMessage,
  EvaluationSignal,
  FxSnapshot,
  MentorSnapshot,
  MissionSnapshot,
  NarrativeSnapshot,
  TeamMemberSnapshot,
} from '@/shared/types/module-contracts';
import type { EditorFileModel, ShellView } from '@/shared/types/shell';

export const missionByView: Record<ShellView, MissionSnapshot> = {
  briefing: {
    ticketId: 'M01-SHELL-001',
    title: 'Establish the workstation frame',
    phase: 'Module 01 / Foundation',
    priority: 'P0 Shell',
    summary:
      'Deliver a believable team workspace with modular seams for future mission, evaluation, and conversation systems.',
    objectives: [
      { id: 'brief-1', label: 'Compose a five-panel desktop shell.', completed: true },
      { id: 'brief-2', label: 'Centralize theme tokens and experimentation controls.', completed: true },
      { id: 'brief-3', label: 'Expose future module boundaries without implementing gameplay.', completed: false },
    ],
    notes: [
      'Keep the shell visually strong but readable for long-form text and code.',
      'Treat all gameplay systems as adapters, not hardwired business logic.',
    ],
  },
  workspace: {
    ticketId: 'M01-SHELL-002',
    title: 'Make the editor bay feel operational',
    phase: 'Module 01 / Workspace',
    priority: 'P1 Preview',
    summary:
      'Embed Monaco as a real placeholder editor, wire mock evaluation telemetry, and keep the center panel comfortable for iteration.',
    objectives: [
      { id: 'work-1', label: 'Switch between representative files.', completed: true },
      { id: 'work-2', label: 'Surface validation signals without real code execution.', completed: false },
      { id: 'work-3', label: 'Leave room for future sandbox adapters.', completed: false },
    ],
    notes: [
      'Evaluation should read like a stubbed service, not a fake mini-game.',
      'The editor pane should stay visually quieter than the shell chrome.',
    ],
  },
  'mentor-bay': {
    ticketId: 'M01-SHELL-003',
    title: 'Stage the mentor and narrative lanes',
    phase: 'Module 01 / Guidance',
    priority: 'P1 UX',
    summary:
      'Use placeholder mentor, relationship, and presentation signals to preview how future character systems can live in the shell.',
    objectives: [
      { id: 'mentor-1', label: 'Expose mentor guidance cards and status reads.', completed: true },
      { id: 'mentor-2', label: 'Preview relationship and sprint tone slots.', completed: false },
      { id: 'mentor-3', label: 'Keep all roleplay logic behind adapters.', completed: true },
    ],
    notes: [
      'Mentor cues should feel actionable, not decorative.',
      'Narrative state is a thin placeholder for now; no branching logic yet.',
    ],
  },
};

export const teamRoster: TeamMemberSnapshot[] = [
  {
    name: 'Mara Vale',
    role: 'Tech Lead',
    status: 'online',
    focus: 'Keep the auth gate small. One responsibility. No panic refactors.',
    accent: 'cyan',
    initials: 'MV',
    spriteCol: 0,
  },
  {
    name: 'Dae Mercer',
    role: 'Project Manager',
    status: 'urgent',
    focus: 'Stakeholder changed scope. Need protected routes and session persistence before lunch.',
    accent: 'pink',
    initials: 'DM',
    spriteCol: 1,
  },
  {
    name: 'Jun Park',
    role: 'QA Analyst',
    status: 'watching',
    focus: 'Found a redirect loop on refresh. I left repro steps in the thread.',
    accent: 'lime',
    initials: 'JP',
    spriteCol: 2,
  },
  {
    name: 'Sol Nadir',
    role: 'AI Mentor',
    status: 'ready',
    focus: 'I can ghost-write a 20 second demo if you want the clean pattern first.',
    accent: 'violet',
    initials: 'SN',
    spriteCol: 3,
  },
  {
    name: 'Rex Hollow',
    role: 'Backend Dev',
    status: 'committing',
    focus: 'Session endpoint is stable. Frontend contract is waiting on you, hero.',
    accent: 'amber',
    initials: 'RH',
    spriteCol: 4,
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    speaker: 'Dae Mercer',
    role: 'PM',
    timestamp: '09:16',
    tone: 'warning',
    body: 'Stakeholder changed scope. Need protected routes and session persistence before lunch.',
  },
  {
    id: 'msg-2',
    speaker: 'Mara Vale',
    role: 'Lead',
    timestamp: '09:14',
    tone: 'support',
    body: 'Keep the auth gate small. One responsibility. No panic refactors.',
  },
  {
    id: 'msg-3',
    speaker: 'Jun Park',
    role: 'QA',
    timestamp: '09:17',
    tone: 'warning',
    body: 'Found a redirect loop on refresh. I left repro steps in the thread.',
  },
  {
    id: 'msg-4',
    speaker: 'Sol Nadir',
    role: 'Mentor',
    timestamp: '09:18',
    tone: 'support',
    body: 'I can ghost-write a 20 second demo if you want the clean pattern first.',
  },
  {
    id: 'msg-5',
    speaker: 'Rex Hollow',
    role: 'Backend',
    timestamp: '09:19',
    tone: 'info',
    body: 'Session endpoint is stable. Frontend contract is waiting on you, hero.',
  },
];

export const editorFiles: EditorFileModel[] = [
  {
    path: 'src/features/auth/AuthGate.tsx',
    label: 'AuthGate.tsx',
    language: 'typescript',
    summary: 'Session-guarded route wrapper.',
    content: [
      "import { useSession } from './useSession';",
      "import { Navigate } from 'react-router-dom';",
      '',
      'export function AuthGate({ children }: { children: React.ReactNode }) {',
      '  const { session, loading } = useSession();',
      '',
      '  if (loading) return <LoadingSkeleton />;',
      '  if (!session) return <Navigate to="/login" replace />;',
      '',
      '  return <>{children}</>;',
      '}',
    ].join('\n'),
  },
  {
    path: 'src/features/auth/useSession.ts',
    label: 'useSession.ts',
    language: 'typescript',
    summary: 'Session hook with token refresh logic.',
    content: [
      "import { useEffect, useState } from 'react';",
      "import type { Session } from './session.contract';",
      '',
      'export function useSession() {',
      '  const [session, setSession] = useState<Session | null>(null);',
      '  const [loading, setLoading] = useState(true);',
      '',
      '  useEffect(() => {',
      '    // TODO: Wire real session provider',
      '    setSession({ userId: "new-guy", role: "junior" });',
      '    setLoading(false);',
      '  }, []);',
      '',
      '  return { session, loading };',
      '}',
    ].join('\n'),
  },
  {
    path: 'src/features/auth/session.contract.ts',
    label: 'session.contract.ts',
    language: 'typescript',
    summary: 'Session type contract for auth module.',
    content: [
      'export interface Session {',
      '  userId: string;',
      "  role: 'junior' | 'mid' | 'senior';",
      '  token?: string;',
      '  expiresAt?: number;',
      '}',
      '',
      'export interface SessionProvider {',
      '  getSession(): Promise<Session | null>;',
      '  refresh(): Promise<Session>;',
      '  revoke(): Promise<void>;',
      '}',
    ].join('\n'),
  },
];

export const evaluationSignals: EvaluationSignal[] = [
  { label: 'Auth Gate', value: 'compiles — missing redirect guard', tone: 'warn' },
  { label: 'Session Hook', value: 'basic shape looks right', tone: 'ok' },
  { label: 'Contract', value: 'types match endpoint spec', tone: 'ok' },
  { label: 'Test Coverage', value: '1 of 3 specs failing', tone: 'warn' },
];

export const mentorByView: Record<ShellView, MentorSnapshot> = {
  briefing: {
    name: 'Sol Nadir',
    role: 'AI Mentor Stub',
    mood: 'Measured',
    note: 'Anchor the shell around believable team rituals: intake, build, review, and feedback.',
    focusAreas: ['Mission framing', 'Panel balance', 'Modular seams'],
  },
  workspace: {
    name: 'Mara Vale',
    role: 'Tech Lead Proxy',
    mood: 'Demanding',
    note: 'Make the editor feel real, but keep evaluation logic outside the shell. The shell should host the engine, not become it.',
    focusAreas: ['Monaco integration', 'Readable chrome', 'Replaceable adapters'],
  },
  'mentor-bay': {
    name: 'Sol Nadir',
    role: 'Narrative Mentor Stub',
    mood: 'Calm',
    note: 'Even mocked mentor states should imply progression, trust, and tension without locking us into one story structure.',
    focusAreas: ['Relationship slots', 'Narrative hooks', 'Presentation cues'],
  },
};

export const narrativeSnapshot: NarrativeSnapshot = {
  sprintMood: 'Optimistic pressure',
  relationshipTrend: 'Tech Lead confidence rising; QA skepticism stable.',
  flags: ['story-branching: deferred', 'mentor-memory: placeholder', 'relationship-graph: hidden'],
};

export const fxSnapshot: FxSnapshot = {
  chromeMode: 'Retro neon desktop shell',
  pulseLevel: 'Medium glow with configurable accent edge',
  ambientNote: 'Presentation FX remain CSS-driven placeholders for Module 01.',
};

export const outputLogs = [
  '[session] checking stored token … expired',
  '[auth] redirecting to /login — no valid session',
  '[mission-engine] loading ticket AUTH-042 payload',
  '[evaluation] watching AuthGate.tsx for contract drift',
  '[build] compiled 3 modules in 420ms',
  '[test] redirect-loop.spec.ts — 1 failing, 2 passed',
  '[mentor] Sol is watching your session hook',
];