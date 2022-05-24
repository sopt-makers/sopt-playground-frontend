import { ComponentMeta, Story } from '@storybook/react';
import Input from 'components/common/input';

export default {
  components: Input,
} as ComponentMeta<typeof Input>;

export const Basic: Story = () => <Input placeholder='프로젝트 이름' />;
Basic.storyName = '기본';
