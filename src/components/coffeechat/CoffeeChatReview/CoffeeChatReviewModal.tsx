import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconXClose } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

import Divider from '@/components/common/Divider/Divider';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import IconModalClose from '@/public/icons/icon-modal-close.svg';
import { MB_BIG_MEDIA_QUERY, MB_MID_MEDIA_QUERY, MB_SM_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CoffeeChatReviewModalProps {
  isPopupVisible: boolean;

  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CoffeeChatReviewModal: React.FC<CoffeeChatReviewModalProps> = ({ isPopupVisible, setPopupVisible }) => {
  const soptActivityBadges = [
    { content: '35기 웹', isActive: true },
    { content: '35기 웹', isActive: true },
    { content: '35기 웹', isActive: true },
    { content: '35기 웹', isActive: true },
    { content: '35기 웹', isActive: true },
    { content: '35기 웹', isActive: true },
  ];
  const topicTypeList = ['커리어', '포트폴리오', '직무 전문성', '솝트 활동', '취업'];
  const ELLIPSIS_WIDTH = 36;
  const BADGE_GAP = 4;
  const {
    visibleBadges: visibleSoptActivities,
    isBadgeOverflow: isSoptActivitiesOverflow,
    badgeRefs: soptActivitiesRef,
    badgeWrapperRef: soptActivitiesWrapperRef,
  } = useVisibleBadges(soptActivityBadges, ELLIPSIS_WIDTH, BADGE_GAP);
  const {
    visibleBadges: visibleTopics,
    isBadgeOverflow: isTopicsOverflow,
    badgeRefs: topicsRef,
    badgeWrapperRef: topicsWrapperRef,
  } = useVisibleBadges(topicTypeList, ELLIPSIS_WIDTH, BADGE_GAP);

  useEffect(() => {
    if (isPopupVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPopupVisible]);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <StBackground>
      <StPopupModal>
        <StCloseButton onClick={handleClosePopup}>
          <StyledIconClose />
        </StCloseButton>
        <ProfileSection>
          <ImageBox>
            <EmptyProfileImage>
              <DefaultImage src='/icons/icon-profile.svg' loading='lazy' decoding='async' />
            </EmptyProfileImage>
          </ImageBox>
          <InfoSection>
            <StUserName>귀여운 플둥이</StUserName>
            <SoptTagSection ref={soptActivitiesWrapperRef}>
              {visibleSoptActivities.map((badge, idx) => (
                <Badge
                  ref={(el: HTMLDivElement) => (soptActivitiesRef.current[idx] = el)}
                  isActive={badge.isActive}
                  key={idx}
                >
                  {badge.isActive && <BadgeActiveDot />}
                  <Text typography='SUIT_11_SB' color={badge.isActive ? colors.secondary : colors.gray200}>
                    {badge.content}
                  </Text>
                </Badge>
              ))}
              {isSoptActivitiesOverflow && (
                <Badge isActive={false}>
                  <Text typography='SUIT_11_SB'>...</Text>
                </Badge>
              )}
            </SoptTagSection>
          </InfoSection>
        </ProfileSection>
        <Divider />
        <SubjectSection>
          <StSubtitle>진행한 커피챗 주제</StSubtitle>
          <TagSection ref={topicsWrapperRef}>
            {visibleTopics
              ?.map((topic) => topic.trim())
              .filter(Boolean)
              .map((topic, idx) => (
                <div key={topic} ref={(el: HTMLDivElement) => (topicsRef.current[idx] = el)}>
                  <Tag size='md' shape='pill' variant='default' type='solid'>
                    {topic}
                  </Tag>
                </div>
              ))}

            {isTopicsOverflow && (
              <Tag size='md' shape='pill' variant='default' type='solid'>
                ...
              </Tag>
            )}
          </TagSection>
        </SubjectSection>
        <StReviewSection>
          <StSubtitle>커피챗 후기</StSubtitle>
          <StReviewTextField>
            커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요..
            커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요..커피챗 너무 좋아요.. 커피챗 너무 좋아요..
            커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요..
            커피챗 너무 좋아요..커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요..
            커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요..커피챗 너무 좋아요..
            커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요..
            커피챗 너무 좋아요.. 커피챗 너무 좋아요..커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요..
            커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요커피챗 너무 좋아요.. 커피챗
            너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무
            좋아요.. 커피챗 너무 좋아요커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무
            좋아요커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요커피챗 너무 좋아요..
            커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗
            너무 좋아요.. 커피챗 너무 좋아요커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무
            좋아요커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요커피챗 너무 좋아요..
            커피챗 너무 좋아요.. 커피챗 너무 좋아요.. 커피챗 너무 좋아요
          </StReviewTextField>
        </StReviewSection>
      </StPopupModal>
    </StBackground>
  );
};

const StBackground = styled.div`
  display: flex;
  position: fixed;
  top: 79px;
  justify-content: center;
  z-index: 202;
  background-color: rgb(23 24 28 / 80%);
  padding-top: 5px;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  @media ${MOBILE_MEDIA_QUERY} {
    top: 0;
    align-items: center;
    padding-top: 0;
    padding-bottom: 32px;
  }
`;
const StPopupModal = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: start;
  border-radius: 20px;
  background-color: ${colors.gray900};
  padding: 40px;
  padding-top: 60px;
  width: 532px;
  height: 628px;

  @media ${MB_BIG_MEDIA_QUERY} {
    padding: 20px;
    padding-top: 60px;
    padding-bottom: 40px;
    width: 100%;
    height: 654px;
  }
`;
const StCloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;

  @media ${MB_BIG_MEDIA_QUERY} {
    top: 24px;
    right: 24px;
  }
`;
const StyledIconClose = styled(IconXClose)`
  width: 24px;
`;
const StProfileLayer = styled.div``;

const Title = styled.div`
  display: ${'-webkit-box'};
  height: 56px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${fonts.HEADING_18_B}

  white-space: pre-line;
  word-break: break-word;
  color: ${colors.white};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${MB_BIG_MEDIA_QUERY} {
    /* width: 342px;
    max-width: 342px; */
    height: 48px;
    max-height: 48px;
    ${fonts.HEADING_16_B};
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 25px;
  width: 100%;
  height: 56px;
`;
const ImageBox = styled.div`
  position: relative;
  border-radius: 8px;
  width: 56px;
  min-width: 56px;
  height: 56px;
`;

const EmptyProfileImage = styled.div<{ hide?: boolean }>`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${colors.gray700};
  width: 56px;
  height: 56px;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};
`;

const DefaultImage = styled.img`
  width: 36px;
  height: 36px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
  width: 100%;
`;

const SoptTagSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
  width: 100%;
  overflow-x: hidden;
  color: ${colors.gray200};

  div {
    white-space: nowrap;
  }
  @media ${MB_BIG_MEDIA_QUERY} {
    width: 100%;
    max-width: 322px;
  }
  @media ${MB_MID_MEDIA_QUERY} {
    max-width: 252px;
  }
  @media ${MB_SM_MEDIA_QUERY} {
    max-width: 212px;
  }
`;

const Badge = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  gap: 6px;
  align-items: center;
  border-radius: 6px;
  background-color: ${({ isActive }) => (isActive ? 'rgb(247 114 52 / 20%)' : colors.gray700)};
  padding: 6px;
  height: 22px;
  line-height: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 4px 6px;
    color: ${colors.gray100};
  }
`;

const BadgeActiveDot = styled.span`
  border-radius: 50%;
  background-color: ${colors.secondary};
  width: 6px;
  height: 6px;
`;
const StUserName = styled.div`
  width: 100%;
  ${fonts.BODY_16_M};
`;
const SubjectSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  width: 100%;
  height: 52px;
`;
const StSubtitle = styled.div`
  width: 100%;
  color: ${colors.gray200};
  ${fonts.BODY_13_M}
`;
const TagSection = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  margin-top: 8px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  div div {
    padding: 3px;
    padding-right: 9px;
    padding-left: 9px;
  }
`;
const StReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 100%;
`;
const StReviewTextField = styled.div`
  margin-top: 8px;
  width: 100%;
  max-height: 312px;
  ${fonts.BODY_16_M}

  overflow-y:scroll;

  @media ${MB_BIG_MEDIA_QUERY} {
    max-height: 338px;
  }
`;
