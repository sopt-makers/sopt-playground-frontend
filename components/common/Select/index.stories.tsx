import { Meta, StoryObj } from '@storybook/react';

import Select from '@/components/common/Select';

export default {
  component: Select,
} as Meta<typeof Select>;

const 기수 = [30, 29, 28, 27, 26, 25, 24];

export const Basic: StoryObj = {
  render: () => {
    return (
      <Select placeholder='선택'>
        {기수.map((item) => (
          <option key={item} value={item}>
            {`${item}기`}
          </option>
        ))}
      </Select>
    );
  },

  name: '기본',
};
