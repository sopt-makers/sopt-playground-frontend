import { Meta, StoryObj } from '@storybook/react';

import RegisterSuccessModal from './RegisterSuccessModal';

const meta = {
  component: RegisterSuccessModal,
} satisfies Meta<typeof RegisterSuccessModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    open: true,
  },
} satisfies Story;
