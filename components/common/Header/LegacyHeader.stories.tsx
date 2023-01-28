import { ComponentMeta, ComponentStory } from '@storybook/react';

import LegacyHeader from '@/components/common/Header/LegacyHeader';

export default {
  component: LegacyHeader,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof LegacyHeader>;

const Template: ComponentStory<typeof LegacyHeader> = (args) => <LegacyHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = '기본';
