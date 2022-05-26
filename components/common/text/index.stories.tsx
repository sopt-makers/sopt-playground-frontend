import { ComponentMeta, ComponentStory } from '@storybook/react';
import Text from '.';

export default {
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '텍스트',
};
Default.storyName = '기본';
