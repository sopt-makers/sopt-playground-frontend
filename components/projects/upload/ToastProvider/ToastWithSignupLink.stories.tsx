import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignUpLink from '@/components/projects/upload/SignUpLink';
import { ToastProvider } from '@/components/projects/upload/ToastProvider';

const ToastWithSignUpLink = () => {
  return (
    <ToastProvider>
      <SignUpLink />
    </ToastProvider>
  );
};

export default {
  component: ToastWithSignUpLink,
} as ComponentMeta<typeof ToastWithSignUpLink>;

const Template: ComponentStory<typeof ToastWithSignUpLink> = () => <ToastWithSignUpLink />;

export const Default = Template.bind({});
Default.storyName = '기본';
