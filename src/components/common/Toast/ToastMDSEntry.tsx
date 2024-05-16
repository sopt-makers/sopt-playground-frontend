import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export interface ToastEntryProps {
  title?: string;
  message: string;
}

const ToastMDSEntry: FC<ToastEntryProps> = ({ title, message }) => {
  return (
    <StyledToastWrapper>
      <StyledToastEntry>
        <HeaderBox>
          {title && <Title>{title}</Title>}
          <ContentBox>{message}</ContentBox>
        </HeaderBox>
      </StyledToastEntry>
    </StyledToastWrapper>
  );
};

export default ToastMDSEntry;

const StyledToastWrapper = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
const StyledToastEntry = styled.div`
  display: flex;
  border-radius: 18px;
  background: ${colors.gray10};
  padding: 14px 16px;
  width: 380px;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 343px;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  margin-bottom: 7px;
  color: ${colors.gray10};

  ${textStyles.SUIT_20_B};
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 11px;
  width: 23px;
  height: 23px;

  & > svg {
    width: 14px;
  }
`;

const ContentBox = styled.div`
  color: ${colors.gray900};
  ${textStyles.SUIT_14_SB};
`;
