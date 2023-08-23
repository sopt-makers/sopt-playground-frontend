import { Meta, StoryObj } from '@storybook/react';

import ProjectImageSlider from './ProjectImageSlider';

const meta = {
  component: ProjectImageSlider,
} satisfies Meta<typeof ProjectImageSlider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    images: [
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/6f430b88-789d-4f53-a4f9-d73f52d5bece-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-05-29%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.25.07.png',
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/4de22757-9817-4cbb-8e0d-6f44906cd3a7-%E1%84%82%E1%85%A2%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%80%E1%85%A1%E1%84%8B%E1%85%A5%E1%84%84%E1%85%A2%E1%84%89%E1%85%A5%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpeg',
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/4f7e9c3c-bd49-4468-a461-8a93afa703d1-%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8.png',
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/82316793-ac2f-4094-8f38-98d466982a03-KakaoTalk_Photo_2023-05-27-14-43-58%20002.jpeg',
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/4527c3ac-c850-415d-a367-0074e9dd7e58-%EC%86%8C%EA%B0%9C%ED%8E%98%EC%9D%B4%EC%A7%803%20(4).png',
    ],
  },
} satisfies Story;
