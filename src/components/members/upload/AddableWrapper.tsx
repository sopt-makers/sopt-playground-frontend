import styled from '@emotion/styled';
import { ReactNode } from 'react';

import IconPlus from '@/public/icons/icon-plus.svg';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberAddableWrapperProps {
  children: ReactNode;
  onAppend: () => void;
  className?: string;
}

export default function MemberAddableWrapper({ onAppend, children, className }: MemberAddableWrapperProps) {
  return (
    <StyledContainer>
      <StyledAddableItems className={className}>{children}</StyledAddableItems>
      <StyledAddButton onClick={onAppend} className='pc-only'>
        <IconPlus stroke={legacyColors.purple100} />
        <div>추가</div>
      </StyledAddButton>
      <MobileAddButton onClick={onAppend}>
        <IconPlus stroke={legacyColors.gray20} />
        <div>추가</div>
      </MobileAddButton>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: relative;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledAddButton = styled.button`
  display: flex;
  gap: 11px;
  align-items: center;
  margin-top: 23px;
  color: ${legacyColors.purple100};

  ${textStyles.SUIT_16_SB}
`;

const MobileAddButton = styled.button`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 11px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border: 1px solid ${legacyColors.black40};
    border-radius: 12px;
    padding: 16px 0;
    width: 100%;
    color: ${legacyColors.gray20};
  }
`;

const StyledAddableItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
  }
`;
