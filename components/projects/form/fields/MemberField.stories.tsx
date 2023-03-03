import { ComponentMeta, ComponentStory } from '@storybook/react';

import MemberField from './MemberField';

export default {
  component: MemberField,
} as ComponentMeta<typeof MemberField>;

const Template: ComponentStory<typeof MemberField> = (args) => <MemberField {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
