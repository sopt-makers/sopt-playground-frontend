import MemberForm from '@/components/project/upload/MemberForm';
import useMemberForm from '@/components/project/upload/MemberForm/useMemberForm';
import { ComponentMeta } from '@storybook/react';

export default {
  component: MemberForm,
} as ComponentMeta<typeof MemberForm>;

export const Default = () => {
  const props = useMemberForm();
  return <MemberForm {...props} />;
};

Default.storyName = '기본';
