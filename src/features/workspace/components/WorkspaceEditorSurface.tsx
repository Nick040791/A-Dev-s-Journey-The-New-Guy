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
    <div className="editor-standby flex h-full flex-col justify-center gap-5 px-6 text-center">
      <div className="space-y-3">
        <p className="panel-eyebrow">EDITOR HEALTH CHECK</p>
        <p className="font-display text-sm uppercase tracking-[0.18em] text-(--text-primary)">Verifying local runtime</p>
        <p className="mx-auto max-w-lg text-sm leading-6 text-(--text-muted)">
          Checking the local Monaco runtime under <span className="font-code text-(--text-primary)">./monaco/vs</span> before mounting the editor surface.
        </p>
      </div>

      <div className="stacked-card mx-auto max-w-lg text-left">
        <p className="panel-eyebrow">Expected runtime</p>
        <p className="mt-2 text-sm font-semibold text-(--text-primary)">AMD loader + static editor assets</p>
        <p className="mt-2 text-sm leading-6 text-(--text-muted)">
          This check prevents the shell from failing silently if the synced Monaco assets are missing or the loader path is unavailable.
        </p>
      </div>
    </div>
  );
}

function EditorRuntimeError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="editor-standby flex h-full flex-col justify-center gap-5 px-6 text-center">
      <div className="space-y-3">
        <p className="panel-eyebrow">EDITOR HEALTH CHECK</p>
        <p className="font-display text-sm uppercase tracking-[0.18em] text-(--text-primary)">Editor runtime unavailable</p>
        <p className="mx-auto max-w-lg text-sm leading-6 text-(--text-muted)">
          Monaco could not be loaded from the local shell runtime. The rest of the shell is still intact, but the editor surface is being held back until the runtime responds.
        </p>
      </div>

      <div className="stacked-card mx-auto flex max-w-xl flex-col gap-4 text-left">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-(--warning)" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-(--text-primary)">Runtime diagnostic</p>
            <p className="mt-2 break-words font-code text-xs leading-6 text-(--text-muted)">{message}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="shell-chip">loader path: ./monaco/vs/loader.js</span>
          <button className="chrome-button chrome-button-primary" onClick={onRetry} type="button">
            <RotateCcw className="h-4 w-4" />
            <span>Retry runtime check</span>
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

  useEffect(() => {
    if (loader.__getMonacoInstance()) {
      setRuntimeStatus({ state: 'ready' });
      return;
    }

    let cancelled = false;
    const cancelable = loader.init();

    setRuntimeStatus({ state: 'checking' });

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
    return <EditorRuntimeError message={runtimeStatus.message} onRetry={() => setRetryToken((value) => value + 1)} />;
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