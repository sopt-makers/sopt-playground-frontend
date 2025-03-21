import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { FC } from 'react';

import { SlideUpOption } from '@/components/common/SlideUp/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const SlideUpEntry: FC<SlideUpOption> = ({ status, message, buttonText, action }) => {
  return (
    <StyledToastWrapper>
      <StyledToastEntry>
        <HeaderBox>
          {status === 'success' && <SlideUpIconSuccess />}
          {message}
        </HeaderBox>
        {buttonText && (
          <ActionButton type='button' onClick={action}>
            {buttonText}
          </ActionButton>
        )}
      </StyledToastEntry>
    </StyledToastWrapper>
  );
};

export default SlideUpEntry;

const SlideUpIconSuccess = () => {
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

const ActionButton = styled.button`
  min-width: max-content;
  color: ${colors.blue400};
  ${fontsObject.LABEL_3_14_SB};
`;

const StyledToastWrapper = styled.div`
  position: absolute;
  top: 35px;
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
const StyledToastEntry = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 18px;
  background: ${colors.gray10};
  padding: 14px 16px;
  min-width: 343px;
  max-width: 380px;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 343px;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${colors.gray900};
  ${textStyles.SUIT_14_SB};

  > svg {
    min-width: max-content;
  }
`;
