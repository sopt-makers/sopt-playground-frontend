import { ComponentMeta, ComponentStory } from '@storybook/react';

import UploadBlog from './UploadBlog';

export default {
  component: UploadBlog,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof UploadBlog>;

const Template: ComponentStory<typeof UploadBlog> = (args) => <UploadBlog {...args} />;

export const Default = Template.bind({});
Default.args = {
  state: 'idle',
};

export const Loading = Template.bind({});
Loading.args = {
  state: 'pending',
};

export const Error = Template.bind({});
Error.args = {
  state: 'error',
  errorMessage: '에러메시지',
};
