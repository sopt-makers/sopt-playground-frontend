import { Meta, StoryObj } from '@storybook/react';

import CheckBoxGroup from './index';

const meta = {
  component: CheckBoxGroup,
} satisfies Meta<typeof CheckBoxGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    checkBoxGroup: [
      { label: '질문글', checked: true },
      { label: '익명', checked: false },
    ],
  },
} satisfies Story;
