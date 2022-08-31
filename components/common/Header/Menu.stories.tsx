import { ComponentMeta, ComponentStory } from '@storybook/react';
import Menu from './Menu';

export default {
  component: Menu,
  parameters: {
    nextRouter: {
      pathname: '/',
    },
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
