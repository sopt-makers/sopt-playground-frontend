import TextFieldLineBreak from '@/components/common/form/TextFieldLineBreak';
import { Meta } from '@storybook/react';

export default {
  component: TextFieldLineBreak,
} as Meta<typeof TextFieldLineBreak>;

export const Default = {
  args: {
    value: '',
    maxLength: 200,
    fixedHeight: 126,
    lineBreakPlaceholder: '• 직무 경험이나 관심 분야를 적어주면 더 좋아요!',
    isError: true,
    errorMessage: '에러 발생',
  },

  name: 'TextFieldLineBreak',
};
