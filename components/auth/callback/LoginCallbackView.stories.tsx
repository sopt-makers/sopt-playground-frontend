import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoginCallbackView from '@/components/auth/callback/LoginCallbackView';

export default {
  component: LoginCallbackView,
} as ComponentMeta<typeof LoginCallbackView>;

const Template: ComponentStory<typeof LoginCallbackView> = (args) => <LoginCallbackView {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  mode: {
    type: 'loading',
  },
};

export const Error = Template.bind({});
Error.args = {
  mode: {
    type: 'error',
    errorMessage: '에러가 발생했습니다.',
  },
};
