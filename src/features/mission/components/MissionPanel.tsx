import { ChevronDown, Gauge, Sparkles, User, BookOpen } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { cx } from '@/shared/lib/cx';

export function MissionPanel() {
  const { missionEngine, aiMentor, narrativeState, presentationFx } = useModuleRegistry();

  const mission = missionEngine.getActiveMission('workspace');
  const mentor = aiMentor.getMentorSnapshot('workspace');
  const narrative = narrativeState.getNarrativeSnapshot();
  const fx = presentationFx.getFxSnapshot();

  return (
    <div className="flex h-full min-h-0 flex-col bg-(--surface-1) border-l border-(--panel-border)">
      <div className="panel-header">
        <div className="min-w-0">
          <span className="panel-eyebrow">MISSION / MENTOR</span>
          <div className="panel-heading-row">
            <h2 className="font-body text-[15px] font-semibold text-(--text-primary)">Guidance Bay</h2>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto shell-scroll">
        {/* Active mission */}
        <MissionSection mission={mission} />

        {/* Mentor guidance */}
        <section className="border-t border-(--panel-border) px-3 py-3">
          <div className="sidebar-section-header mb-2">
            <ChevronDown className="h-3 w-3" />
            <User className="h-3 w-3 text-(--accent)" />
            <span>Mentor</span>
          </div>
          <div className="mentor-card">
            <div className="flex items-center justify-between gap-2">
              <p className="font-body text-[15px] font-semibold text-(--text-primary)">{mentor.name}</p>
              <span className="shell-chip text-[12px] text-(--accent)">{mentor.mood}</span>
            </div>
            <p className="font-body text-[12px] uppercase tracking-[0.16em] text-(--text-dim)">{mentor.role}</p>
            <p className="mt-2 font-chat text-[14px] leading-relaxed text-(--text-muted)">{mentor.note}</p>
            {mentor.focusAreas.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {mentor.focusAreas.map((area) => (
                  <span key={area} className="mission-tag">{area}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Narrative state */}
        <section className="border-t border-(--panel-border) px-3 py-3">
          <div className="sidebar-section-header mb-2">
            <ChevronDown className="h-3 w-3" />
            <BookOpen className="h-3 w-3 text-(--accent)" />
            <span>Narrative</span>
          </div>
          <div className="flex flex-col gap-2">
            <NarrativeRow label="Sprint mood" value={narrative.sprintMood} />
            <NarrativeRow label="Relationships" value={narrative.relationshipTrend} />
            {narrative.flags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {narrative.flags.map((flag) => (
                  <span key={flag} className="mission-tag text-(--text-dim)">{flag}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Presentation FX */}
        <section className="border-t border-(--panel-border) px-3 py-3">
          <div className="sidebar-section-header mb-2">
            <ChevronDown className="h-3 w-3" />
            <Sparkles className="h-3 w-3 text-(--accent)" />
            <span>FX Layer</span>
          </div>
          <div className="flex flex-col gap-2">
            <NarrativeRow label="Chrome" value={fx.chromeMode} />
            <NarrativeRow label="Pulse" value={fx.pulseLevel} />
            <NarrativeRow label="Ambient" value={fx.ambientNote} />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- sub-components ---------- */

function MissionSection({ mission }: { mission: ReturnType<ReturnType<typeof useModuleRegistry>['missionEngine']['getActiveMission']> }) {
  return (
    <section className="px-3 py-3">
      <div className="sidebar-section-header mb-2">
        <ChevronDown className="h-3 w-3" />
        <Gauge className="h-3 w-3 text-(--accent)" />
        <span>Active Mission</span>
      </div>
      <div className="mission-readout">
        <div className="flex items-center justify-between gap-2">
          <span className="mission-readout-ticket">{mission.ticketId}</span>
          <span className={cx(
            'shell-chip text-[12px]',
            mission.priority === 'high' ? 'text-(--danger)' : 'text-(--warning)',
          )}>
            {mission.priority}
          </span>
        </div>
        <span className="mission-readout-title">{mission.title}</span>
        <span className="text-[12px] uppercase tracking-[0.16em] font-body text-(--text-dim)">{mission.phase}</span>
        <span className="mission-readout-summary">{mission.summary}</span>
        <div className="mt-2 flex flex-col gap-1">
          {mission.objectives.map((obj) => (
            <div key={obj.id} className="flex items-center gap-2">
              <span className={obj.completed ? 'objective-check objective-check-done' : 'objective-check'} />
              <span className="font-body text-[14px] text-(--text-muted)">{obj.label}</span>
            </div>
          ))}
        </div>
        {mission.notes.length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            {mission.notes.map((note, i) => (
              <p key={i} className="font-chat text-[13px] text-(--text-dim) italic">— {note}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function NarrativeRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-body text-[12px] uppercase tracking-[0.16em] text-(--text-dim)">{label}</p>
      <p className="font-chat text-[14px] text-(--text-muted)">{value}</p>
    </div>
  );
}
