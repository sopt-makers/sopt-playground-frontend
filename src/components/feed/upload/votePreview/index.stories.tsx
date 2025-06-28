import { DialogProvider } from '@sopt-makers/ui';
import type { Meta, StoryObj } from '@storybook/react';

import VotePreview from '@/components/feed/upload/votePreview';

const meta: Meta<typeof VotePreview> = {
  component: VotePreview,
  decorators: [
    (Story) => (
      <DialogProvider>
        <div style={{ width: '100%', background: '#1A1A1A', padding: '20px' }}>
          <Story />
        </div>
      </DialogProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VotePreview>;

export const Default: Story = {
  render: () => {
    return (
      <VotePreview
        onOpenVoteModal={() => console.log('수정 모달 열기')}
        resetVote={() => {
          console.log('투표 삭제');
        }}
        optionsLength={3}
        isMultiple={true}
        isDisable={false}
      />
    );
  },
};
