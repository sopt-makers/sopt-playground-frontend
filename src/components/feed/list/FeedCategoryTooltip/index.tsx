import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import React from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { zIndex } from '@/styles/zIndex';

const Tooltip = ({ tooltipPosition }: { tooltipPosition: { top: number; left: number } }) => {
  return (
    <TooltipWrapper top={tooltipPosition.top} left={tooltipPosition.left}>
      <TooltipArrow />
      <TooltipContent>SOPT 회원들이 직접 작성한 아티클,{`\n`}이제 플레이그라운드에서도 볼 수 있어요!</TooltipContent>
    </TooltipWrapper>
  );
};

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

const TooltipContent = styled.div`
  display: inline-flex;
  position: absolute;
  top: 9px;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  margin: 0;
  border-radius: 12px;
  background: ${colors.gray600};
  padding: 12px 14px;
  min-width: 160px;
  ${textStyles.SUIT_13_M}

  line-height: 20px;
  white-space: pre;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px 18px;
  }
`;
