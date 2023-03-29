import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import Select from '@/components/members/common/select/Select';
import { GENERATIONS } from '@/constants/generation';

export default {
  component: Select,
} as ComponentMeta<typeof Select>;

export const Template: ComponentStory<typeof Select> = (args) => {
  return (
    <Select placeholder='기수 선택' {...args}>
      {GENERATIONS.map((generation) => (
        <Select.Item key={generation} value={generation}>
          {`${generation} 기`}
        </Select.Item>
      ))}
    </Select>
  );
};

export const Error = Template.bind({});
Error.args = {
  error: true,
};

export const WithState = () => {
  const [value, setValue] = useState<string>();

  const onSelect = (value: string) => {
    setValue(value);
  };
  const onClear = () => {
    setValue(undefined);
  };

  return (
    <Select placeholder='기수 선택' value={value} onChange={(value) => onSelect(value)} allowClear onClear={onClear}>
      {GENERATIONS.map((generation) => (
        <Select.Item key={generation} value={generation}>
          {`${generation} 기`}
        </Select.Item>
      ))}
    </Select>
  );
};
