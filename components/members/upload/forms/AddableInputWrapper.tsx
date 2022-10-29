import styled from '@emotion/styled';
import { ReactChild } from 'react';

import IconDelete from '@/public/icons/icon-delete.svg';
import IconPlus from '@/public/icons/icon-plus.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberAddableInputWrapperProps {
  pcWidth: string;
  children: ReactChild;
}

export default function MemberAddableInputWrapper({ pcWidth, children }: MemberAddableInputWrapperProps) {
  return (
    <>
      <StyledInputWrapper pcWidth={pcWidth}>
        {children}
        <StyledDeleteButton className='pc-only' />
        <MobileDeleteButton className='mobile-only'>삭제</MobileDeleteButton>
      </StyledInputWrapper>
      <StyledAddButton className='pc-only'>
        <IconPlus stroke={colors.purple100} />
        <div>추가</div>
      </StyledAddButton>
      <MobileAddButton>
        <IconPlus stroke={colors.gray20} />
        <div>추가</div>
      </MobileAddButton>
    </>
  );
}

const StyledInputWrapper = styled.div<{ pcWidth: string }>`
  position: relative;
  width: ${(props) => props.pcWidth};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledDeleteButton = styled(IconDelete)`
  position: absolute;
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const StyledAddButton = styled.button`
  display: flex;
  gap: 11px;
  align-items: center;
  margin-top: 23px;
  color: ${colors.purple100};

  ${textStyles.SUIT_16_SB}
`;

const MobileDeleteButton = styled.button`
  position: absolute;
  right: 4px;
  bottom: -35px;
  color: ${colors.gray60};
  font-size: 15px;
  font-weight: 600;
`;

const MobileAddButton = styled.button`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 11px;
    align-items: center;
    justify-content: center;
    margin-top: 55px;
    border: 1px solid ${colors.black40};
    border-radius: 12px;
    padding: 16px 0;
    width: 100%;
    color: ${colors.gray20};
  }
`;
