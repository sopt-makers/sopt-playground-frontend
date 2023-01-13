import { ComponentMeta, ComponentStory } from '@storybook/react';

import MemberBlock from '@/components/members/detail/MemberBlock';

export default {
  component: MemberBlock,
} as ComponentMeta<typeof MemberBlock>;

const Template: ComponentStory<typeof MemberBlock> = (args) => <MemberBlock {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  name: '박건영',
  position: '프론트엔드 개발자',
  imageUrl: 'https://dummyimage.com/300x300/262d90/ffffff&text=T',
  badges: ['29기', '메이커스'],
};
Basic.storyName = '기본';

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  name: '박건영',
  position: '프론트엔드 개발자',
};
WithoutImage.storyName = '이미지 없음';
