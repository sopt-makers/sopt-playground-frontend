import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToastEntry from '@/components/common/Toast/ToastEntry';

export default {
  components: ToastEntry,
} as ComponentMeta<typeof ToastEntry>;

const Template: ComponentStory<typeof ToastEntry> = (args) => <ToastEntry {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '링크 복사 완료',
  message: '링크가 클립보드에 저장되었습니다.',
};
