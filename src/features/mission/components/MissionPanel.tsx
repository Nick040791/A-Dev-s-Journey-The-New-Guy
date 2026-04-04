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
  const seams = [
    { label: 'Mission engine', summary: missionEngine.getStatus().summary },
    { label: 'AI mentor layer', summary: aiMentor.getStatus().summary },
    { label: 'Narrative state', summary: narrativeState.getStatus().summary },
    { label: 'Presentation FX', summary: presentationFx.getStatus().summary },
  ];

  return (
    <PanelFrame
      eyebrow="MISSION / MENTOR"
      title={mission.title}
      subtitle={mission.ticketId}
      actions={<StatusBadge tone="info">{mission.priority}</StatusBadge>}
      contentClassName="mission-panel-content flex min-h-0 flex-col overflow-y-auto pr-1 shell-scroll"
    >
      <section className="mission-card mission-summary-card">
        <div className="mission-summary-top">
          <div className="min-w-0">
            <p className="panel-eyebrow">{mission.phase}</p>
            <p className="mission-summary-copy text-sm text-(--text-muted)">{mission.summary}</p>
          </div>
          <StatusBadge tone="ok">shell scope</StatusBadge>
        </div>

        <div className="mission-objective-list">
          {mission.objectives.map((objective) => (
            <div className="objective-row" key={objective.id}>
              <span className={objective.completed ? 'objective-check objective-check-done' : 'objective-check'} />
              <span className="text-sm text-(--text-primary)">{objective.label}</span>
            </div>
          ))}
        </div>

        <div className="mission-note-list">
          {mission.notes.map((note) => (
            <span className="shell-chip" key={note}>
              {note}
            </span>
          ))}
        </div>
      </section>

      <section className="mentor-card mission-mentor-card">
        <div className="mentor-avatar">{mentor.name.split(' ').map((part) => part[0]).join('')}</div>
        <div className="min-w-0 flex-1">
          <div className="mission-mentor-header">
            <div>
              <p className="text-sm font-semibold text-(--text-primary)">{mentor.name}</p>
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-(--text-dim)">{mentor.role}</p>
            </div>
            <StatusBadge tone="ok">{mentor.mood}</StatusBadge>
          </div>
          <p className="mission-mentor-note text-sm text-(--text-muted)">{mentor.note}</p>
          <div className="mission-note-list">
            {mentor.focusAreas.map((focus) => (
              <span className="shell-chip" key={focus}>
                {focus}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mission-status-grid">
        <article className="status-card mission-status-card">
          <Flag className="h-4 w-4 text-(--accent)" />
          <div className="min-w-0">
            <p className="status-card-title">Narrative Lane</p>
            <p className="status-card-copy">{narrative.relationshipTrend}</p>
          </div>
        </article>
        <article className="status-card mission-status-card">
          <Radar className="h-4 w-4 text-(--accent-secondary)" />
          <div className="min-w-0">
            <p className="status-card-title">Sprint Mood</p>
            <p className="status-card-copy">{narrative.sprintMood}</p>
          </div>
        </article>
        <article className="status-card mission-status-card">
          <Sparkles className="h-4 w-4 text-(--accent-tertiary)" />
          <div className="min-w-0">
            <p className="status-card-title">FX Track</p>
            <p className="status-card-copy">{fx.pulseLevel}</p>
          </div>
        </article>
      </section>

      <section className="stacked-card mission-seams-card">
        <p className="panel-eyebrow">Future module seams</p>
        <ul className="mission-seams-list">
          {seams.map((seam) => (
            <li className="mission-seam-item" key={seam.label}>
              <span className="mission-seam-label">{seam.label}</span>
              <span className="mission-seam-copy">{seam.summary}</span>
            </li>
          ))}
        </ul>
      </section>
    </PanelFrame>
  );
}