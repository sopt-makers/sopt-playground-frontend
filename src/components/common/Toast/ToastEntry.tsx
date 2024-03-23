import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import ToastMDSEntry from '@/components/common/Toast/ToastMDSEntry';
import IconCheck from '@/public/icons/icon-check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export interface ToastEntryProps {
  title?: string;
  message: string;
}

const ToastEntry: FC<ToastEntryProps> = ({ title, message }) => {
  return (
    <>
      {message === '💌 전송이 완료되었어요. 종무식 때 만나요!' ? (
        <ToastMDSEntry title={title} message={message} />
      ) : (
        <StyledToastWrapper>
          <StyledToastEntry>
            <IconBox>
              <IconCheck />
            </IconBox>
            <HeaderBox>
              {title && <Title>{title}</Title>}
              <ContentBox>{message}</ContentBox>
            </HeaderBox>
          </StyledToastEntry>
        </StyledToastWrapper>
      )}
    </>
  );
};

export default ToastEntry;

const TOAST_CONTAINER_LEFT = 36;

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
  background: ${colors.gray700};
  padding: 16px;
  width: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: calc(100vw - ${TOAST_CONTAINER_LEFT * 2}px);
  }
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  color: ${colors.gray200};
`;
