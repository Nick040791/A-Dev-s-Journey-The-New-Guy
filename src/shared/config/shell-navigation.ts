import type { ShellView } from '@/shared/types/shell';

export interface ShellNavigationItem {
  id: ShellView;
  label: string;
  description: string;
  eyebrow: string;
}

export const shellNavigation: ShellNavigationItem[] = [
  {
    id: 'briefing',
    label: 'Sprint Briefing',
    description: 'Mission intake, team posture, and shell status.',
    eyebrow: 'INTAKE',
  },
  {
    id: 'workspace',
    label: 'Workspace',
    description: 'Editor focus with mocked evaluation signals.',
    eyebrow: 'BUILD',
  },
  {
    id: 'mentor-bay',
    label: 'Mentor Bay',
    description: 'Guidance, roleplay hooks, and narrative placeholders.',
    eyebrow: 'SYNC',
  },
];