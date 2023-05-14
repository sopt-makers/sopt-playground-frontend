import { ComponentMeta } from '@storybook/react';

import MemberListFilterSheet from './MemberListFilterSheet';

export default {
  component: MemberListFilterSheet,
} as ComponentMeta<typeof MemberListFilterSheet>;

export const Default = () => {
  return (
    <MemberListFilterSheet>
      <MemberListFilterSheet.Trigger />
      <MemberListFilterSheet.Sheet />
    </MemberListFilterSheet>
  );
};
