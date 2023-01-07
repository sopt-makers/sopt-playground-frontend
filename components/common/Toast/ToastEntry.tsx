import styled from '@emotion/styled';
import { FC } from 'react';

import IconCheck from '@/public/icons/icon-check.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export interface ToastEntryProps {
  title?: string;
  message: string;
}

const ToastEntry: FC<ToastEntryProps> = ({ title, message }) => {
  return (
    <StyledToastEntry>
      <IconBox>
        <IconCheck />
      </IconBox>
      <HeaderBox>
        {title && <Title>{title}</Title>}
        <ContentBox>{message}</ContentBox>
      </HeaderBox>
    </StyledToastEntry>
  );
};

export default ToastEntry;

const StyledToastEntry = styled.div`
  display: flex;
  border-radius: 18px;
  background: ${colors.black60};
  padding: 16px;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h2`
  margin-bottom: 7px;
  color: ${colors.white};

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
  color: ${colors.gray40};
`;
