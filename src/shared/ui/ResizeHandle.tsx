import { Separator as ResizableSeparator } from 'react-resizable-panels';

import { cx } from '@/shared/lib/cx';

export function ResizeHandle({ direction }: { direction: 'horizontal' | 'vertical' }) {
  return (
    <ResizableSeparator
      className={cx(
        'resize-handle group flex shrink-0 items-center justify-center',
        direction === 'horizontal' ? 'resize-handle-horizontal' : 'resize-handle-vertical',
      )}
    >
      <span className="resize-handle-grip" />
    </ResizableSeparator>
  );
}