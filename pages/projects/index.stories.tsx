import { ComponentMeta, ComponentStory } from '@storybook/react';
import { graphql, rest } from 'msw';
import ProjectPage from '.';

export default {
  parameters: {
    msw: {
      handlers: [
        // https://mswjs.io/docs/api/rest
        rest.get('https://localhost:4200/api/*', (req, res, ctx) => res(ctx.json({ is_test: true }))),
        rest.post('https://localhost:4200/api/*', (req, res, ctx) => res(ctx.status(200))),
      ],
    },
  },
} as ComponentMeta<typeof ProjectPage>;

const Template: ComponentStory<typeof ProjectPage> = (args) => <ProjectPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
