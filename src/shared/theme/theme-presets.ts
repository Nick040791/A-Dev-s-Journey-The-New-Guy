import type { AccentStyle, DensityMode } from '@/shared/types/shell';

export interface ThemePreset {
  id: 'arcade-pulse' | 'signal-flare' | 'cinder-grid';
  label: string;
  tag: string;
  description: string;
  vars: Record<string, string>;
  monaco: {
    background: string;
    foreground: string;
    lineHighlight: string;
    selection: string;
    cursor: string;
    keyword: string;
    string: string;
    number: string;
    comment: string;
    type: string;
  };
}

export type ThemePresetId = ThemePreset['id'];

export const themePresets: ThemePreset[] = [
  {
    id: 'arcade-pulse',
    label: 'Arcade Pulse',
    tag: 'CYAN / PINK',
    description: 'High-contrast neon chrome with bright cyan rails and magenta highlights.',
    vars: {
      '--app-bg': '#050815',
      '--surface-1': 'rgba(11, 16, 34, 0.88)',
      '--surface-2': 'rgba(9, 13, 28, 0.95)',
      '--surface-3': 'rgba(18, 25, 51, 0.97)',
      '--panel-border': 'rgba(97, 247, 255, 0.36)',
      '--panel-border-strong': 'rgba(97, 247, 255, 0.62)',
      '--accent': '#61f7ff',
      '--accent-rgb': '97 247 255',
      '--accent-secondary': '#ff6aac',
      '--accent-secondary-rgb': '255 106 172',
      '--accent-tertiary': '#ffc857',
      '--text-primary': '#eef8ff',
      '--text-muted': '#98acc9',
      '--text-dim': '#64738d',
      '--success': '#7dffba',
      '--warning': '#ffd166',
      '--danger': '#ff7b8c',
    },
    monaco: {
      background: '#0a1123',
      foreground: '#ddeeff',
      lineHighlight: '#14213a',
      selection: '#1f456d',
      cursor: '#61f7ff',
      keyword: '#61f7ff',
      string: '#8dffbf',
      number: '#ffc857',
      comment: '#5d7192',
      type: '#ff8ac0',
    },
  },
  {
    id: 'signal-flare',
    label: 'Signal Flare',
    tag: 'AMBER / AQUA',
    description: 'Warmer command-center palette with amber pulse lines and cool telemetry accents.',
    vars: {
      '--app-bg': '#0a090f',
      '--surface-1': 'rgba(20, 16, 24, 0.9)',
      '--surface-2': 'rgba(15, 12, 19, 0.96)',
      '--surface-3': 'rgba(28, 22, 34, 0.97)',
      '--panel-border': 'rgba(255, 193, 94, 0.34)',
      '--panel-border-strong': 'rgba(255, 193, 94, 0.62)',
      '--accent': '#ffc15e',
      '--accent-rgb': '255 193 94',
      '--accent-secondary': '#59f7ff',
      '--accent-secondary-rgb': '89 247 255',
      '--accent-tertiary': '#ff8f66',
      '--text-primary': '#fff6e6',
      '--text-muted': '#c2b6a6',
      '--text-dim': '#8a7b69',
      '--success': '#9cf2be',
      '--warning': '#ffd166',
      '--danger': '#ff8f66',
    },
    monaco: {
      background: '#171118',
      foreground: '#f7eddf',
      lineHighlight: '#261d28',
      selection: '#4d3b2e',
      cursor: '#ffc15e',
      keyword: '#59f7ff',
      string: '#ffdca1',
      number: '#ff8f66',
      comment: '#8b7664',
      type: '#ffc15e',
    },
  },
  {
    id: 'cinder-grid',
    label: 'Cinder Grid',
    tag: 'LIME / CRIMSON',
    description: 'Sharper green telemetry with restrained red accents and darker industrial panels.',
    vars: {
      '--app-bg': '#060807',
      '--surface-1': 'rgba(14, 18, 16, 0.88)',
      '--surface-2': 'rgba(11, 14, 13, 0.95)',
      '--surface-3': 'rgba(20, 25, 23, 0.97)',
      '--panel-border': 'rgba(157, 255, 113, 0.32)',
      '--panel-border-strong': 'rgba(157, 255, 113, 0.58)',
      '--accent': '#9dff71',
      '--accent-rgb': '157 255 113',
      '--accent-secondary': '#ff5f6d',
      '--accent-secondary-rgb': '255 95 109',
      '--accent-tertiary': '#f4ff7a',
      '--text-primary': '#edf6ed',
      '--text-muted': '#afbcaf',
      '--text-dim': '#738173',
      '--success': '#9dff71',
      '--warning': '#f4ff7a',
      '--danger': '#ff8b9a',
    },
    monaco: {
      background: '#101613',
      foreground: '#e8f2e8',
      lineHighlight: '#1c251f',
      selection: '#2d4630',
      cursor: '#9dff71',
      keyword: '#9dff71',
      string: '#f4ff7a',
      number: '#ff8b9a',
      comment: '#6d7a6f',
      type: '#85d9ff',
    },
  },
];

export const densityScale: Record<
  DensityMode,
  { panelPadding: string; gap: string; radius: string; topBarHeight: string }
> = {
  compact: {
    panelPadding: '0.75rem',
    gap: '0.75rem',
    radius: '18px',
    topBarHeight: '66px',
  },
  comfortable: {
    panelPadding: '1rem',
    gap: '1rem',
    radius: '22px',
    topBarHeight: '74px',
  },
  expanded: {
    panelPadding: '1.2rem',
    gap: '1.2rem',
    radius: '26px',
    topBarHeight: '82px',
  },
};

export const accentStyleLabels: Record<AccentStyle, string> = {
  soft: 'Soft Bloom',
  beam: 'Beam Trace',
  edge: 'Hard Edge',
};

export function getThemePreset(id: ThemePresetId): ThemePreset {
  return themePresets.find((preset) => preset.id === id) ?? themePresets[0];
}

export function createMonacoTheme(preset: ThemePreset) {
  return {
    base: 'vs-dark' as const,
    inherit: true,
    rules: [
      { token: 'keyword', foreground: preset.monaco.keyword.replace('#', '') },
      { token: 'string', foreground: preset.monaco.string.replace('#', '') },
      { token: 'number', foreground: preset.monaco.number.replace('#', '') },
      { token: 'comment', foreground: preset.monaco.comment.replace('#', '') },
      { token: 'type.identifier', foreground: preset.monaco.type.replace('#', '') },
    ],
    colors: {
      'editor.background': preset.monaco.background,
      'editor.foreground': preset.monaco.foreground,
      'editorLineNumber.foreground': '#60728a',
      'editorLineNumber.activeForeground': preset.monaco.cursor,
      'editorCursor.foreground': preset.monaco.cursor,
      'editor.lineHighlightBackground': preset.monaco.lineHighlight,
      'editor.selectionBackground': preset.monaco.selection,
      'editor.inactiveSelectionBackground': `${preset.monaco.selection}88`,
      'editorIndentGuide.background1': '#203046',
      'editorIndentGuide.activeBackground1': preset.monaco.cursor,
    },
  };
}