import styled from '@emotion/styled';
import { FC } from 'react';

import IconBell from '@/public/icons/icon-bell.svg';
import IconOutgoing from '@/public/icons/icon-link-outgoing.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface NotifierProps {
  className?: string;
}

const Notifier: FC<NotifierProps> = ({ className }) => {
  return (
    <StyledJoinNotifier className={className}>
      <Title>현재 makers 2기 진행 중이에요. 3기에서 만나요!</Title>
      <SubTitle>3기 모집은 2023년 7-8월 중에 진행될 예정이에요.</SubTitle>
      <ButtonGroup>
        {/* <SubscribeButton href={RECRUIT_NOTIFY_GENERATION_URL} target='_blank'>
          <StyledBellIcon />
          3기 모집 알림 신청
        </SubscribeButton> */}
        <ExpiredButton href='https://sopt-makers.oopy.io/' target='_blank'>
          <StyledOutgoingIcon />
          2기 모집글 보기 (마감)
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

// const SubscribeButton = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 6px;
//   background-color: ${colors.purple100};
//   cursor: pointer;
//   padding: 14px 20px;

//   ${textStyles.SUIT_14_B}
// `;

const ExpiredButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
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

// const StyledBellIcon = styled(IconBell)`
//   margin-right: 7px;
// `;

const StyledOutgoingIcon = styled(IconOutgoing)`
  margin-right: 6px;
  width: 16px;
  height: 16px;
`;
