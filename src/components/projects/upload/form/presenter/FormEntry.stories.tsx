import { Meta } from '@storybook/react';

import FormEntry from '@/components/projects/upload/form/presenter/FormEntry';

export default {
  component: FormEntry,
} as Meta<typeof FormEntry>;

export const Basic = {
  args: {
    title: '폼 항목 제목',
    required: true,
    comment: '부가 정보',
    description: '설명설명',
    children: '칠드런칠드런',
  },
};
