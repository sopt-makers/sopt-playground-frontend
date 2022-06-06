import { ComponentMeta, Story } from '@storybook/react';
import Checkbox from 'components/common/checkbox';
import { useState } from 'react';

export default {
  components: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Basic: Story = () => {
  const [checked, onChange] = useState<boolean>(false);
  return <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />;
};
Basic.storyName = '기본';
