import { ComponentMeta, ComponentStory } from '@storybook/react';
import { graphql, rest } from 'msw';
import Text from '.';

export default {
  component: Text,
  parameters: {
    msw: {
      handlers: [
        graphql.query('GraphQLQueryName', (req, res, ctx) => res(ctx.data({ result: { is_test: true } }))),
        graphql.mutation('GraphQLMutationName', (req, res, ctx) => res(ctx.data({ result: { is_test: true } }))),
        // https://mswjs.io/docs/api/rest
        rest.get('https://localhost:4200/api/*', (req, res, ctx) => res(ctx.json({ is_test: true }))),
        rest.post('https://localhost:4200/api/*', (req, res, ctx) => res(ctx.status(200))),
      ],
    },
  },
  decorators: [],
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = '기본';
