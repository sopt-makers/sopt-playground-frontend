import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextArea from '@/components/common/TextArea';

export default {
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '프로젝트에 대해 설명해주세요',
};
Default.storyName = '기본';
