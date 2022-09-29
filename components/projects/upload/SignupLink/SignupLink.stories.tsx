import { ComponentMeta, ComponentStory } from '@storybook/react';
import SignupLink from '@/components/projects/upload/SignupLink';

export default {
  component: SignupLink,
} as ComponentMeta<typeof SignupLink>;

const Template: ComponentStory<typeof SignupLink> = (args) => <SignupLink {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
