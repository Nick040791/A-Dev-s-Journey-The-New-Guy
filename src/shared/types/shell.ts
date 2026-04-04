export type ShellView = 'briefing' | 'workspace' | 'mentor-bay';

export type DensityMode = 'compact' | 'comfortable' | 'expanded';

export type AccentStyle = 'soft' | 'beam' | 'edge';

export interface EditorFileModel {
  path: string;
  label: string;
  language: string;
  content: string;
  summary: string;
}