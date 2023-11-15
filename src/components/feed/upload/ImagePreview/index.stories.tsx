import { Meta, StoryObj } from '@storybook/react';

import ImagePreview from './index';
import index from './index';

const meta = {
  component: ImagePreview,
} satisfies Meta<typeof index>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    images: [
      'https://item.kakaocdn.net/do/22b3b5f6c65114f383f5986c98828993616b58f7bf017e58d417ccb3283deeb3',
      'https://user-images.githubusercontent.com/26808056/198195477-82df28fe-acb7-46b4-be0f-0610c62a8a72.png',
      'https://user-images.githubusercontent.com/26808056/198195477-82df28fe-acb7-46b4-be0f-0610c62a8a72.png',
      'https://user-images.githubusercontent.com/26808056/198195477-82df28fe-acb7-46b4-be0f-0610c62a8a72.png',
    ],
    onRemove: () => {
      //
    },
  },
} satisfies Story;
