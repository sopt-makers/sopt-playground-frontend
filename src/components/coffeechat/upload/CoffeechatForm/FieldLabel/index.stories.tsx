import FieldLabel from '@/components/coffeechat/upload/CoffeechatForm/FieldLabel';
import { Meta } from '@storybook/react';

export default {
  component: FieldLabel,
} as Meta<typeof FieldLabel>;

export const Default = {
  args: {
    label: '경력',
    description: '정규직으로 근무한 경력을 기준으로 선택해주세요',
    essential: true,
  },

  name: 'FieldLabel',
};
