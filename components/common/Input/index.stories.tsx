import { Meta } from '@storybook/react';

import Input from '@/components/common/Input';

export default {
  component: Input,
} as Meta<typeof Input>;

export const Basic = {
  name: '기본',

  args: {
    count: false,
    maxCount: 10,
    error: false,
    errorMessage: '',
    placeholder: '프로젝트 소개',
  },
};

export const Count = {
  args: {
    count: true,
    maxCount: 30,
  },

  name: '카운트',
};

export const Error = {
  args: {
    error: true,
  },

  name: '에러',
};

export const ErrorWithMessage = {
  args: {
    errorMessage: '오류가 발생했습니다.',
    placeholder: '프로젝트 소개',
  },

  name: '에러 + 메시지',
};
