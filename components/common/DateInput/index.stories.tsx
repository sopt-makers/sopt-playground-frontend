import { ComponentMeta, ComponentStory } from '@storybook/react';
import DateInput from '@/components/common/DateInput';

export default {
  component: DateInput,
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
