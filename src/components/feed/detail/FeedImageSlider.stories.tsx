import { Meta, StoryObj } from '@storybook/react';

import FeedImageSlider from './FeedImageSlider';

const meta = {
  component: FeedImageSlider,
} satisfies Meta<typeof FeedImageSlider>;
export default meta;

type Story = StoryObj<typeof meta>;

const 큰당근 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/2fb4be81-dd91-4992-bf87-67dc62a75b7b';
const 노트북당근 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/33e150c1-e8f9-4d02-bf32-1fe1f1e7cc8b';

export const Default = {
  args: {
    opened: true,
    onClose: () => {
      //
    },
    images: [큰당근, 노트북당근, 큰당근],
  },
} satisfies Story;
