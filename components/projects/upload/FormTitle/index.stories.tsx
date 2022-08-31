import { ComponentMeta, ComponentStory } from '@storybook/react';
import FormTitle from '@/components/projects/upload/FormTitle';

export default {
  component: FormTitle,
} as ComponentMeta<typeof FormTitle>;

const Template: ComponentStory<typeof FormTitle> = (args) => <FormTitle {...args} />;

export const 기본 = Template.bind({});
기본.args = {
  children: '타이틀',
};

export const 필수사항 = Template.bind({});
필수사항.args = {
  children: '필수사항',
  essential: true,
};
