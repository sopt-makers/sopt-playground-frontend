import { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, http } from 'msw';

import Example, { API_PATH } from '@/components/common/Example';

const random = { message: 'https://images.dog.ceo/breeds/spaniel-irish/n02102973_377.jpg', status: 'success' };

export default {
  component: Example,
} as Meta;

export const Default: StoryObj = {
  render: () => <Example />,
  name: 'msw 예시',

  parameters: {
    msw: {
      handlers: [
        http.get(API_PATH, () => {
          return HttpResponse.json({ data: random });
        }),
      ],
    },
  },
};
