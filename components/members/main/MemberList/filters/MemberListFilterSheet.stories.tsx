import { ComponentMeta, ComponentStory } from '@storybook/react';

import MemberListFilterSheet from './MemberListFilterSheet';

export default {
  component: MemberListFilterSheet,
} as ComponentMeta<typeof MemberListFilterSheet>;

const Template: ComponentStory<typeof MemberListFilterSheet> = (args) => <MemberListFilterSheet {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
