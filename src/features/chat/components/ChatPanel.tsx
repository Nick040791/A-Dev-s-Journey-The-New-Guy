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
      subtitle="Mocked messages with future conversation seams"
      actions={<StatusBadge tone="info">{status.state}</StatusBadge>}
      contentClassName="flex min-h-0 flex-col gap-4"
    >
      <div className="grid gap-2">
        {snapshot.roster.map((member) => (
          <article className="roster-card" key={member.name}>
            <div className="roster-avatar">{member.name.split(' ').map((part) => part[0]).join('')}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-(--text-primary)">{member.name}</p>
                <StatusBadge tone={member.status === 'online' ? 'ok' : member.status === 'syncing' ? 'info' : 'muted'}>
                  {member.status}
                </StatusBadge>
              </div>
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-(--text-dim)">{member.role}</p>
              <p className="mt-1 text-sm text-(--text-muted)">{member.focus}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1 shell-scroll">
        <div className="flex flex-col gap-3">
          {snapshot.messages.map((message) => (
            <article className="message-card" key={message.id}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-(--text-primary)">{message.speaker}</p>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-(--text-dim)">{message.role}</p>
                </div>
                <StatusBadge tone={message.tone === 'warning' ? 'warn' : message.tone === 'support' ? 'ok' : 'info'}>
                  {message.timestamp}
                </StatusBadge>
              </div>
              <p className="mt-3 text-sm leading-6 text-(--text-muted)">{message.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="chat-compose">
        <MessageSquare className="h-4 w-4 text-(--text-dim)" />
        <span className="truncate text-sm text-(--text-dim)">{snapshot.inputPlaceholder}</span>
      </div>
    </PanelFrame>
  );
}