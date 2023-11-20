import { Meta, StoryObj } from '@storybook/react';

import CodeUploadButton from './index';

const meta = {
  component: CodeUploadButton,
} satisfies Meta<typeof CodeUploadButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
