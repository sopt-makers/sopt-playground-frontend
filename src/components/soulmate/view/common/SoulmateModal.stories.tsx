import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import SoulmateModal from './SoulmateModal';

const meta = {
  component: SoulmateModal,
} satisfies Meta<typeof SoulmateModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setOpen(true)}>Open</button>
        <SoulmateModal open={open} onOpenChange={(v) => setOpen(v)} {...args}>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </SoulmateModal>
      </div>
    );
  },
} satisfies Story;
