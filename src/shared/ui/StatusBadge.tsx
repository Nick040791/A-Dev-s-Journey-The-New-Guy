import type { ReactNode } from 'react';

import { cx } from '@/shared/lib/cx';

type BadgeTone = 'ok' | 'warn' | 'info' | 'muted';

const toneClasses: Record<BadgeTone, string> = {
  ok: 'status-badge status-badge-ok',
  warn: 'status-badge status-badge-warn',
  info: 'status-badge status-badge-info',
  muted: 'status-badge status-badge-muted',
};

export function StatusBadge({
  children,
  tone = 'info',
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return <span className={cx(toneClasses[tone], 'text-[0.65rem] uppercase tracking-[0.24em]')}>{children}</span>;
}