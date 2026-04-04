import { Flag, Radar, Sparkles } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { useShellStore } from '@/features/shell/state/use-shell-store';
import { PanelFrame } from '@/shared/ui/PanelFrame';
import { StatusBadge } from '@/shared/ui/StatusBadge';

export function MissionPanel() {
  const currentView = useShellStore((state) => state.currentView);
  const { aiMentor, missionEngine, narrativeState, presentationFx } = useModuleRegistry();

  const mission = missionEngine.getActiveMission(currentView);
  const mentor = aiMentor.getMentorSnapshot(currentView);
  const narrative = narrativeState.getNarrativeSnapshot();
  const fx = presentationFx.getFxSnapshot();

  return (
    <PanelFrame
      eyebrow="MISSION / MENTOR"
      title={mission.title}
      subtitle={mission.ticketId}
      actions={<StatusBadge tone="info">{mission.priority}</StatusBadge>}
      contentClassName="flex min-h-0 flex-col gap-4 overflow-y-auto pr-1 shell-scroll"
    >
      <section className="mission-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="panel-eyebrow">{mission.phase}</p>
            <p className="mt-2 text-sm leading-6 text-(--text-muted)">{mission.summary}</p>
          </div>
          <StatusBadge tone="ok">shell scope</StatusBadge>
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

      <section className="grid gap-3 xl:grid-cols-3">
        <article className="status-card">
          <Flag className="h-4 w-4 text-(--accent)" />
          <p className="status-card-title">Narrative Lane</p>
          <p className="status-card-copy">{narrative.relationshipTrend}</p>
        </article>
        <article className="status-card">
          <Radar className="h-4 w-4 text-(--accent-secondary)" />
          <p className="status-card-title">Sprint Mood</p>
          <p className="status-card-copy">{narrative.sprintMood}</p>
        </article>
        <article className="status-card">
          <Sparkles className="h-4 w-4 text-(--accent-tertiary)" />
          <p className="status-card-title">FX Track</p>
          <p className="status-card-copy">{fx.pulseLevel}</p>
        </article>
      </section>

      <section className="stacked-card">
        <p className="panel-eyebrow">Future module seams</p>
        <ul className="mt-3 space-y-3 text-sm text-(--text-muted)">
          <li>Mission engine: {missionEngine.getStatus().summary}</li>
          <li>AI mentor layer: {aiMentor.getStatus().summary}</li>
          <li>Narrative state: {narrativeState.getStatus().summary}</li>
          <li>Presentation FX: {presentationFx.getStatus().summary}</li>
        </ul>
      </section>
    </PanelFrame>
  );
}