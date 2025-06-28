import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import VoteModal from '@/components/feed/upload/voteModal';

const meta: Meta<typeof VoteModal> = {
  component: VoteModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VoteModal>;

const VoteModalStory = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [options, setOptions] = useState(['옵션 1', '옵션 2']);
  const [isMultiple, setIsMultiple] = useState(false);

  const handleSave = (newOptions: string[], newIsMultiple: boolean) => {
    setOptions(newOptions);
    setIsMultiple(newIsMultiple);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      <VoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        options={options}
        isMultiple={isMultiple}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <VoteModalStory />,
};
