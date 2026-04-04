import { MessageSquare } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { PanelFrame } from '@/shared/ui/PanelFrame';
import { StatusBadge } from '@/shared/ui/StatusBadge';

export function ChatPanel() {
  const { conversationEngine } = useModuleRegistry();
  const status = conversationEngine.getStatus();
  const snapshot = conversationEngine.getConversationSnapshot();

  return (
    <PanelFrame
      eyebrow="TEAM CHAT"
      title="Squad Feed"
      subtitle="Mocked messages, future conversation seams"
      actions={<StatusBadge tone="info">{status.state}</StatusBadge>}
      contentClassName="chat-panel-content flex min-h-0 flex-col"
    >
      <div className="chat-roster-list">
        {snapshot.roster.map((member) => (
          <article className="roster-card chat-roster-card" key={member.name}>
            <div className="roster-avatar">{member.name.split(' ').map((part) => part[0]).join('')}</div>
            <div className="min-w-0 flex-1">
              <div className="chat-roster-header">
                <p className="truncate text-sm font-semibold text-(--text-primary)">{member.name}</p>
                <StatusBadge tone={member.status === 'online' ? 'ok' : member.status === 'syncing' ? 'info' : 'muted'}>
                  {member.status}
                </StatusBadge>
              </div>
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-(--text-dim)">{member.role}</p>
              <p className="chat-roster-focus text-sm text-(--text-muted)">{member.focus}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1 shell-scroll">
        <div className="chat-message-list">
          {snapshot.messages.map((message) => (
            <article className="message-card chat-message-card" key={message.id}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-(--text-primary)">{message.speaker}</p>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-(--text-dim)">{message.role}</p>
                </div>
                <StatusBadge tone={message.tone === 'warning' ? 'warn' : message.tone === 'support' ? 'ok' : 'info'}>
                  {message.timestamp}
                </StatusBadge>
              </div>
              <p className="chat-message-body text-sm text-(--text-muted)">{message.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="chat-compose chat-compose-shell">
        <MessageSquare className="h-4 w-4 text-(--text-dim)" />
        <span className="truncate text-sm text-(--text-dim)">{snapshot.inputPlaceholder}</span>
      </div>
    </PanelFrame>
  );
}