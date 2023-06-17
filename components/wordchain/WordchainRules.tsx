import styled from '@emotion/styled';
import { FC, ReactNode, useState } from 'react';

import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import MessageIcon from '@/public/icons/icon-wordchain-message.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface WordchainRulesProps {
  className?: string;
  trigger: ReactNode;
}

const WordchainRules: FC<WordchainRulesProps> = ({ className, trigger }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <StyledRules className={className}>
      <Text typography='SUIT_24_B' as='h2'>
        끝말잇기 게임 규칙
      </Text>
      <StyledButton onClick={handleOpen}>{trigger}</StyledButton>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <MessageIcon />
        <StyledTitle typography='SUIT_20_B'>SOPT와 함께하는 끝말잇기는</StyledTitle>
        <Content>
          · 표준국어대사전에 있는 단어만 사용할 수 있어요. <br />
          &nbsp;&nbsp;&nbsp;시작 단어에는 적용하지 않았어요 :) <br />
          · 두 글자 이상 단어만 사용할 수 있어요. <br />
          · 한 회차에서는 중복된 단어를 사용할 수 없어요. <br />
          · 아무도 단어를 잇지 못하면 마지막 사람이 <br />
          &nbsp;&nbsp;&nbsp;해당 회차 우승자가 되어 명예의 전당에 올라갈 수 있어요 💪🏻 <br />
          · 두음법칙은 아직 적용되지 않아요. 조금만 기다려주세요 🙏🏻 <br />
        </Content>
      </Modal>
    </StyledRules>
  );
};

export default WordchainRules;

const StyledRules = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: ${colors.black80};
  padding: 38px 30px;
  row-gap: 16px;
`;

const StyledButton = styled.button`
  display: flex;
`;

const Content = styled.div`
  margin-top: 24px;
  line-height: 130%;

  ${textStyles.SUIT_15_M};
`;

const StyledTitle = styled(Text)`
  display: block;
  margin-top: 8px;
`;
