import { ComponentMeta, ComponentStory } from '@storybook/react';
import { formItems } from '@/components/project/upload/constants';
import UploadStatus from '@/components/project/upload/FormStatus';

export default {
  component: UploadStatus,
} as ComponentMeta<typeof UploadStatus>;

const Template: ComponentStory<typeof UploadStatus> = (args) => <UploadStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
  formItems,
};
Default.storyName = '기본';
