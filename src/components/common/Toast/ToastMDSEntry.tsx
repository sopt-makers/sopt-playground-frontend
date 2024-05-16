import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';
import { FC } from 'react';

import { ToastOption } from '@/components/common/Toast/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ToastMDSEntry: FC<ToastOption> = ({ status, message, buttonText, linkUrl = '' }) => {
  return (
    <StyledToastWrapper>
      <StyledToastEntry>
        <HeaderBox>
          {status === 'success' && <ToastIconSuccess />}
          <ContentBox>{message}</ContentBox>
          {buttonText && (
            <ActionButton type='button' href={linkUrl}>
              {buttonText}
            </ActionButton>
          )}
        </HeaderBox>
      </StyledToastEntry>
    </StyledToastWrapper>
  );
};

export default ToastMDSEntry;

const ToastIconSuccess = () => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='20' height='20' rx='10' fill='#82F6CB' />
      <path
        d='M5.33325 9.1835L8.44436 12.3335L14.6666 7.0835'
        stroke='#136D4C'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const ActionButton = styled(Link)`
  min-width: max-content;
  color: ${colors.blue400};
  ${fonts.LABEL_14_SB};
`;

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
  gap: 8px;
  align-items: center;

  > svg {
    min-width: max-content;
  }
`;

const ContentBox = styled.div`
  color: ${colors.gray900};
  ${textStyles.SUIT_14_SB};
`;
