import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from 'components/common/button/Button';

export default {
  title: 'components/Button',
  components: Button,
} as ComponentMeta<typeof Button>;

export const Basic = () => <Button />;
