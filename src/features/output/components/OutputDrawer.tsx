import { TerminalSquare } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { outputLogs } from '@/mocks/shell-data';
import { StatusBadge } from '@/shared/ui/StatusBadge';
import type { EditorFileModel } from '@/shared/types/shell';

interface OutputDrawerProps {
  activeFile: EditorFileModel;
}

export function OutputDrawer({ activeFile }: OutputDrawerProps) {
  const { evaluationEngine } = useModuleRegistry();
  const snapshot = evaluationEngine.getWorkspaceSnapshot(activeFile.path);

  return (
    <div className="flex h-full min-h-0 flex-col bg-(--surface-1) border-t border-(--panel-border)">
      <div className="panel-header">
        <div className="flex items-center gap-3">
          <span className="panel-eyebrow">OUTPUT</span>
          <span className="font-body text-[13px] text-(--text-dim)">— {activeFile.label}</span>
        </div>
        <StatusBadge tone="info">{evaluationEngine.getStatus().state}</StatusBadge>
      </div>

      <div className="output-drawer-content min-h-0 flex-1">
        {/* Signals panel */}
        <section className="output-signal-panel min-h-0 overflow-y-auto shell-scroll">
          <div className="px-2 py-1">
            <span className="panel-eyebrow">Signals</span>
          </div>
          <div className="output-signal-list">
            {snapshot.signals.map((signal) => (
              <article className="output-signal-row" key={signal.label}>
                <div className="min-w-0">
                  <p className="signal-label">{signal.label}</p>
                  <p className="signal-value">{signal.value}</p>
                </div>
                <StatusBadge tone={signal.tone === 'warn' ? 'warn' : signal.tone === 'ok' ? 'ok' : 'info'}>
                  {signal.tone}
                </StatusBadge>
              </article>
            ))}
          </div>
        </section>

        {/* Terminal */}
        <section className="terminal-card min-h-0">
          <div className="terminal-toolbar">
            <div className="flex items-center gap-2">
              <TerminalSquare className="h-3.5 w-3.5 text-(--accent)" />
              <span className="font-body text-[13px] text-(--text-primary)">Terminal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="terminal-dot bg-(--danger)" />
              <span className="terminal-dot bg-(--warning)" />
              <span className="terminal-dot bg-(--success)" />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-2 shell-scroll">
            <pre className="terminal-output">
              {outputLogs.map((line) => (
                <code className="block" key={line}>
                  {line}
                </code>
              ))}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}