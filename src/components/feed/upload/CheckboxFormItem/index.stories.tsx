import { Meta } from '@storybook/react';
import { useState } from 'react';

import Checkbox from '@/components/common/Checkbox';
import CheckboxFormItem from '@/components/feed/upload/CheckboxFormItem';

const meta = {
  component: CheckboxFormItem,
} satisfies Meta<typeof CheckboxFormItem>;
export default meta;

export const Default = {
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <CheckboxFormItem label='질문글'>
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      </CheckboxFormItem>
    );
  },

  name: '기본',
};
