import { Meta } from '@storybook/react';

import SignUpLink from '@/components/projects/upload/SignUpLink';

const ToastWithSignUpLink = () => {
  return <SignUpLink />;
};

export default {
  component: ToastWithSignUpLink,
} as Meta<typeof ToastWithSignUpLink>;

export const Default = {
  name: '기본',
};
