import ProfileIcon from 'public/icons/icon-profile.svg';
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
import Text from '@/components/common/Text';
import promotion from '@/public/icons/img/popup/member_match.png';
import bgImg from '@/public/icons/img/popup/member_match_bg.png';
import { Button } from '@sopt-makers/ui';
import { Spacing } from '@toss/emotion-utils';
import ResizedImage from '@/components/common/ResizedImage';
import { fonts } from '@sopt-makers/fonts';

interface MatchMemberModalProps {
  onClose: () => void;
  isOpen: boolean;
}

type QuestionKey = 'ideationStyle' | 'workTime' | 'communicationStyle' | 'workPlace' | 'feedbackStyle';
export type ChoiceSide = 'left' | 'right';
export type Choice = {
  value: string;
  label: string;
};
export type Question = {
  key: QuestionKey;
  left: Choice;
  right: Choice;
};
const QUESTIONS: Question[] = [
  {
    key: 'ideationStyle',
    left: { value: '즉흥', label: '즉흥 아이데이션' },
    right: { value: '숙고', label: '숙고 아이데이션' },
  },
  {
    key: 'workTime',
    left: { value: '아침', label: '아침 작업' },
    right: { value: '밤', label: '밤 작업' },
  },
  {
    key: 'communicationStyle',
    left: { value: '몰아서', label: '몰아서 작업' },
    right: { value: '나눠서', label: '나눠서 작업' },
  },
  {
    key: 'workPlace',
    left: { value: '카공', label: '카공 작업' },
    right: { value: '집콕', label: '집콕 작업' },
  },
  {
    key: 'feedbackStyle',
    left: { value: '직설적', label: '직설적 피드백' },
    right: { value: '돌려서', label: '돌려서 피드백' },
  },
] as const;
type BalanceGameValue = Partial<Record<QuestionKey, ChoiceSide>>;
interface MatchContentProps {
  step: number;
  value: BalanceGameValue;
  onChange: (key: QuestionKey, side: ChoiceSide) => void;
  onNextStep: () => void;
}

const MatchContent = ({ step, value, onChange, onNextStep }: MatchContentProps) => {
  const router = useRouter();

  if (step === 1)
    return (
      <>
        <Text typography='SUIT_14_SB' color='#FFCA00'>
          나와 합숙할
        </Text>
        <Text typography='SUIT_20_B' color={colors.gray10}>
          찰떡 케미 앱잼 멤버 찾기!
        </Text>
        <Spacing size={20} />
        <img src={promotion.src} />
        <Spacing size={24} />
        <Button size='lg' onClick={onNextStep}>
          5초만에 소울메이트 찾기
        </Button>
      </>
    );

  if (step === 2) {
    return (
      <>
        <Text typography='SUIT_14_SB' color='#FFCA00'>
          작업 방식 밸런스 게임!
        </Text>
        <Text typography='SUIT_20_B' color={colors.white}>
          선호하는 작업 방식을 선택 해주세요.
        </Text>
        <Spacing size={20} />
        <QuestionList>
          {QUESTIONS.map((q) => (
            <QuestionRow key={q.key}>
              <Button
                size='md'
                theme={value[q.key] === 'left' ? 'blue' : 'black'}
                onClick={() => onChange(q.key, 'left')}
              >
                {q.left.label}
              </Button>
              <Text typography='SUIT_16_SB' color={colors.gray100}>
                vs
              </Text>
              <Button
                size='md'
                theme={value[q.key] === 'right' ? 'blue' : 'black'}
                onClick={() => onChange(q.key, 'right')}
              >
                {q.right.label}
              </Button>
            </QuestionRow>
          ))}
        </QuestionList>
        <Spacing size={24} />
        <Button size='lg' onClick={onNextStep}>
          결과 확인하기
        </Button>
      </>
    );
  }
  return (
    <>
      <Text typography='SUIT_20_B' color={colors.gray10}>
        당신의 찰떡 멤버는...?!
      </Text>
      <Text typography='SUIT_14_M' color={colors.gray200}>
        아래 멤버 프로필을 눌러 더 알아보세요.
      </Text>
      <Spacing size={20} />
      <MemberCard />
      <Spacing size={24} />
      <Button size='lg' onClick={() => router.push(playgroundLink.memberList())}>
        나랑 찰떡 멤버 더 찾아보기
      </Button>
    </>
  );
};

const MemberCard = () => {
  const mock = {
    ideationStyle: '즉흥',
    workTime: '아침',
    communicationStyle: '몰아서',
    workPlace: '카공',
    feedbackStyle: '직설적',
  };

  return (
    <CardWrapper>
      <Text typography='SUIT_12_SB' color='#ADC8E9'>
        케미 UP!
      </Text>
      <CardContent>
        <ImageBox>
          <EmptyProfileImage>
            <ProfileIcon />
          </EmptyProfileImage>
          {/* {profileImage && (
            <ResizedProfileImage
              src={profileImage}
              onLoad={() => setIsImageLoaded(true)}
              hide={!isImageLoaded}
              width={68}
            />
          )} */}
        </ImageBox>
        <Tag>
          <Circle />
          디자인
        </Tag>
        <InfoBox>
          <Text typography='SUIT_20_SB' color={colors.gray10}>
            이름
          </Text>
          <Text typography='SUIT_12_SB' color={colors.gray200}>
            서울과학기술대학교
          </Text>
        </InfoBox>
        <BadgeContainer>
          {Object.entries(mock).map(([key, value]) => (
            <Badge key={key}>{value}</Badge>
          ))}
        </BadgeContainer>
        <BackgroundBlur />
      </CardContent>
    </CardWrapper>
  );
};

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

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`;

const QuestionRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;

  & > button {
    flex: 1;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  border: 1px solid #9cbce3;
  border-radius: 16px;
  box-shadow: 0 1px 20.6px 0 rgb(194 197 255 / 33%);
  background: ${colors.gray800};
  padding: 16px 18px 24px;
  min-width: 243px;
  min-height: 285px;
  overflow: hidden;

  & > span {
    z-index: 1;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  position: relative;
  z-index: 1;
  width: 108px;
  height: 108px;
  clip-path: circle(50%);
`;

const EmptyProfileImage = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray700};
  width: 108px;
  height: 108px;
`;

const ResizedProfileImage = styled(ResizedImage)<{ hide?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};
`;

const Tag = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin: 18px 0 7px;
  border-radius: 4px;
  background: ${colors.orangeAlpha200};
  padding: 3px 6px;
  width: fit-content;
`;

const Circle = styled.div`
  border-radius: 999px;
  background: ${colors.orange400};
  width: 6px;
  height: 6px;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 10px;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background: ${colors.gray700};
  padding: 4px 6px;
  ${fonts.LABEL_11_SB}

  color: ${colors.gray200}
`;

const BackgroundBlur = styled.div`
  position: absolute;
  top: -66.871px;
  left: 17px;
  opacity: 0.4;
  background: ${colors.success};
  width: 197px;
  height: 162px;
  filter: blur(50px);
`;
