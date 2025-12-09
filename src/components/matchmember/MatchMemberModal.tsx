import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useState } from 'react';
import { ModalBottomSheet } from '@/components/common/BottomSheet/ModalBottomSheet';
import Modal from '@/components/common/Modal';
import Responsive from '@/components/common/Responsive';
import { zIndex } from '@/styles/zIndex';
import { MB_BIG_MEDIA_QUERY } from '@/styles/mediaQuery';
import bgImg from '@/public/icons/img/popup/member_match_bg.png';
import { MatchContent } from '@/components/matchmember/MatchContent';
import { BalanceGameValue, ChoiceSide, QuestionKey } from '@/components/matchmember/constant';

interface MatchMemberModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const MatchMemberModal = ({ onClose, isOpen }: MatchMemberModalProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [value, setValue] = useState<BalanceGameValue>({});

  const handleClose = () => {
    onClose();
    router.push(playgroundLink.feedList());
  };

  const handleChange = (key: QuestionKey, side: ChoiceSide) => {
    setValue((prev) => ({ ...prev, [key]: side }));
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <>
      <Responsive only='desktop'>
        <StyledModal isOpen={isOpen} onClose={handleClose} zIndex={zIndex.헤더 + 100} step={step}>
          <StyledContent>
            <MatchContent step={step} value={value} onChange={handleChange} onNextStep={handleNextStep} />
          </StyledContent>
        </StyledModal>
      </Responsive>

      <Responsive only='mobile'>
        <StyledModalBottomSheet isOpen={isOpen} onClose={handleClose} step={step}>
          <StyledContent>
            <MatchContent step={step} value={value} onChange={handleChange} onNextStep={handleNextStep} />
          </StyledContent>
        </StyledModalBottomSheet>
      </Responsive>
    </>
  );
};

export default MatchMemberModal;

const StyledModal = styled(Modal)<{ step: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.gray900};
  padding-top: 18px;
  width: 375px;
  height: 526px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    width: 100vw;
  }

  ${({ step }) =>
    step === 3 &&
    css`
      background-image: url(${bgImg.src});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `}
`;

const StyledModalBottomSheet = styled(ModalBottomSheet)<{ step: number }>`
  ${({ step }) =>
    step === 3 &&
    css`
      .react-modal-sheet-container {
        background-image: url(${bgImg.src});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    `}
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 18px 40px;
  width: 100%;

  & > img {
    border-radius: 24px;
    width: 100%;
  }

  & > button {
    width: 100%;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    padding-top: 46px;
  }
`;
