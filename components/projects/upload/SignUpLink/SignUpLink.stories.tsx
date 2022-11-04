import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignUpLink from '@/components/projects/upload/SignUpLink';

export default {
  component: SignUpLink,
} as ComponentMeta<typeof SignUpLink>;

const Template: ComponentStory<typeof SignUpLink> = (args) => <SignUpLink {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
