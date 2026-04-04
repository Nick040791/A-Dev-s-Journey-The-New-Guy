import { mentorByView } from '@/mocks/shell-data';
import type { AiMentorLayer } from '@/shared/types/module-contracts';
import type { ShellView } from '@/shared/types/shell';

export const mockAiMentor: AiMentorLayer = {
  getStatus() {
    return {
      name: 'AI Mentor / Roleplay Layer',
      state: 'mocked',
      summary: 'Guidance cards are static. No local model loop or memory implemented.',
    };
  },
  getMentorSnapshot(view: ShellView) {
    return mentorByView[view];
  },
};