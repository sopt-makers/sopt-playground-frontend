import { ComponentMeta, ComponentStory } from '@storybook/react';

import VerifyFrame from './VerifyFrame';

export default {
  component: VerifyFrame,
  parameters: {},
  decorators: [],
  argTypes: {
    byPhone: { control: false },
    byEmail: { control: false },
  },
} as ComponentMeta<typeof VerifyFrame>;

const Template: ComponentStory<typeof VerifyFrame> = (args) => <VerifyFrame {...args} />;

export const Default = Template.bind({});
Default.args = {
  byPhone: <div style={{ backgroundColor: '#a9d7b4', height: '100px' }}>byPhone</div>,
};
Default.storyName = '기본';
