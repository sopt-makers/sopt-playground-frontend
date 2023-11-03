import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const VerifySubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s background-color, 0.2s color;
  border-radius: 10px;
  padding: 0 14px;
  height: 48px;

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }

  ${(props) =>
    props.disabled
      ? css`
          background-color: ${colors.gray800};
          cursor: default;
          color: ${colors.gray300};
        `
      : css`
          background-color: ${colors.gray10};
          cursor: pointer;
          color: ${colors.gray950};
        `}
`;
export default VerifySubmitButton;
