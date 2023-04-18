import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToastProvider from '@/components/common/Toast/providers/ToastProvider';
import MessageSection from '@/components/members/detail/MessageSection';
import { colors } from '@/styles/colors';

export default {
  component: MessageSection,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} as ComponentMeta<typeof MessageSection>;

const Template: ComponentStory<typeof MessageSection> = (args) => <MessageSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '남주영',
  email: 'njy1007@gmail.com',
  profileImage: (
    <div style={{ width: '171px', height: '171px', backgroundColor: colors.black60 }}>프로필 이미지 영역</div>
  ),
  memberId: '8',
};
Default.storyName = '기본';

export const NoMessage = Template.bind({});
NoMessage.args = {
  name: '남주영',
  email: '',
  profileImage: (
    <div style={{ width: '171px', height: '171px', backgroundColor: colors.black60 }}>프로필 이미지 영역</div>
  ),
  memberId: '8',
};
NoMessage.storyName = '이메일 없는 유저';
