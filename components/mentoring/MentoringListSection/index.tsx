import styled from '@emotion/styled';
import ArrowDiagonalIcon from 'public/icons/icon-diagonal-arrow.svg';

import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MentoringList from '@/components/mentoring/MentoringListSection/MentoringList';
import {
  DESKTOP_LARGE_MEDIA_QUERY,
  DESKTOP_SMALL_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from '@/components/mentoring/MentoringListSection/responsive';
import { MENTOR_APPLICATION_URL } from '@/constants/links';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export default function MentoringSection() {
  const { logClickEvent } = useEventLogger();

  const handleClickMentorApplicationButton = () => {
    logClickEvent('mentorApplicationButton');
  };

  return (
    <Container>
      <Header>
        <Title>{`✨ NEW! \n아래의 멘토들이 \n멘티를 기다리고 있어요`}</Title>
        <MentorApplicationButton
          href={MENTOR_APPLICATION_URL}
          target='_blank'
          onClick={handleClickMentorApplicationButton}
          rel='noopener'
        >
          멘토 등록을 하고싶다면?
          <ArrowDiagonalIcon />
        </MentorApplicationButton>
      </Header>
      <MentoringList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 103px;
`;

const Title = styled.div`
  text-align: start;
  line-height: 100%;
  color: ${colors.white};

  ${textStyles.SUIT_24_B}

  @media ${TABLET_MEDIA_QUERY} {
    white-space: pre-line;
  }
`;

const MentorApplicationButton = styled.a`
  display: flex;
  gap: 6px;
  align-items: center;
  line-height: 100%;
  color: ${colors.gray80};

  ${textStyles.SUIT_18_M}

  & > svg {
    width: 20px;
    height: 20px;

    & > path {
      fill: ${colors.gray80};
    }
  }

  @media ${TABLET_MEDIA_QUERY} {
    gap: 4px;
    line-height: 15px;

    ${textStyles.SUIT_12_M}

    & > svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1302px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 969px;
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 636px;
  }

  @media ${TABLET_MEDIA_QUERY} {
    gap: 12px;
    padding: 0 20px;
    width: 100%;
  }
`;
