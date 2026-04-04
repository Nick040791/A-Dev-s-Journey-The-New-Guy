import { chatMessages, teamRoster } from '@/mocks/shell-data';
import type { ConversationEngine } from '@/shared/types/module-contracts';

export const mockConversationEngine: ConversationEngine = {
  getStatus() {
    return {
      name: 'Team Chat / Conversation Engine',
      state: 'mocked',
      summary: 'Roster and message payloads are fake; no model transport or memory.',
    };
  },
  getConversationSnapshot() {
    return {
      roster: teamRoster,
      messages: chatMessages,
      inputPlaceholder: 'Conversation engine stubbed until local model integration arrives.',
    };
  },
};