import styled from '@emotion/styled';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const MemberDetailSection = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background: #1c1d1e;
  padding: 40px;
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 18px;
    padding: 30px 20px;
  }
`;

export default MemberDetailSection;
