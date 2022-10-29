import styled from '@emotion/styled';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export const MemberFormSection = styled.section`
  border-radius: 30px;
  background-color: ${colors.black80};
  padding: 40px 40px 60px;

  input {
    border-radius: 14px;
    padding: 14.5px 20px;

    &::placeholder {
      color: ${colors.gray80};
    }

    @media ${MOBILE_MEDIA_QUERY} {
      border-radius: 12px;
      border-color: ${colors.black80};
      background-color: ${colors.black80};
    }
  }

  textarea {
    padding: 16px 20px;
    height: 128px;

    &::placeholder {
      color: ${colors.gray80};
    }

    @media ${MOBILE_MEDIA_QUERY} {
      border-radius: 12px;
      border-color: ${colors.black80};
      background-color: ${colors.black80};
    }
  }

  label {
    padding: 16px 34px 16px 20px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: initial;
    padding: 0;
  }
`;
