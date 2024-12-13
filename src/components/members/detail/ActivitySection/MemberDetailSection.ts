import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const MemberDetailSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 20px;
  background: ${colors.gray900};
  padding: 40px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
    border-radius: 18px;
    padding: 30px 20px;
  }
`;

export default MemberDetailSection;
