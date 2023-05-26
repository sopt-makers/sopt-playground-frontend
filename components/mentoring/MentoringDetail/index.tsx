import styled from '@emotion/styled';
import ArrowRightIcon from 'public/icons/icon-arrow-right.svg';
import ArrowDiagonalIcon from 'public/icons/icon-diagonal-arrow.svg';
import MessageIcon from 'public/icons/icon-message.svg';
import ProfileIcon from 'public/icons/icon-profile.svg';

import CareerItems from '@/components/members/detail/CareerSection';
import { CAREER_DUMMY_DATA, MENTORING_DATA_BY_MENTOR_ID } from '@/components/mentoring/data';
import InfoItem from '@/components/mentoring/MentoringDetail/InfoItem';
import { MentorId } from '@/components/mentoring/MentoringDetail/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MentoringDetailProps {
  mentorId: MentorId;
}

export default function MentoringDetail({ mentorId }: MentoringDetailProps) {
  const { title, mentorName, keywords, introduce, howTo, target, nonTarget } = MENTORING_DATA_BY_MENTOR_ID[mentorId];
  return (
    <Container>
      <Header>
        <MentoringTitle>{title}</MentoringTitle>
        <ProfileButton>
          <EmptyProfileImage>
            <ProfileIcon />
          </EmptyProfileImage>
          <MentorName>{mentorName}</MentorName>
          <StyledArrowRightIcon />
        </ProfileButton>
        <MessageButton>
          <MessageIcon />
          <div>신청 쪽지 보내기</div>
        </MessageButton>
      </Header>
      <Main>
        <Section>
          <InfoItem label='🔍 전문분야'>
            <KeywordList>
              {keywords.map((keyword, index) => (
                <Keyword key={`${index}-${keyword}`}>{keyword}</Keyword>
              ))}
            </KeywordList>
          </InfoItem>
          <InfoItem label='📓 멘토링 소개'>
            <Content>{introduce}</Content>
          </InfoItem>
          <InfoItem label='💡 진행 방식'>
            <Content>{howTo}</Content>
          </InfoItem>
        </Section>
        <Career.Section>
          <Career.Header>
            <Career.Title>💼 멘토의 커리어</Career.Title>
            <Career.ProfileButton>
              <ArrowDiagonalIcon />
              <div>멘토 프로필 보러가기</div>
            </Career.ProfileButton>
          </Career.Header>
          <Career.InfoItemWrapper>
            <CareerItems
              careers={CAREER_DUMMY_DATA.careers}
              links={CAREER_DUMMY_DATA.links}
              skill={CAREER_DUMMY_DATA.skill}
              shouldNeedOnlyItems
            />
          </Career.InfoItemWrapper>
        </Career.Section>
        <Section>
          <InfoItem label='🙆 이런 분들에게 추천해요!'>
            <Content>{target}</Content>
          </InfoItem>
          <InfoItem label='🙅 이런 분들에게 추천하지 않아요!'>
            <Content>{nonTarget}</Content>
          </InfoItem>
        </Section>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: grid;
  grid:
    [row1-start] 'title title' max-content [row1-end]
    [row2-start] 'profileButton messageButton' max-content [row2-end]
    / max-content min-content;
  align-items: center;
  justify-content: space-between;
  margin-top: 137px;
  width: 790px;
  row-gap: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 82px;
  margin-bottom: 270px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;
  border-radius: 30px;
  background-color: ${colors.black80};
  padding: 48px 39px;
  width: 790px;
`;

const MentoringTitle = styled.h1`
  grid-area: title;
  width: 100%;
  line-height: 48px;
  color: ${colors.white};

  ${textStyles.SUIT_40_B};
`;

const ProfileButton = styled.div`
  display: flex;
  grid-area: profileButton;
  gap: 16px;
  align-items: center;
  cursor: pointer;
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.black60};
  width: 60px;
  height: 60px;

  & > svg {
    width: 36px;
    height: 36px;
  }
`;

const MentorName = styled.div`
  line-height: 100%;
  color: ${colors.white};

  ${textStyles.SUIT_20_SB};
`;

const MessageButton = styled.button`
  display: flex;
  grid-area: messageButton;
  gap: 6px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.purple100};
  width: 180px;
  height: 48px;
  line-height: 135%;
  color: ${colors.white};

  ${textStyles.SUIT_14_B}

  & > svg {
    fill: ${colors.gray10};
    width: 16px;
    height: 16px;
  }
`;

const StyledArrowRightIcon = styled(ArrowRightIcon)`
  width: 16px;
  height: 16px;
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Keyword = styled.div`
  border-radius: 16px;
  background-color: ${colors.black60};
  padding: 8px 15px;
  line-height: 120%;
  color: ${colors.gray30};

  ${textStyles.SUIT_14_M};
`;

const Content = styled.div`
  line-height: 150%;
  white-space: pre-line;
  color: ${colors.white};

  ${textStyles.SUIT_18_M}
`;

const Career = {
  Section: styled(Section)`
    gap: 40px;
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Title: styled.div`
    line-height: 100%;
    color: ${colors.white};

    ${textStyles.SUIT_24_B};
  `,
  ProfileButton: styled.button`
    display: flex;
    gap: 6px;
    align-items: center;
    line-height: 100%;
    color: ${colors.white};

    ${textStyles.SUIT_18_M}

    & > svg {
      width: 16px;
      height: 16px;

      & > path {
        fill: ${colors.white};
      }
    }
  `,
  InfoItemWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
  `,
};
