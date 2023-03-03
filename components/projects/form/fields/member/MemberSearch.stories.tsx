import { ComponentMeta, ComponentStory } from '@storybook/react';

import MemberSearch from './MemberSearch';

export default {
  component: MemberSearch,
} as ComponentMeta<typeof MemberSearch>;

const Template: ComponentStory<typeof MemberSearch> = (args) => <MemberSearch {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
