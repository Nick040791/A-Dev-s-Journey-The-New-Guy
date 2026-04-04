import { TerminalSquare } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { editorFiles, outputLogs } from '@/mocks/shell-data';
import { PanelFrame } from '@/shared/ui/PanelFrame';
import { StatusBadge } from '@/shared/ui/StatusBadge';

export function OutputDrawer() {
  const { evaluationEngine } = useModuleRegistry();
  const activeFile = editorFiles[0];
  const snapshot = evaluationEngine.getWorkspaceSnapshot(activeFile.path);

  return (
    <PanelFrame
      eyebrow="OUTPUT DRAWER"
      title="Telemetry + Terminal"
      subtitle={`Previewing ${activeFile.label}`}
      actions={<StatusBadge tone="info">{evaluationEngine.getStatus().state}</StatusBadge>}
      contentClassName="output-drawer-content"
    >
      <section className="stacked-card output-signal-panel min-h-0">
        <p className="panel-eyebrow">Signals</p>
        <div className="output-signal-list">
          {snapshot.signals.map((signal) => (
            <article className="signal-row output-signal-row" key={signal.label}>
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

      <section className="terminal-card output-terminal-card min-h-0">
        <div className="terminal-toolbar">
          <div className="flex items-center gap-2">
            <TerminalSquare className="h-4 w-4 text-(--accent)" />
            <span className="output-terminal-uri text-sm font-medium text-(--text-primary)">shell://module-01/output</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="terminal-dot bg-(--danger)" />
            <span className="terminal-dot bg-(--warning)" />
            <span className="terminal-dot bg-(--success)" />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto shell-scroll">
          <pre className="terminal-output">
            {outputLogs.map((line) => (
              <code className="block" key={line}>
                {line}
              </code>
            ))}
          </pre>
        </div>
      </section>
    </PanelFrame>
  );
}