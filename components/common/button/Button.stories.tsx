import { ComponentMeta, Story } from '@storybook/react';
import Button from 'components/common/button/Button';

export default {
  title: 'components/버튼',
  components: Button,
} as ComponentMeta<typeof Button>;

export const Basic: Story = () => <Button />;
Basic.storyName = '기본';
