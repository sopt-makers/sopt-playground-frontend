import { ComponentMeta, ComponentStory } from '@storybook/react';

import RawPersonBlock from '@/components/makers/RawPersonBlock';

export default {
  component: RawPersonBlock,
} as ComponentMeta<typeof RawPersonBlock>;

const Template: ComponentStory<typeof RawPersonBlock> = (args) => <RawPersonBlock {...args} />;

export const WithImage = Template.bind({});
WithImage.args = {
  name: '박건영',
  position: '프론트엔드 개발자',
  imageUrl: 'https://dummyimage.com/300x300/262d90/ffffff&text=T',
};
WithImage.storyName = '이미지 있음';

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  name: '박건영',
  position: '프론트엔드 개발자',
};
WithoutImage.storyName = '이미지 없음';
