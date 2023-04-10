import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LINK_TITLES } from '@/components/members/upload/constants';
import MemberSelectOptions from '@/components/members/upload/forms/SelectOptions';

import EditableSelect from './EditableSelect';

export default {
  component: EditableSelect,
} as ComponentMeta<typeof EditableSelect>;

const Template: ComponentStory<typeof EditableSelect> = (args) => (
  <EditableSelect {...args}>
    <MemberSelectOptions options={LINK_TITLES} />
  </EditableSelect>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: '입력하기',
};
Default.storyName = '기본';
