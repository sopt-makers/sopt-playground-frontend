import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { fontsObject } from '@sopt-makers/fonts';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export { default as ModalButton } from './ModalButton';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const ModalTitle = styled.h1`
  margin-bottom: 12px;
  line-height: 24px;

  ${fontsObject.TITLE_4_20_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fontsObject.TITLE_4_20_SB}
  }
`;

export const ModalDescription = styled.div`
  ${textStyles.SUIT_14_R};
`;

export const ModalFooter = styled.div<{ align: 'left' | 'right' | 'stretch'; stack?: 'horizontal' | 'vertical' }>`
  display: grid;
  margin-top: 24px;

  ${(props) =>
    props.stack !== 'vertical' &&
    css`
      grid-auto-flow: column;
      column-gap: 8px;
    `}

  ${(props) =>
    props.align === 'stretch' &&
    css`
      grid-auto-columns: minmax(10px, 1fr);
    `}
  ${(props) =>
    props.align === 'left' &&
    css`
      grid-auto-columns: max-content;
    `}
    ${(props) =>
    props.align === 'right' &&
    css`
      grid-auto-columns: max-content;
      justify-content: end;
    `}

    @media ${MOBILE_MEDIA_QUERY} {
    grid-auto-columns: minmax(10px, 1fr);
  }
`;
