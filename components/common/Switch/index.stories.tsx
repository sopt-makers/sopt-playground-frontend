import { Meta, Story } from '@storybook/react';
import Switch from 'components/common/Switch';

export default {
  component: Switch,
} as Meta;

const Template: Story = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
