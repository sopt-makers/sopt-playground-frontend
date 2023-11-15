import { Meta, StoryObj } from '@storybook/react';
import { createRef } from 'react';

import ResponsiveProvider from '@/components/common/Responsive/ResponsiveProvider';

import ImageUploadButton from './index';

const meta = {
  component: ImageUploadButton,
  decorators: [
    (Story) => {
      return (
        <ResponsiveProvider>
          <Story />
        </ResponsiveProvider>
      );
    },
  ],
} satisfies Meta<typeof ImageUploadButton>;
export default meta;

type Story = StoryObj<typeof meta>;

const imageRef = createRef<HTMLInputElement>();

export const Default = {
  args: {
    imageInputRef: imageRef,
    imageLength: 0,
    onClick: () => {
      //
    },
  },
} satisfies Story;

export const Uploaded = {
  args: {
    imageInputRef: imageRef,
    imageLength: 5,
    onClick: () => {
      //
    },
  },
} satisfies Story;
