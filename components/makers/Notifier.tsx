import styled from '@emotion/styled';
import { FC } from 'react';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface NotifierProps {
  className?: string;
}

const Notifier: FC<NotifierProps> = ({ className }) => {
  return (
    <StyledJoinNotifier className={className}>
      <Title>현재 makers 1기 진행 중이에요. 2기에서 만나요!</Title>
      <SubTitle>2기 모집은 2023년 1-2월 중에 진행될 예정이에요.</SubTitle>
      <ButtonGroup>
        <SubscribeButton href='#'>2기 모집 알림 신청</SubscribeButton>
        <ExpiredButton href='https://sopt-makers.oopy.io/6c1762c3-054b-4e72-bbf3-439dcac4edee' target='_blank'>
          1기 모집글 보기 (마감)
        </ExpiredButton>
      </ButtonGroup>
    </StyledJoinNotifier>
  );
};

export default Notifier;

const StyledJoinNotifier = styled.div`
  border-radius: 16px;
  background-color: ${colors.black80};
  padding: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_M}
  }
`;

const Title = styled.h2`
  ${textStyles.SUIT_24_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_20_M}
  }
`;

const SubTitle = styled.h3`
  margin-top: 4px;
  color: ${colors.gray60};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const SubscribeButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.purple100};
  cursor: pointer;
  padding: 14px 20px;

  ${textStyles.SUIT_14_B}
`;

const ExpiredButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  border: 1px solid ${colors.gray80};
  border-radius: 6px;
  cursor: pointer;
  padding: 14px 20px;

  ${textStyles.SUIT_14_B}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
    margin-left: 0;
  }
`;
