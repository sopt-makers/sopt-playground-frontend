import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';

import IconDelete from '@/public/icons/icon-delete.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MemberAddableItemProps {
  onRemove: () => void;
  children: ReactNode;
}

export default function MemberAddableItem({ onRemove, children }: MemberAddableItemProps) {
  const [isHover, setIsHover] = useState(false);
  const onMouseOver = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  return (
    <StyledContainer onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      {children}
      <StyledDeleteButton onClick={onRemove} isHover={isHover} className='pc-only'>
        <IconDelete />
      </StyledDeleteButton>
      <MobileDeleteButton onClick={onRemove} className='mobile-only'>
        삭제
      </MobileDeleteButton>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    height: 154px;
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
