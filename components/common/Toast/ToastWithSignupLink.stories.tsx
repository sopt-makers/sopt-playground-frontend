import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignUpLink from '@/components/projects/upload/SignUpLink';

const ToastWithSignUpLink = () => {
  return <SignUpLink />;
};

export default {
  component: ToastWithSignUpLink,
} as ComponentMeta<typeof ToastWithSignUpLink>;

const Template: ComponentStory<typeof ToastWithSignUpLink> = () => <ToastWithSignUpLink />;

export const Default = Template.bind({});
Default.storyName = '기본';
