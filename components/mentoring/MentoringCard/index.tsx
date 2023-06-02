import styled from '@emotion/styled';
import ProfileIcon from 'public/icons/icon-profile.svg';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { getScreenMaxWidthMediaQuery } from '@/utils';

interface MentoringCardProps {
  mentor: { name: string; career?: string; profileImage?: string };
  keywords: string[];
  title: string;
  isOpened: boolean;
  onClick?: () => void;
}

export default function MentoringCard({ mentor, keywords, title, isOpened, onClick }: MentoringCardProps) {
  return (
    <Container onClick={onClick}>
      <Keywords>
        {keywords.map((keyword, index) => (
          <Keyword key={`${index}-${keyword}`}>{keyword}</Keyword>
        ))}
      </Keywords>
      <Title>{title}</Title>
      <Mentor>{mentor.career ? `${mentor.name} · ${mentor.career}` : mentor.name}</Mentor>
      {mentor.profileImage ? (
        <ProfileImage src={mentor.profileImage} />
      ) : (
        <EmptyProfileImage>
          <ProfileIcon />
        </EmptyProfileImage>
      )}
      <Closed isActive={!isOpened}>현재는 멘토링 신청을 받고 있지 않아요</Closed>
    </Container>
  );
}

const DESKTOP_SMALL_MEDIA_QUERY = getScreenMaxWidthMediaQuery('1200px');

const Container = styled.div`
  display: grid;
  position: relative;
  grid:
    [row1-start] 'keywords profileImage' min-content [row1-end]
    [row2-start] 'title profileImage' min-content [row2-end]
    [row3-start] 'mentor mentor' min-content [row3-end]
    / 234px auto;
  align-content: center;
  column-gap: 37px;
  border-radius: 16px;
  background-color: ${colors.black90};
  padding: 35px 40px 36px 45px;
  width: 424px;
  min-width: 424px;
  min-height: 224px;

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    grid:
      [row1-start] 'keywords keywords' min-content [row1-end]
      [row2-start] 'title title' min-content [row2-end]
      [row3-start] 'profileImage mentor' min-content [row3-end]
      / 20px auto;
    align-items: center;
    column-gap: 12px;
    padding: 28px;
    width: 335px;
    min-width: 335px;
    min-height: 189px;
  }
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-area: keywords;
  gap: 6px;
  align-content: flex-end;
  margin-bottom: 12px;
  width: 234px;

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    margin-bottom: 8px;
  }
`;

const ProfileImage = styled.img`
  grid-area: profileImage;
  align-self: center;
  border-radius: 50%;
  width: 68px;
  height: 68px;
  object-fit: cover;

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    width: 20px;
    height: 20px;
  }
`;

const EmptyProfileImage = styled.div`
  display: flex;
  grid-area: profileImage;
  align-items: center;
  align-self: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.black60};
  width: 68px;
  height: 68px;

  & > svg {
    width: 34px;
    height: 34px;
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    width: 20px;
    height: 20px;

    & > svg {
      width: 10px;
      height: 10px;
    }
  }
`;

const Keyword = styled.span`
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 6px;
  height: fit-content;
  line-height: 14px;
  color: ${colors.gray30};

  ${textStyles.SUIT_11_M};
`;

const Title = styled.div`
  display: ${'-webkit-box'};
  grid-area: title;
  margin-bottom: 24px;
  width: 234px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  color: ${colors.gray10};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${textStyles.SUIT_18_B};

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    margin-bottom: 10px;
    line-height: 20px;

    ${textStyles.SUIT_16_SB};
  }
`;

const Mentor = styled.div`
  grid-area: mentor;
  line-height: 120%;
  color: ${colors.gray60};

  ${textStyles.SUIT_14_M};
`;

const Closed = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  position: absolute;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  border-radius: 16px;
  background-color: ${colors.black100};
  width: 424px;
  height: 224px;
  color: #fff;

  ${textStyles.SUIT_16_SB}
`;
