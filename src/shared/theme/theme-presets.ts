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
    label: 'Terminal Green',
    tag: 'GREEN / LIME',
    description: 'Classic terminal green with dark industrial panels. The default retro-hacker aesthetic.',
    vars: {
      '--app-bg': '#0a0a0a',
      '--surface-1': '#111111',
      '--surface-2': '#0d0d0d',
      '--surface-3': '#1a1a1a',
      '--panel-border': 'rgba(24, 255, 0, 0.18)',
      '--panel-border-strong': 'rgba(24, 255, 0, 0.38)',
      '--accent': '#18ff00',
      '--accent-rgb': '24 255 0',
      '--accent-secondary': '#7dff72',
      '--accent-secondary-rgb': '125 255 114',
      '--accent-tertiary': '#ffc857',
      '--text-primary': '#d4d4d4',
      '--text-muted': '#888888',
      '--text-dim': '#555555',
      '--success': '#18ff00',
      '--warning': '#ffd166',
      '--danger': '#ff5f5f',
    },
    monaco: {
      background: '#0a0a0a',
      foreground: '#d4d4d4',
      lineHighlight: '#151515',
      selection: '#264f1e',
      cursor: '#18ff00',
      keyword: '#18ff00',
      string: '#7dff72',
      number: '#ffc857',
      comment: '#555555',
      type: '#22d3ee',
    },
  },
  {
    id: 'signal-flare',
    label: 'Signal Flare',
    tag: 'AMBER / AQUA',
    description: 'Warmer command-center palette with amber pulse lines and cool telemetry accents.',
    vars: {
      '--app-bg': '#0a090a',
      '--surface-1': '#121010',
      '--surface-2': '#0e0c0c',
      '--surface-3': '#1a1616',
      '--panel-border': 'rgba(255, 193, 94, 0.2)',
      '--panel-border-strong': 'rgba(255, 193, 94, 0.42)',
      '--accent': '#ffc15e',
      '--accent-rgb': '255 193 94',
      '--accent-secondary': '#59f7ff',
      '--accent-secondary-rgb': '89 247 255',
      '--accent-tertiary': '#ff8f66',
      '--text-primary': '#e8dfd0',
      '--text-muted': '#a89888',
      '--text-dim': '#6e5e4e',
      '--success': '#9cf2be',
      '--warning': '#ffd166',
      '--danger': '#ff8f66',
    },
    monaco: {
      background: '#0e0c0c',
      foreground: '#e8dfd0',
      lineHighlight: '#1a1616',
      selection: '#4d3b2e',
      cursor: '#ffc15e',
      keyword: '#59f7ff',
      string: '#ffdca1',
      number: '#ff8f66',
      comment: '#6e5e4e',
      type: '#ffc15e',
    },
  },
  {
    id: 'cinder-grid',
    label: 'Cinder Grid',
    tag: 'CYAN / PINK',
    description: 'Neon arcade chrome with bright cyan rails and magenta highlights. Louder, bolder.',
    vars: {
      '--app-bg': '#050815',
      '--surface-1': '#0b1022',
      '--surface-2': '#090d1c',
      '--surface-3': '#121933',
      '--panel-border': 'rgba(97, 247, 255, 0.22)',
      '--panel-border-strong': 'rgba(97, 247, 255, 0.48)',
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
      background: '#090d1c',
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
];

export const densityScale: Record<
  DensityMode,
  { panelPadding: string; gap: string; radius: string; topBarHeight: string }
> = {
  compact: {
    panelPadding: '0.5rem',
    gap: '0px',
    radius: '0px',
    topBarHeight: '32px',
  },
  comfortable: {
    panelPadding: '0.625rem',
    gap: '0px',
    radius: '0px',
    topBarHeight: '32px',
  },
  expanded: {
    panelPadding: '0.75rem',
    gap: '0px',
    radius: '0px',
    topBarHeight: '32px',
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