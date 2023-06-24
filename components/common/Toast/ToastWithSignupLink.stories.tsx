import { Meta } from '@storybook/react';

import SignUpLink from '@/components/projects/upload/SignUpLink';

const ToastWithSignUpLink = () => {
  return <SignUpLink />;
};

export default {
  component: ToastWithSignUpLink,
} as Meta<typeof ToastWithSignUpLink>;

const Template: StoryFn<typeof ToastWithSignUpLink> = () => <ToastWithSignUpLink />;

export const Default = {
  render: Template,
  name: '기본',
};
