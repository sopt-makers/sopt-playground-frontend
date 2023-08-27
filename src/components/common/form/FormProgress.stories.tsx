import { Meta } from '@storybook/react';

import FormProgress from '@/components/common/form/FormProgress';

export default {
  component: FormProgress,
} as Meta<typeof FormProgress>;

export const Basic = {
  args: {
    title: '등록 진행',
    progressLabel: '프로젝트를 등록해주세요.',
    items: [
      { title: '항목 1' },
      { title: '항목 2', required: false, active: true },
      { title: '항목 3', required: true },
      { title: '항목 4', required: true, active: true },
    ],
  },
};
