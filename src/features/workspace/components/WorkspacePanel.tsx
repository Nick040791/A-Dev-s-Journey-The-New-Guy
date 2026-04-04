import { lazy, Suspense, useState } from 'react';

import { Braces, ShieldCheck } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { editorFiles } from '@/mocks/shell-data';
import { useShellStore } from '@/features/shell/state/use-shell-store';
import { PanelFrame } from '@/shared/ui/PanelFrame';
import { StatusBadge } from '@/shared/ui/StatusBadge';

const WorkspaceEditorSurface = lazy(() => import('@/features/workspace/components/WorkspaceEditorSurface'));
const WorkspacePreviewDeck = lazy(() => import('@/features/workspace/components/WorkspacePreviewDeck'));

function EditorLoadFallback() {
  return (
    <div className="editor-standby flex h-full flex-col items-center justify-center gap-3 text-center">
      <p className="panel-eyebrow">MONACO</p>
      <p className="font-display text-sm uppercase tracking-[0.18em] text-(--text-primary)">Loading editor runtime</p>
      <p className="max-w-md text-sm leading-6 text-(--text-muted)">Fetching the editor core, worker, and shell theme pack for the workspace bay.</p>
    </div>
  );
}

export function WorkspacePanel() {
  const currentView = useShellStore((state) => state.currentView);
  const { aiMentor, conversationEngine, evaluationEngine, missionEngine, narrativeState, presentationFx } = useModuleRegistry();
  const themePresetId = useShellStore((state) => state.themePresetId);
  const [files, setFiles] = useState(editorFiles);
  const [activeFilePath, setActiveFilePath] = useState(files[0]?.path ?? '');

  const activeFile = files.find((file) => file.path === activeFilePath) ?? files[0];
  const evaluation = evaluationEngine.getWorkspaceSnapshot(activeFile.path);
  const mission = missionEngine.getActiveMission(currentView);
  const mentor = aiMentor.getMentorSnapshot(currentView);
  const narrative = narrativeState.getNarrativeSnapshot();
  const fx = presentationFx.getFxSnapshot();
  const conversation = conversationEngine.getConversationSnapshot();

  const frameMeta =
    currentView === 'workspace'
      ? {
          eyebrow: 'WORKSPACE',
          title: 'Editor Bay',
          subtitle: activeFile.summary,
          actions: <StatusBadge tone="ok">Monaco Live</StatusBadge>,
        }
      : currentView === 'briefing'
        ? {
            eyebrow: 'BRIEFING DECK',
            title: 'Sprint Deck',
            subtitle: mission.title,
            actions: <StatusBadge tone="info">{mission.ticketId}</StatusBadge>,
          }
        : {
            eyebrow: 'MENTOR SYNC',
            title: 'Mentor Sync Grid',
            subtitle: `${mentor.name} // ${mentor.role}`,
            actions: <StatusBadge tone="ok">{mentor.mood}</StatusBadge>,
          };

  return (
    <PanelFrame
      eyebrow={frameMeta.eyebrow}
      title={frameMeta.title}
      subtitle={frameMeta.subtitle}
      actions={frameMeta.actions}
      contentClassName="flex min-h-0 flex-col"
    >
      {currentView === 'workspace' ? (
        <>
          <div className="file-tabs">
            {files.map((file) => (
              <button
                className={activeFile.path === file.path ? 'file-tab file-tab-active' : 'file-tab'}
                key={file.path}
                onClick={() => setActiveFilePath(file.path)}
                type="button"
              >
                <span className="truncate">{file.label}</span>
              </button>
            ))}
          </div>

          <div className="signal-strip">
            <div className="signal-card">
              <Braces className="h-4 w-4 text-(--accent)" />
              <div>
                <p className="signal-label">Rule Set</p>
                <p className="signal-value">{evaluation.activeRuleSet}</p>
              </div>
            </div>
            <div className="signal-card">
              <ShieldCheck className="h-4 w-4 text-(--accent-secondary)" />
              <div>
                <p className="signal-label">Last Check</p>
                <p className="signal-value">{evaluation.lastRun}</p>
              </div>
            </div>
            <div className="ml-auto hidden items-center gap-2 lg:flex">
              {evaluation.signals.slice(0, 2).map((signal) => (
                <StatusBadge key={signal.label} tone={signal.tone === 'warn' ? 'warn' : signal.tone === 'ok' ? 'ok' : 'info'}>
                  {signal.label}: {signal.value}
                </StatusBadge>
              ))}
            </div>
          </div>
        </>
      ) : null}

      <div className="editor-shell">
        {currentView === 'workspace' ? (
          <Suspense fallback={<EditorLoadFallback />}>
            <WorkspaceEditorSurface
              activeFile={activeFile}
              onChange={(value) => {
                setFiles((current) =>
                  current.map((file) =>
                    file.path === activeFile.path
                      ? {
                          ...file,
                          content: value ?? '',
                        }
                      : file,
                  ),
                );
              }}
              themeId={themePresetId}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<EditorLoadFallback />}>
            <WorkspacePreviewDeck
              activeFile={activeFile}
              conversation={conversation}
              currentView={currentView}
              evaluation={evaluation}
              fx={fx}
              mentor={mentor}
              mission={mission}
              narrative={narrative}
            />
          </Suspense>
        )}
      </div>
    </PanelFrame>
  );
}