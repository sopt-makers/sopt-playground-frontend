import { ComponentMeta, Story } from '@storybook/react';
import Checkbox from 'components/common/checkbox';

export default {
  components: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Basic: Story = () => <Checkbox />;
Basic.storyName = '기본';
