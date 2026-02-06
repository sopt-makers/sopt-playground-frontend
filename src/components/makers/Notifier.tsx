import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import IconOutgoing from '@/public/icons/icon-link-outgoing.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface NotifierProps {
  className?: string;
}

const RECRUITING_URL = 'https://sopt-makers.notion.site/38-2fd76042aac280f39548e46b98e2a06a?pvs=73';
// 'https://makers.sopt.org/recruit?utm_source=playground&utm_medium=depth2_button&utm_campaign=recruiting&utm_id=3rd_makers';

const Notifier: FC<NotifierProps> = ({ className }) => {
  return (
    <StyledJoinNotifier className={className}>
      {/* MEMO: 38기 모집 시작 시 주석 해제 */}
      {/* <Title>36기 makers 지원이 곧 시작될 예정이에요.</Title> */}
      {/* <Title>36기 makers 지원이 시작되었어요.</Title> */}
      {/* <Title>현재 37기 makers 진행 중이에요. 38기에서 만나요!</Title> */}
      <Title>현재 38기 makers 팀 모집이 진행 중이에요. 곧 만나요!</Title>
      {/* <SubTitle>38기 모집은 2026년 2월 중에 진행될 예정이에요.</SubTitle> */}
      <SubTitle>38기 모집은 2026년 2월 6일 금요일부터 2월 13일 금요일 23:59까지 진행될 예정이에요.</SubTitle>
      <ButtonGroup>
        {/* MEMO: 36기 모집 알림 신청시에 다시 주석 해제 */}
        {/* <SubscribeButton href={RECRUIT_NOTIFY_GENERATION_URL} target='_blank'>
          <StyledBellIcon />
          36기 모집 알림 신청
        </SubscribeButton> */}
        {/* <ExpiredButton href='https://makers.sopt.org' target='_blank'>
          <StyledOutgoingIcon />
          36기 메이커스팀 모집글 보기
          {/* 모집 페이지 가기 
        </ExpiredButton> */}
        <ExpiredButton href={RECRUITING_URL} target='_blank'>
          <StyledOutgoingIcon />
          38기 모집글 보기
        </ExpiredButton>
      </ButtonGroup>
    </StyledJoinNotifier>
  );
};

export default Notifier;

const StyledJoinNotifier = styled.div`
  border-radius: 16px;
  background-color: ${colors.gray800};
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
  color: ${colors.gray300};

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
//   background-color: ${colors.gray10};
//   color: ${colors.gray950};
//   cursor: pointer;
//   padding: 14px 20px;

//   ${textStyles.SUIT_14_B}
// `;

const ExpiredButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray400};
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
