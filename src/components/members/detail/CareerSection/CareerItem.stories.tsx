import { Meta } from '@storybook/react';

import CareerItem from '@/components/members/detail/CareerSection/CareerItem';

export default {
  component: CareerItem,
} as Meta<typeof CareerItem>;

export const Default = {
  args: {
    career: {
      companyName: '당근마켓',
      isCurrent: false,
      title: 'FE Developer',
      startDate: '2023-03',
      endDate: '2023-04',
    },
  },

  name: '기본',
};

export const Current = {
  args: {
    career: { companyName: 'LINE PLUS', isCurrent: true, title: 'FE Developer', startDate: '2023-03', endDate: null },
  },

  name: '재직 중',
};
