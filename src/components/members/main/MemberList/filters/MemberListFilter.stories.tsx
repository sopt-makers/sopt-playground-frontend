import { Meta } from '@storybook/react';

import { GENERATION_DEFAULT_OPTION, GENERATION_OPTIONS } from '@/components/members/main/MemberList/filters/constants';

import MemberListFilter from './MemberListFilter';

export default {
  component: MemberListFilter,
} as Meta<typeof MemberListFilter>;

export const Default = {
  args: {
    defaultOption: GENERATION_DEFAULT_OPTION,
    options: GENERATION_OPTIONS,
    placeholder: '기수',
  },

  name: '기본',
};
