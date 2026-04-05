import { lazy, Suspense } from 'react';

import { Braces, ShieldCheck } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { useShellStore } from '@/features/shell/state/use-shell-store';
import { StatusBadge } from '@/shared/ui/StatusBadge';
import { cx } from '@/shared/lib/cx';
import type { EditorFileModel } from '@/shared/types/shell';

const WorkspaceEditorSurface = lazy(() => import('@/features/workspace/components/WorkspaceEditorSurface'));

function EditorLoadFallback() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-(--surface-1) text-center">
      <div className="editor-boot-pulse" aria-hidden="true" />
      <p className="panel-eyebrow">EDITOR</p>
      <p className="font-display text-[8px] uppercase tracking-[0.14em] text-(--text-primary)">Loading runtime</p>
    </div>
  );
}

interface WorkspacePanelProps {
  files: EditorFileModel[];
  activeFilePath: string;
  onFileSelect: (path: string) => void;
  onFileChange: (path: string, content: string) => void;
}

export function WorkspacePanel({ files, activeFilePath, onFileSelect, onFileChange }: WorkspacePanelProps) {
  const { evaluationEngine } = useModuleRegistry();
  const themePresetId = useShellStore((state) => state.themePresetId);

  const activeFile = files.find((file) => file.path === activeFilePath) ?? files[0];
  const evaluation = evaluationEngine.getWorkspaceSnapshot(activeFile.path);

  return (
    <div className="flex h-full min-h-0 flex-col bg-(--surface-1)">
      {/* File tabs */}
      <div className="file-tabs">
        {files.map((file) => (
          <button
            className={cx('file-tab', activeFile.path === file.path && 'file-tab-active')}
            key={file.path}
            onClick={() => onFileSelect(file.path)}
            type="button"
          >
            <span className="truncate">{file.label}</span>
          </button>
        ))}
      </div>

      {/* Signal strip */}
      <div className="signal-strip">
        <div className="signal-card">
          <Braces className="h-3.5 w-3.5 text-(--accent)" />
          <div>
            <span className="signal-label">Rule</span>
            <span className="signal-value ml-1">{evaluation.activeRuleSet}</span>
          </div>
        </div>
        <div className="signal-card">
          <ShieldCheck className="h-3.5 w-3.5 text-(--accent-secondary)" />
          <div>
            <span className="signal-label">Check</span>
            <span className="signal-value ml-1">{evaluation.lastRun}</span>
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

      {/* Editor */}
      <div className="editor-shell">
        <Suspense fallback={<EditorLoadFallback />}>
          <WorkspaceEditorSurface
            activeFile={activeFile}
            onChange={(value) => {
              onFileChange(activeFile.path, value ?? '');
            }}
            themeId={themePresetId}
          />
        </Suspense>
      </div>
    </div>
  );
}