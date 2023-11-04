import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

  ${textStyles.SUIT_18_B}
`;

export const ModalDescription = styled.div`
  ${textStyles.SUIT_14_R};
`;

export const ModalFooter = styled.div<{ align: 'left' | 'right' | 'stretch' }>`
  display: grid;
  grid-auto-flow: column;
  column-gap: 8px;
  margin-top: 24px;

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
`;
