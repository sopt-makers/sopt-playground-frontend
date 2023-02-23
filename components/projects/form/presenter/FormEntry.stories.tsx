import { ComponentMeta, ComponentStory } from '@storybook/react';

import FormEntry from '@/components/projects/form/presenter/FormEntry';

export default {
  component: FormEntry,
} as ComponentMeta<typeof FormEntry>;

const Template: ComponentStory<typeof FormEntry> = (args) => <FormEntry {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: '폼 항목 제목',
  required: true,
  comment: '부가 정보',
  description: '설명설명',
  children: '칠드런칠드런',
};
