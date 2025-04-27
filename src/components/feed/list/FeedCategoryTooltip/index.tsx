import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconXClose } from '@sopt-makers/icons';
import React, { createContext, ReactNode } from 'react';

import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { zIndex } from '@/styles/zIndex';

const TooltipContext = createContext<{ top: number; left: number } | null>(null);
interface TooltipProps {
  tooltipPosition: { top: number; left: number };
  children: ReactNode;
}

const Tooltip = ({ tooltipPosition, children }: TooltipProps) => {
  return (
    <TooltipContext.Provider value={tooltipPosition}>
      <TooltipWrapper top={tooltipPosition.top} left={tooltipPosition.left}>
        <TooltipArrow />
        {children}
      </TooltipWrapper>
    </TooltipContext.Provider>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return <TooltipHeader>{children}</TooltipHeader>;
};
const Title = ({ children }: { children: ReactNode }) => {
  return <Text typography='SUIT_14_SB'>{children}</Text>;
};

const Content = ({ children }: { children: ReactNode }) => {
  return <TooltipContent>{children}</TooltipContent>;
};

const Close = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} aria-label='툴팁 오늘 하루동안 보지 않기' style={{ color: 'inherit' }}>
      <IconXClose
        style={{
          width: 18,
          height: 18,
        }}
      />
    </button>
  );
};

Tooltip.Header = Header;
Tooltip.Title = Title;
Tooltip.Content = Content;
Tooltip.Close = Close;

export default Tooltip;

const TooltipWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${zIndex.헤더};
`;

const TooltipArrow = styled.div`
  position: absolute;
  left: 16px;
  border-right: 5px solid transparent;
  border-bottom: 9px solid ${colors.gray600};
  border-left: 5px solid transparent;
  width: 0;
  height: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    left: 20px;
  }
`;

const TooltipHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TooltipContent = styled.div`
  display: inline-flex;
  position: absolute;
  top: 9px;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  margin: 0;
  border-radius: 12px;
  background: ${colors.gray600};
  padding: 12px 14px;
  width: 272px;
  ${textStyles.SUIT_13_M}

  line-height: 20px;
  white-space: pre;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px 18px;
  }
`;
