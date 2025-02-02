import ReportNav from '@/components/mySoptReport/ReportNav';
import { Meta } from '@storybook/react';

export default {
  component: ReportNav,
} as Meta<typeof ReportNav>;

export const Default = {
  render: function Rendered() {
    return <ReportNav activeTab={'sopt'} handleSetActive={() => {}} />;
  },

  args: {},
  name: '기본',
};
