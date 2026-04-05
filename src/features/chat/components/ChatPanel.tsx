import { Lock, MessageSquare } from 'lucide-react';

import { useModuleRegistry } from '@/app/providers/module-registry-context';
import { teamRoster } from '@/mocks/shell-data';
import type { CharacterAccent } from '@/shared/types/module-contracts';
import { cx } from '@/shared/lib/cx';

function msgBorderClass(speaker: string): string {
  const member = teamRoster.find((m) => m.name === speaker);
  return member ? `msg-border-${member.accent}` : '';
}

function speakerSprite(speaker: string): { col: number; accent: CharacterAccent } | null {
  const member = teamRoster.find((m) => m.name === speaker);
  if (!member) return null;
  return { col: (member as { spriteCol?: number }).spriteCol ?? 0, accent: member.accent };
}

export function ChatPanel() {
  const { conversationEngine } = useModuleRegistry();
  const snapshot = conversationEngine.getConversationSnapshot();

  return (
    <div className="flex h-full min-h-0 flex-col bg-(--surface-1) border-r border-(--panel-border)">
      <div className="panel-header">
        <div className="min-w-0">
          <span className="panel-eyebrow">TEAM CHAT</span>
          <div className="panel-heading-row">
            <h2 className="font-body text-[15px] font-semibold text-(--text-primary)">Squad Feed</h2>
          </div>
        </div>
      </div>

      {/* Roster strip */}
      <div className="chat-roster-list">
        {snapshot.roster.map((member) => {
          const accent = (member as { accent?: CharacterAccent }).accent ?? 'lime';
          const spriteCol = (member as { spriteCol?: number }).spriteCol;
          const initials = (member as { initials?: string }).initials ?? member.name.split(' ').map((p) => p[0]).join('');
          const isUrgent = member.status === 'urgent';

          return (
            <article
              className={cx('roster-card chat-roster-card', isUrgent && 'emergency-border')}
              key={member.name}
            >
              <div className={cx('roster-avatar', `avatar-ring-${accent}`)}>
                {spriteCol != null ? (
                  <div className={`avatar-portrait avatar-col-${spriteCol}`} />
                ) : (
                  <div className={cx('roster-avatar', `avatar-${accent}`)}>{initials}</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="chat-roster-header">
                  <p className="truncate font-body text-[15px] font-semibold text-(--text-primary)">{member.name}</p>
                  <span className={cx(
                    'shell-chip text-[12px]',
                    member.status === 'online' && 'text-(--success)',
                    member.status === 'urgent' && 'text-(--danger)',
                    member.status === 'watching' && 'text-(--warning)',
                    member.status === 'ready' && 'text-(--accent)',
                    member.status === 'committing' && 'text-(--accent-violet)',
                  )}>
                    {member.status}
                  </span>
                </div>
                <p className="text-[12px] font-body uppercase tracking-[0.16em] text-(--text-dim)">{member.role}</p>
                <p className="chat-roster-focus font-body text-[14px] text-(--text-muted)">{member.focus}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Message list */}
      <div className="min-h-0 flex-1 overflow-y-auto shell-scroll">
        <div className="chat-message-list">
          {snapshot.messages.map((message) => {
            const sprite = speakerSprite(message.speaker);
            return (
              <article
                className={cx('message-card chat-message-card', msgBorderClass(message.speaker))}
                key={message.id}
              >
                <div className="flex items-start gap-2">
                  {sprite && (
                    <div className={cx('roster-avatar flex-shrink-0', `avatar-ring-${sprite.accent}`)}>
                      <div className={`avatar-portrait avatar-col-${sprite.col}`} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-body text-[15px] font-semibold text-(--text-primary)">{message.speaker}</p>
                        <p className="font-body text-[12px] uppercase tracking-[0.16em] text-(--text-dim)">{message.role}</p>
                      </div>
                      <span className="font-body text-[13px] text-(--text-dim)">{message.timestamp}</span>
                    </div>
                    <p className="chat-message-body font-chat text-[14px] text-(--text-muted)">{message.body}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Compose (locked until Module 02) */}
      <div className="chat-compose" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
        <Lock className="h-3 w-3 flex-shrink-0 text-(--text-dim)" />
        <span className="truncate font-body text-[14px] text-(--text-dim)">Chat unlocks in Module 02</span>
      </div>
    </div>
  );
}