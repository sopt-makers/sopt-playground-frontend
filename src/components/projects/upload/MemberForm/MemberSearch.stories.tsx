import styled from '@emotion/styled';
import { Meta } from '@storybook/react';

import MemberSearch from './MemberSearch';

export default {
  component: MemberSearch,
  decorators: [
    (Story) => (
      <StyledContainer>
        <Story />
      </StyledContainer>
    ),
  ],
} as Meta<typeof MemberSearch>;

export const Default = {
  args: {
    members: [
      { generation: 27, name: '이준호', id: 1, hasProfile: true, profileImage: '' },
      { generation: 27, name: '이준호', id: 1, hasProfile: true, profileImage: '' },
      { generation: 27, name: '이준호', id: 1, hasProfile: true, profileImage: '' },
    ],
  },

  name: '기본',
};

const StyledContainer = styled.div`
  width: 163px;
`;
