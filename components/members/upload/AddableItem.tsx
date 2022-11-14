import styled from '@emotion/styled';
import WarningIcon from 'public/icons/icon-warning.svg';
import { ReactNode, useState } from 'react';

import Text from '@/components/common/Text';
import IconDelete from '@/public/icons/icon-delete.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MemberAddableItemProps {
  onRemove: () => void;
  errorMessage?: string;
  children: ReactNode;
}

export default function MemberAddableItem({ onRemove, errorMessage, children }: MemberAddableItemProps) {
  const [isHover, setIsHover] = useState(false);
  const onMouseOver = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  return (
    <StyledContainer>
      <StyledItemWrapper onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
        {children}
        <StyledDeleteButton onClick={onRemove} isHover={isHover} className='pc-only'>
          <IconDelete />
        </StyledDeleteButton>
        <MobileDeleteButton onClick={onRemove} className='mobile-only'>
          삭제
        </MobileDeleteButton>
      </StyledItemWrapper>
      {errorMessage && (
        <StyledError>
          <WarningIcon />
          <StyledErrorMessage type='error'>{errorMessage}</StyledErrorMessage>
        </StyledError>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const StyledItemWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const StyledDeleteButton = styled.button<{ isHover: boolean }>`
  visibility: ${(props) => (props.isHover ? 'visible' : 'hidden')};
  margin-left: 8px;
`;

const MobileDeleteButton = styled.button`
  align-self: flex-end;
  margin-top: 20px;
  margin-right: 5px;
  color: ${colors.gray60};
  font-size: 15px;
  font-weight: 600;
`;

const StyledError = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const StyledErrorMessage = styled(Text)`
  display: block;
`;
