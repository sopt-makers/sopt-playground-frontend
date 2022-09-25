import { ComponentMeta, ComponentStory } from '@storybook/react';
import SignupLink from '@/components/projects/upload/SignupLink';
import { ToastProvider } from '@/components/projects/upload/ToastProvider';

const ToastWithSignupLink = () => {
  return (
    <ToastProvider>
      <SignupLink />
    </ToastProvider>
  );
};

export default {
  component: ToastWithSignupLink,
} as ComponentMeta<typeof ToastWithSignupLink>;

const Template: ComponentStory<typeof ToastWithSignupLink> = () => <ToastWithSignupLink />;

export const Default = Template.bind({});
Default.storyName = '기본';
