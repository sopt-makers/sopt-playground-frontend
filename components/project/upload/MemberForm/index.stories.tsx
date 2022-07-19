import MemberForm from '@/components/project/upload/MemberForm';
import { ComponentMeta } from '@storybook/react';

export default {
  component: MemberForm,
} as ComponentMeta<typeof MemberForm>;

export const Default = () => {
  return <MemberForm name='members' />;
};

Default.storyName = '기본';
