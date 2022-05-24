import { ComponentMeta, Story } from '@storybook/react';
import Select from 'components/common/select';

export default {
  components: Select,
} as ComponentMeta<typeof Select>;

export const Basic: Story = () => {
  return (
    <Select placeholder='선택'>
      <option></option>
    </Select>
  );
};
Basic.storyName = '기본';
