import { Meta, Story } from '@storybook/react';
import Example, { API_PATH } from '@/components/common/Example';
import { rest } from 'msw';

const random = { message: 'https://images.dog.ceo/breeds/spaniel-irish/n02102973_377.jpg', status: 'success' };

export default {
  component: Example,
} as Meta;

export const Default: Story = () => <Example />;
Default.storyName = 'msw 예시';
Default.parameters = {
  msw: {
    handlers: [
      rest.get(API_PATH, (_req, res, ctx) => {
        return res(ctx.json({ data: random }));
      }),
    ],
  },
};
