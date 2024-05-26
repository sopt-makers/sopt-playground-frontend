import { Meta } from '@storybook/react';

import InterestSection from '.';

export default {
  component: InterestSection,
} as Meta<typeof InterestSection>;

export const Default = {
  args: {
    mbti: {
      name: 'ESFJ',
      description: '남을 배려할 줄 아는 멋진 MBTI를 가졌어요.',
    },
    sojuCapacity: 10,
    interest: '코딩, 노래, 운동',
    balanceGame: {
      isPourSauceLover: true,
      isHardPeachLover: false,
      isMintChocoLover: true,
      isRedBeanFishBreadLover: null,
      isSojuLover: true,
      isRiceTteokLover: null,
    },
    selfIntroduction: '안녕하세요. 저는 코딩을 좋아하는 사람입니다.',
  },

  name: '기본',
};

export const Optional = {
  args: {
    mbti: {
      name: 'ESFJ',
    },
    sojuCapacity: 0,
    interest: '코딩, 노래, 운동',
    balanceGame: {
      isPourSauceLover: null,
      isHardPeachLover: null,
      isMintChocoLover: null,
      isRedBeanFishBreadLover: null,
      isSojuLover: null,
      isRiceTteokLover: null,
    },
  },

  name: '선택',
};
