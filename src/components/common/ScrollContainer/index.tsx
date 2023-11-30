import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { colors } from '@sopt-makers/colors';
import { forwardRef, ReactNode } from 'react';

interface Props {
  className?: string;
  isHorizontalScrollDisabled?: boolean;
  children: ReactNode;
}

const ScrollContainer = forwardRef<HTMLDivElement, Props>(
  ({ className, children, isHorizontalScrollDisabled = false }, ref) => {
    return (
      <ScrollRoot type='hover' ref={ref} className={className}>
        <ScrollViewport isHorizontalScrollDisabled={isHorizontalScrollDisabled}>{children}</ScrollViewport>
        <Scrollbar orientation='vertical'>
          <ScrollbarThumb />
        </Scrollbar>
        <Scrollbar orientation='horizontal'>
          <ScrollbarThumb />
        </Scrollbar>
        <ScrollbarCorner />
      </ScrollRoot>
    );
  },
);

export default ScrollContainer;

const ScrollRoot = styled(ScrollArea.Root)`
  position: relative;
`;

const ScrollViewport = styled(ScrollArea.Viewport)<{ isHorizontalScrollDisabled: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  ${({ isHorizontalScrollDisabled }) =>
    isHorizontalScrollDisabled &&
    css`
      /* MEMO: @radix-ui/react-scroll-area 내부 inline style을 덮어쓰기 위해 important 사용 */
      overflow-x: hidden !important;
    `};
`;

const SCROLLBAR_SIZE = '8px';

const Scrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  transition: background-color 160ms ease-out;
  background-color: ${colors.gray800};
  padding: 2;
  user-select: none;
  touch-action: none;

  &:hover {
    background-color: ${colors.gray700};
  }

  &[data-orientation='vertical'] {
    width: ${SCROLLBAR_SIZE};
  }

  &[data-orientation='horizontal'] {
    flex-direction: column;
    height: ${SCROLLBAR_SIZE};
  }
`;

const ScrollbarThumb = styled(ScrollArea.Thumb)`
  position: relative;
  flex: 1;
  border-radius: 5px;
  background-color: ${colors.gray400};

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    min-width: 44;
    height: 100%;
    min-height: 44;
    content: '';
  }
`;

const ScrollbarCorner = styled.div`
  background-color: ${colors.gray700};
`;
