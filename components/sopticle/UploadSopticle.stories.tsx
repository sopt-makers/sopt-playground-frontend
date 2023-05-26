import { ComponentMeta, ComponentStory } from '@storybook/react';

import UploadSopticle from './UploadSopticle';

export default {
  component: UploadSopticle,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof UploadSopticle>;

const Template: ComponentStory<typeof UploadSopticle> = (args) => <UploadSopticle {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
