import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GENERATION_DEFAULT_OPTION, GENERATION_OPTIONS } from '@/components/members/main/MemberList/filters/constants';

import MemberListFilter from './MemberListFilter';

export default {
  component: MemberListFilter,
} as ComponentMeta<typeof MemberListFilter>;

const Template: ComponentStory<typeof MemberListFilter> = (args) => <MemberListFilter {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultOption: GENERATION_DEFAULT_OPTION,
  options: GENERATION_OPTIONS,
  placeholder: '기수',
};
Default.storyName = '기본';
