import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';

import IconPlus from '@/public/icons/icon-plus.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberAddableWrapperProps extends HTMLAttributes<HTMLDivElement> {
  pcWidth: string;
  children: ReactNode;
  onAppend: () => void;
}

export default function MemberAddableWrapper({ pcWidth, onAppend, children, ...props }: MemberAddableWrapperProps) {
  return (
    <StyledContainer {...props} pcWidth={pcWidth}>
      <StyledAddableItems>{children}</StyledAddableItems>
      <StyledAddButton onClick={onAppend} className='pc-only'>
        <IconPlus stroke={colors.purple100} />
        <div>추가</div>
      </StyledAddButton>
      <MobileAddButton onClick={onAppend}>
        <IconPlus stroke={colors.gray20} />
        <div>추가</div>
      </MobileAddButton>
    </StyledContainer>
  );
}

const StyledContainer = styled.div<{ pcWidth: string }>`
  position: relative;
  width: ${(props) => props.pcWidth};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledAddButton = styled.button`
  display: flex;
  gap: 11px;
  align-items: center;
  margin-top: 23px;
  color: ${colors.purple100};

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
    border: 1px solid ${colors.black40};
    border-radius: 12px;
    padding: 16px 0;
    width: 100%;
    color: ${colors.gray20};
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
