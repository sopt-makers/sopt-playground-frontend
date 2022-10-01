import { ComponentMeta, Story } from '@storybook/react';
import { useState } from 'react';

import Checkbox from '@/components/common/Checkbox';

export default {
  components: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Basic: Story = () => {
  const [checked, onChange] = useState<boolean>(false);
  return <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />;
};
Basic.storyName = '기본';
