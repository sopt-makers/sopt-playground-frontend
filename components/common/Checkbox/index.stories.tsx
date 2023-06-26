import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Checkbox from '@/components/common/Checkbox';

export default {
  component: Checkbox,
} as Meta<typeof Checkbox>;

export const Basic: StoryObj = {
  render: function Render() {
    const [checked, onChange] = useState<boolean>(false);
    return <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />;
  },

  name: '기본',
};
