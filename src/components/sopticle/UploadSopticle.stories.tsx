import { ComponentMeta, ComponentStory } from '@storybook/react';

import UploadSopticle from './UploadSopticle';

export default {
  component: UploadSopticle,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof UploadSopticle>;

const Template: ComponentStory<typeof UploadSopticle> = (args) => <UploadSopticle {...args} />;

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
