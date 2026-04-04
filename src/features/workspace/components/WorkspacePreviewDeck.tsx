import { Braces, Flag, MessageSquare, Radar, ShieldCheck, Sparkles } from 'lucide-react';

import type {
  ConversationSnapshot,
  EvaluationSnapshot,
  FxSnapshot,
  MentorSnapshot,
  MissionSnapshot,
  NarrativeSnapshot,
} from '@/shared/types/module-contracts';
import type { EditorFileModel, ShellView } from '@/shared/types/shell';
import { StatusBadge } from '@/shared/ui/StatusBadge';

type PreviewView = Exclude<ShellView, 'workspace'>;

interface WorkspacePreviewDeckProps {
  activeFile: EditorFileModel;
  conversation: ConversationSnapshot;
  currentView: PreviewView;
  evaluation: EvaluationSnapshot;
  fx: FxSnapshot;
  mentor: MentorSnapshot;
  mission: MissionSnapshot;
  narrative: NarrativeSnapshot;
}

export default function WorkspacePreviewDeck(props: WorkspacePreviewDeckProps) {
  return props.currentView === 'briefing' ? <BriefingDeck {...props} /> : <MentorDeck {...props} />;
}

function BriefingDeck({ activeFile, conversation, evaluation, mission }: WorkspacePreviewDeckProps) {
  const highlightedMessages = [...conversation.messages].slice(-2).reverse();

  return (
    <div className="grid h-full min-h-0 gap-4 p-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <div className="min-h-0 space-y-4 overflow-y-auto pr-1 shell-scroll">
        <section className="mission-card">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="panel-eyebrow">{mission.phase}</p>
              <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-(--text-primary)">Current handoff</h3>
              <p className="mt-3 text-sm leading-6 text-(--text-muted)">{mission.summary}</p>
            </div>
            <StatusBadge tone="info">{mission.priority}</StatusBadge>
          </div>

          <div className="mt-4 space-y-3">
            {mission.objectives.map((objective) => (
              <div className="objective-row" key={objective.id}>
                <span className={objective.completed ? 'objective-check objective-check-done' : 'objective-check'} />
                <span className="text-sm text-(--text-primary)">{objective.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {mission.notes.map((note) => (
              <span className="shell-chip" key={note}>
                {note}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <article className="status-card items-start">
            <Flag className="mt-0.5 h-4 w-4 text-(--accent)" />
            <div>
              <p className="status-card-title">Ticket lane</p>
              <p className="status-card-copy">{mission.ticketId}</p>
            </div>
          </article>
          <article className="status-card items-start">
            <Braces className="mt-0.5 h-4 w-4 text-(--accent-secondary)" />
            <div>
              <p className="status-card-title">Queued source</p>
              <p className="status-card-copy">{activeFile.label}</p>
              <p className="mt-1 text-sm leading-6 text-(--text-muted)">{activeFile.summary}</p>
            </div>
          </article>
          <article className="status-card items-start">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-(--accent-tertiary)" />
            <div>
              <p className="status-card-title">Validation lane</p>
              <p className="status-card-copy">{evaluation.activeRuleSet}</p>
              <p className="mt-1 text-sm leading-6 text-(--text-muted)">{evaluation.lastRun}</p>
            </div>
          </article>
        </section>

        <section className="stacked-card">
          <p className="panel-eyebrow">Handoff route</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <article className="signal-row">
              <Flag className="h-4 w-4 text-(--accent)" />
              <div>
                <p className="signal-label">Mission frame</p>
                <p className="signal-value">Lock the shell baseline before deeper systems attach.</p>
              </div>
            </article>
            <article className="signal-row">
              <MessageSquare className="h-4 w-4 text-(--accent-secondary)" />
              <div>
                <p className="signal-label">Team pressure</p>
                <p className="signal-value">Stakeholder chatter stays visible while gameplay logic remains mocked.</p>
              </div>
            </article>
            <article className="signal-row">
              <Braces className="h-4 w-4 text-(--accent-tertiary)" />
              <div>
                <p className="signal-label">Editor readiness</p>
                <p className="signal-value">Workspace boots only on demand to keep non-build flows light.</p>
              </div>
            </article>
            <article className="signal-row">
              <ShieldCheck className="h-4 w-4 text-(--success)" />
              <div>
                <p className="signal-label">Iteration safety</p>
                <p className="signal-value">Layout memory and theme state persist between shell sessions.</p>
              </div>
            </article>
          </div>
        </section>
      </div>

      <aside className="min-h-0 space-y-4 overflow-y-auto pr-1 shell-scroll">
        <section className="stacked-card">
          <p className="panel-eyebrow">Team posture</p>
          <div className="mt-4 space-y-3">
            {conversation.roster.slice(0, 3).map((member) => (
              <article className="roster-card" key={member.name}>
                <div className="roster-avatar">{member.name.split(' ').map((part) => part[0]).join('')}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-(--text-primary)">{member.name}</p>
                    <StatusBadge tone={member.status === 'online' ? 'ok' : member.status === 'syncing' ? 'info' : 'muted'}>
                      {member.status}
                    </StatusBadge>
                  </div>
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-(--text-dim)">{member.role}</p>
                  <p className="mt-1 text-sm leading-6 text-(--text-muted)">{member.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="stacked-card">
          <p className="panel-eyebrow">Latest team calls</p>
          <div className="mt-4 space-y-3">
            {highlightedMessages.map((message) => (
              <article className="message-card" key={message.id}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-(--text-primary)">{message.speaker}</p>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-(--text-dim)">{message.role}</p>
                  </div>
                  <StatusBadge tone={message.tone === 'warning' ? 'warn' : message.tone === 'support' ? 'ok' : 'info'}>
                    {message.timestamp}
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-(--text-muted)">{message.body}</p>
              </article>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function MentorDeck({ activeFile, evaluation, fx, mentor, narrative }: WorkspacePreviewDeckProps) {
  return (
    <div className="grid h-full min-h-0 gap-4 p-4 xl:grid-cols-[minmax(0,1.45fr)_320px]">
      <div className="min-h-0 space-y-4 overflow-y-auto pr-1 shell-scroll">
        <section className="mentor-card">
          <div className="mentor-avatar">{mentor.name.split(' ').map((part) => part[0]).join('')}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-(--text-primary)">{mentor.name}</p>
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-(--text-dim)">{mentor.role}</p>
              </div>
              <StatusBadge tone="ok">{mentor.mood}</StatusBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-(--text-muted)">{mentor.note}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.focusAreas.map((focus) => (
                <span className="shell-chip" key={focus}>
                  {focus}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <article className="status-card items-start">
            <Radar className="mt-0.5 h-4 w-4 text-(--accent)" />
            <div>
              <p className="status-card-title">Relationship drift</p>
              <p className="status-card-copy">{narrative.relationshipTrend}</p>
            </div>
          </article>
          <article className="status-card items-start">
            <Sparkles className="mt-0.5 h-4 w-4 text-(--accent-secondary)" />
            <div>
              <p className="status-card-title">Sprint mood</p>
              <p className="status-card-copy">{narrative.sprintMood}</p>
            </div>
          </article>
          <article className="status-card items-start">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-(--accent-tertiary)" />
            <div>
              <p className="status-card-title">FX lane</p>
              <p className="status-card-copy">{fx.pulseLevel}</p>
            </div>
          </article>
        </section>

        <section className="stacked-card">
          <p className="panel-eyebrow">Coaching cues</p>
          <div className="mt-4 grid gap-3">
            <article className="signal-row">
              <Braces className="h-4 w-4 text-(--accent)" />
              <div>
                <p className="signal-label">Queued file</p>
                <p className="signal-value">{activeFile.label}</p>
                <p className="mt-1 text-sm leading-6 text-(--text-muted)">{activeFile.summary}</p>
              </div>
            </article>
            <article className="signal-row">
              <ShieldCheck className="h-4 w-4 text-(--accent-secondary)" />
              <div>
                <p className="signal-label">Validation rhythm</p>
                <p className="signal-value">{evaluation.activeRuleSet}</p>
                <p className="mt-1 text-sm leading-6 text-(--text-muted)">{evaluation.lastRun}</p>
              </div>
            </article>
            <article className="signal-row">
              <MessageSquare className="h-4 w-4 text-(--accent-tertiary)" />
              <div>
                <p className="signal-label">Mentor prompt</p>
                <p className="signal-value">Switch to Workspace to act on the current guidance without booting narrative systems prematurely.</p>
              </div>
            </article>
          </div>
        </section>
      </div>

      <aside className="min-h-0 space-y-4 overflow-y-auto pr-1 shell-scroll">
        <section className="stacked-card">
          <p className="panel-eyebrow">Narrative flags</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {narrative.flags.map((flag) => (
              <span className="shell-chip" key={flag}>
                {flag}
              </span>
            ))}
          </div>
        </section>

        <section className="stacked-card">
          <p className="panel-eyebrow">Signal lane</p>
          <div className="mt-4 grid gap-3">
            {evaluation.signals.map((signal) => (
              <article className="signal-row" key={signal.label}>
                <div>
                  <p className="signal-label">{signal.label}</p>
                  <p className="signal-value">{signal.value}</p>
                </div>
                <StatusBadge tone={signal.tone === 'warn' ? 'warn' : signal.tone === 'ok' ? 'ok' : 'info'}>
                  {signal.tone}
                </StatusBadge>
              </article>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}