import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToastProvider from '@/components/common/Toast/providers/ToastProvider';
import SignUpLink from '@/components/projects/upload/SignUpLink';

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
