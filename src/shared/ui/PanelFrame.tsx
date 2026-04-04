import type { ReactNode } from 'react';

import { cx } from '@/shared/lib/cx';

interface PanelFrameProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function PanelFrame({
  eyebrow,
  title,
  subtitle,
  actions,
  children,
  className,
  contentClassName,
}: PanelFrameProps) {
  return (
    <section className={cx('shell-panel relative flex h-full min-h-0 flex-col overflow-hidden', className)}>
      <div className="panel-sheen" />
      <header className="panel-header">
        <div className="min-w-0">
          <p className="panel-eyebrow">{eyebrow}</p>
          <div className="mt-1 flex items-center gap-3">
            <h2 className="truncate text-[1rem] font-semibold text-(--text-primary)">{title}</h2>
            {subtitle ? <span className="truncate text-xs text-(--text-dim)">{subtitle}</span> : null}
          </div>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>
      <div className={cx('panel-content min-h-0 flex-1', contentClassName)}>{children}</div>
    </section>
  );
}