import { Meta } from '@storybook/react';

import ReportTitle from '.';

export default {
  component: ReportTitle,
} as Meta<typeof ReportTitle>;

export const Default = {
  render: function Rendered() {
    return <ReportTitle color={'orange400'} subTitle='차곡차곡 쌓인 솝트의 기록들' title='2024년 SOPT는' />;
  },

  args: {},
  name: '기본',
};
