import Editor from '@monaco-editor/react';

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

export default function WorkspaceEditorSurface({ activeFile, onChange, themeId }: WorkspaceEditorSurfaceProps) {
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