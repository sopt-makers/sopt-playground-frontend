import { ComponentMeta, ComponentStory } from '@storybook/react';

import ErrorMessage from '@/components/projects/form/presenter/ErrorMessage';

export default {
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => <ErrorMessage {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  message: '에러가 발생했습니다.',
};

export const NoMessage = Template.bind({});
NoMessage.args = {
  message: undefined,
};
