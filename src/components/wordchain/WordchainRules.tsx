import styled from '@emotion/styled';
import { FC, ReactNode, useState } from 'react';

import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import MessageIcon from '@/public/icons/icon-wordchain-message.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface WordchainRulesProps {
  trigger: ReactNode;
}

const WordchainRules: FC<WordchainRulesProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <StyledButton onClick={handleOpen}>{trigger}</StyledButton>
      <StyledModal isOpen={isOpen} onClose={handleClose}>
        <MessageIcon />
        <StyledTitle>SOPT와 함께하는 끝말잇기</StyledTitle>
        <Content>
          · 표준국어대사전에 있는 단어만 사용할 수 있어요. <br />
          &nbsp;&nbsp;&nbsp;시작 단어에는 적용하지 않았어요 :) <br />
          · 두 글자 이상 단어만 사용할 수 있어요. <br />
          · 한 회차에서는 중복된 단어를 사용할 수 없어요. <br />
          · 아무도 단어를 잇지 못하면 마지막 사람이 <br />
          &nbsp;&nbsp;&nbsp;해당 회차 우승자가 되어 명예의 전당에 올라갈 수 있어요 💪🏻 <br />
          · 두음법칙이 적용돼요. <br />
        </Content>
      </StyledModal>
    </>
  );
};

export default WordchainRules;

const StyledButton = styled.button`
  display: flex;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 24px;
  line-height: 130%;

  ${textStyles.SUIT_15_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};
  }
`;

const StyledTitle = styled(Text)`
  display: block;
  margin-top: 8px;
  ${textStyles.SUIT_20_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_B};
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  min-height: 316px;

  /* TODO: 모바일 대응 */
`;
