import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, m } from 'framer-motion';
import { FC, useState } from 'react';

import { cardStyle } from '@/components/soulmate/view/common/commonStyles';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ChatRuleProps {
  className?: string;
}

const ChatRule: FC<ChatRuleProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container className={className}>
      <Title>채팅방 이용 규칙</Title>
      <ToggleButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)}>
        상세 이용규칙 펼쳐보기{toggleIcon}
      </ToggleButton>
      <AnimatePresence>{isOpen && <Rules>{rules}</Rules>}</AnimatePresence>
    </Container>
  );
};

const rules = `소울메이트 상대는 솝트 회원 중 한 명이에요.
언제 어디서 마주칠지 모르니👀 서로를 존중하며 대화해 주세요.

매일 밤 11시에 상대에 대한 힌트가 제공되고, 아주아주 간단한 미션이 주어져요.
24시간 내 미션을 수행하면 대화를 이어갈 수 있고, 24시간을 넘기면 해당 소울메이트는 다시 만날 수 없어요 🥲

24시간 내 답변하지 않은 소울메이트가 3명 초과일 경우, 더 이상 소울메이트를 매칭받을 수 없어요 🙏

내 소울메이트에게 보여지는 힌트는 내 멤버프로필에 적힌 정보를 바탕으로 제공되어요.
프로필 모든 항목을 기입했는지 확인 부탁드려요 😃`;

const toggleIcon = (
  <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M11 1.5L6 6.5L1 1.5' stroke='#C0C5C9' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
  </svg>
);

export default ChatRule;

const Container = styled.div`
  ${cardStyle};

  padding: 30px 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: unset;
    background-color: unset;
    padding: 0;
  }
`;

const Title = styled.h3`
  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const ToggleButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-thickness: 1;
  color: ${legacyColors.gray40};

  ${textStyles.SUIT_16_M};

  & > svg {
    transition: transform 0.2s;
    margin-left: 9px;

    ${(props) =>
      props.isOpen &&
      css`
        transform: rotate(-180deg);
      `}
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;

    ${textStyles.SUIT_12_M};

    & > svg {
      margin-left: 6px;
      height: 6px;
    }
  }
`;

const Rules = styled(m.p)`
  padding-top: 30px;
  white-space: pre-wrap;
  color: ${legacyColors.gray40};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 10px;
    line-height: 140%;
    letter-spacing: -0.12px;

    ${textStyles.SUIT_12_M};
  }
`;
