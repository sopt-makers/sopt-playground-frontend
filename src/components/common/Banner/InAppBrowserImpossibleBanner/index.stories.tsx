import { Meta } from '@storybook/react';

import InAppBrowserImpossibleBanner from '@/components/common/Banner/InAppBrowserImpossibleBanner';

export default {
  component: InAppBrowserImpossibleBanner,
} as Meta<typeof InAppBrowserImpossibleBanner>;

export const Default = {
  render: function Render() {
    return <InAppBrowserImpossibleBanner />;
  },

  name: '기본',
};
