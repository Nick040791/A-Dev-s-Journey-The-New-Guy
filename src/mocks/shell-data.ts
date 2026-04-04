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
    focus: 'Watching shell modularity and long-term maintainability.',
  },
  {
    name: 'Dae Mercer',
    role: 'Product Manager',
    status: 'syncing',
    focus: 'Pressing for a believable desktop frame and mission clarity.',
  },
  {
    name: 'Jun Park',
    role: 'QA Analyst',
    status: 'online',
    focus: 'Reviewing panel persistence, layout friction, and stub clarity.',
  },
  {
    name: 'Sol Nadir',
    role: 'AI Mentor',
    status: 'away',
    focus: 'Roleplay guidance remains mocked until Module 03.',
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    speaker: 'Dae Mercer',
    role: 'PM',
    timestamp: '08:14',
    tone: 'info',
    body: 'Need the shell to feel like a real team workspace. Clean seams now save us pain when missions start mutating later.',
  },
  {
    id: 'msg-2',
    speaker: 'Mara Vale',
    role: 'Lead',
    timestamp: '08:18',
    tone: 'support',
    body: 'Keep the theme system token-driven. If glow and density live in config, iteration stays cheap.',
  },
  {
    id: 'msg-3',
    speaker: 'Jun Park',
    role: 'QA',
    timestamp: '08:22',
    tone: 'warning',
    body: 'Resizable panels are good. Make sure the collapsed states and layout persistence survive refreshes before calling this stable.',
  },
  {
    id: 'msg-4',
    speaker: 'Sol Nadir',
    role: 'Mentor',
    timestamp: '08:25',
    tone: 'support',
    body: 'I am still a shell. That is useful. A good shell teaches players what kind of world they have entered before the systems come online.',
  },
];

export const editorFiles: EditorFileModel[] = [
  {
    path: 'src/app/layout/ShellLayout.tsx',
    label: 'ShellLayout.tsx',
    language: 'typescript',
    summary: 'Primary composition of the desktop shell.',
    content: [
      "import { PanelGroup } from 'react-resizable-panels';",
      '',
      'export function ShellLayout() {',
      '  return (',
      '    <main className="shell-grid">',
      '      {/* Module 01 shell composition lives here */}',
      '    </main>',
      '  );',
      '}',
    ].join('\n'),
  },
  {
    path: 'src/modules/mission-engine/mockMissionEngine.ts',
    label: 'mockMissionEngine.ts',
    language: 'typescript',
    summary: 'Example future-module adapter boundary.',
    content: [
      'export const missionEngine = {',
      '  getStatus() {',
      "    return { name: 'Mission Engine', state: 'mocked', summary: 'Static mission payloads only.' };",
      '  },',
      '};',
    ].join('\n'),
  },
  {
    path: 'notes/module-01-status.md',
    label: 'module-01-status.md',
    language: 'markdown',
    summary: 'Narrative-facing shell notes.',
    content: [
      '# Module 01 Status',
      '',
      '- Shell layout: active',
      '- Conversation engine: mocked',
      '- Mission engine: mocked',
      '- Evaluation engine: mocked',
      '- Narrative state: mocked',
    ].join('\n'),
  },
];

export const evaluationSignals: EvaluationSignal[] = [
  { label: 'Contracts', value: '6 stubs declared', tone: 'ok' },
  { label: 'Persistence', value: 'theme + layout cached', tone: 'ok' },
  { label: 'Sandbox', value: 'deferred to Module 02+', tone: 'info' },
  { label: 'Scope drift', value: 'watch AI logic creep', tone: 'warn' },
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
  '[shell] restoring workspace density from local cache',
  '[layout] horizontal panel group loaded from autosave key new-guy-horizontal-layout',
  '[layout] vertical panel group loaded from autosave key new-guy-vertical-layout',
  '[mission-engine] using mock briefing payload M01-SHELL-001',
  '[evaluation-engine] diagnostics offline; showing placeholder signals',
  '[mentor-layer] roleplay transport intentionally stubbed for Module 01',
  '[presentation-fx] chrome profile synced to active theme preset',
];