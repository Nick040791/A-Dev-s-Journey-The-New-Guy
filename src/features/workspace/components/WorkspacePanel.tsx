import { lazy, Suspense, useState } from 'react';

import { Braces, ShieldCheck } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { editorFiles } from '@/mocks/shell-data';
import { useShellStore } from '@/features/shell/state/use-shell-store';
import { getThemePreset } from '@/shared/theme/theme-presets';
import { PanelFrame } from '@/shared/ui/PanelFrame';
import { StatusBadge } from '@/shared/ui/StatusBadge';

const WorkspaceEditorSurface = lazy(() => import('@/features/workspace/components/WorkspaceEditorSurface'));

function EditorLoadFallback() {
  return (
    <div className="editor-standby flex h-full flex-col items-center justify-center gap-3 text-center">
      <p className="panel-eyebrow">MONACO</p>
      <p className="font-display text-sm uppercase tracking-[0.18em] text-(--text-primary)">Loading editor runtime</p>
      <p className="max-w-md text-sm leading-6 text-(--text-muted)">Fetching the editor core, worker, and shell theme pack for the workspace bay.</p>
    </div>
  );
}

function WorkspaceStandby({ activeFileSummary }: { activeFileSummary: string }) {
  return (
    <div className="editor-standby flex h-full flex-col justify-center gap-5 px-6 text-center">
      <div className="space-y-3">
        <p className="panel-eyebrow">WORKSPACE STANDBY</p>
        <p className="font-display text-sm uppercase tracking-[0.18em] text-(--text-primary)">Editor bay is parked</p>
        <p className="mx-auto max-w-lg text-sm leading-6 text-(--text-muted)">
          Monaco only boots when the active shell view switches to Workspace. That keeps the shell lighter during briefing and mentor-focused passes.
        </p>
      </div>

      <div className="stacked-card mx-auto max-w-md text-left">
        <p className="panel-eyebrow">Selected file</p>
        <p className="mt-2 text-sm font-semibold text-(--text-primary)">{activeFileSummary}</p>
        <p className="mt-2 text-sm leading-6 text-(--text-muted)">Enter the Workspace view from the top bar to activate the Monaco editor surface.</p>
      </div>
    </div>
  );
}

export function WorkspacePanel() {
  const currentView = useShellStore((state) => state.currentView);
  const { evaluationEngine } = useModuleRegistry();
  const themePresetId = useShellStore((state) => state.themePresetId);
  const [files, setFiles] = useState(editorFiles);
  const [activeFilePath, setActiveFilePath] = useState(files[0]?.path ?? '');

  const activeFile = files.find((file) => file.path === activeFilePath) ?? files[0];
  const evaluation = evaluationEngine.getWorkspaceSnapshot(activeFile.path);
  const preset = getThemePreset(themePresetId);

  return (
    <PanelFrame
      eyebrow="WORKSPACE"
      title="Editor Bay"
      subtitle={activeFile.summary}
      actions={<StatusBadge tone="ok">Monaco Live</StatusBadge>}
      contentClassName="flex min-h-0 flex-col"
    >
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
              themeId={preset.id}
            />
          </Suspense>
        ) : (
          <WorkspaceStandby activeFileSummary={activeFile.summary} />
        )}
      </div>
    </PanelFrame>
  );
}