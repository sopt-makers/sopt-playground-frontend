import { ComponentMeta, Story } from '@storybook/react';
import Select from 'components/common/select';

export default {
  components: Select,
} as ComponentMeta<typeof Select>;

const 기수 = [30, 29, 28, 27, 26, 25, 24];

export const Basic: Story = () => {
  return (
    <Select placeholder='선택'>
      {기수.map((item) => (
        <option key={item} value={item}>
          {`${item}기`}
        </option>
      ))}
    </Select>
  );
};
Basic.storyName = '기본';
