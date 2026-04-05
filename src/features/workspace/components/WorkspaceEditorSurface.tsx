import { useEffect, useState } from 'react';

import { loader } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

import '@/shared/lib/monaco';
import { createMonacoTheme, themePresets, type ThemePresetId } from '@/shared/theme/theme-presets';
import type { EditorFileModel } from '@/shared/types/shell';

const editorOptions = {
  automaticLayout: true,
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 13,
  lineHeight: 22,
  minimap: { enabled: false },
  padding: { top: 18, bottom: 18 },
  smoothScrolling: true,
  scrollBeyondLastLine: false,
  wordWrap: 'on' as const,
};

interface WorkspaceEditorSurfaceProps {
  activeFile: EditorFileModel;
  onChange: (value: string | undefined) => void;
  themeId: ThemePresetId;
}

type RuntimeStatus =
  | { state: 'checking' }
  | { state: 'ready' }
  | { state: 'error'; message: string };

function getMonacoErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string' && error.length > 0) {
    return error;
  }

  return 'The Monaco runtime did not finish loading from the local shell assets.';
}

function EditorRuntimeChecking() {
  return (
    <div className="editor-standby flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="editor-boot-pulse" aria-hidden="true" />
      <p className="panel-eyebrow">EDITOR</p>
      <p className="font-display text-sm uppercase tracking-[0.18em] text-(--text-primary)">Verifying runtime</p>
      <p className="font-code text-xs text-(--text-dim)">./monaco/vs</p>
    </div>
  );
}

function EditorRuntimeError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="editor-standby flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <AlertTriangle className="h-6 w-6 text-(--warning)" />
      <p className="panel-eyebrow">EDITOR</p>
      <p className="font-display text-sm uppercase tracking-[0.18em] text-(--text-primary)">Runtime unavailable</p>
      <p className="mx-auto max-w-md text-xs leading-5 text-(--text-muted)">
        Monaco could not be loaded. The shell is intact but the editor is held back.
      </p>

      <div className="stacked-card mx-auto flex max-w-md flex-col gap-3 text-left">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-(--warning)" />
          <p className="min-w-0 wrap-break-word font-code text-xs leading-5 text-(--text-dim)">{message}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="shell-chip">loader: ./monaco/vs/loader.js</span>
          <button className="chrome-button chrome-button-primary" onClick={onRetry} type="button">
            <RotateCcw className="h-4 w-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkspaceEditorSurface({ activeFile, onChange, themeId }: WorkspaceEditorSurfaceProps) {
  const [runtimeStatus, setRuntimeStatus] = useState<RuntimeStatus>(() =>
    loader.__getMonacoInstance() ? { state: 'ready' } : { state: 'checking' },
  );
  const [retryToken, setRetryToken] = useState(0);

  function handleRetry() {
    if (loader.__getMonacoInstance()) {
      setRuntimeStatus({ state: 'ready' });
      return;
    }

    setRuntimeStatus({ state: 'checking' });
    setRetryToken((value) => value + 1);
  }

  useEffect(() => {
    if (loader.__getMonacoInstance()) {
      return;
    }

    let cancelled = false;
    const cancelable = loader.init();

    cancelable
      .then(() => {
        if (!cancelled) {
          setRuntimeStatus({ state: 'ready' });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setRuntimeStatus({ state: 'error', message: getMonacoErrorMessage(error) });
        }
      });

    return () => {
      cancelled = true;
      cancelable.cancel();
    };
  }, [retryToken]);

  if (runtimeStatus.state === 'checking') {
    return <EditorRuntimeChecking />;
  }

  if (runtimeStatus.state === 'error') {
    return <EditorRuntimeError message={runtimeStatus.message} onRetry={handleRetry} />;
  }

  return (
    <Editor
      beforeMount={(monaco) => {
        themePresets.forEach((themePreset) => {
          monaco.editor.defineTheme(`new-guy-${themePreset.id}`, createMonacoTheme(themePreset));
        });
      }}
      defaultLanguage={activeFile.language}
      height="100%"
      language={activeFile.language}
      onChange={onChange}
      options={editorOptions}
      path={activeFile.path}
      theme={`new-guy-${themeId}`}
      value={activeFile.content}
    />
  );
}