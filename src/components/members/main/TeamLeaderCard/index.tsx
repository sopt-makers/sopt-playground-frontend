import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button } from '@sopt-makers/ui';
import { m } from 'framer-motion';
import { useRouter } from 'next/router';

import Text from '@/components/common/Text';
import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { useVisibleBadges } from '@/components/members/main/hooks/useVisibleBadges';
import MemberProfileImage from '@/components/members/main/MemberCard/MemberProfileImage';
import { LATEST_GENERATION } from '@/constants/generation';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
// TODO: API 연동 후 optional 제거
interface TeamLeaderCardProps {
  id: number;
  name: string;
  university: string | null;
  profileImageUrl: string;
  activities: {
    id: number;
    generation: number;
    part: string;
    team: string | null;
  }[];
  introduction: string | null;
  teamLeaderElectionDataUrl?: string;
  notionIntroductionUrl?: string;
  isLoading?: boolean;
  selfIntroduction: string;
  competitionData: string;
}
const ELLIPSIS_WIDTH = 26;
const BADGE_GAP = 4;

const TeamLeaderCard = ({
  id,
  name,
  university,
  profileImageUrl,
  activities,
  introduction,
  selfIntroduction,
  competitionData,
}: TeamLeaderCardProps) => {
  const router = useRouter();
  const { logClickEvent } = useEventLogger();
  const sortedGenerationActivities = activities?.sort((a, b) => b.generation - a.generation) || []; // TODO: || [] 테스트 후 삭제
  const badges = sortedGenerationActivities.map((activity) => ({
    content: `${activity.generation}기 ${activity.part}`,
    isActive: activity.generation === LATEST_GENERATION,
  }));

  const { visibleBadges, isBadgeOverflow, badgeRefs, badgeWrapperRef } = useVisibleBadges(
    badges,
    ELLIPSIS_WIDTH,
    BADGE_GAP,
  );

  function useDetectWebView() {
    const userAgent = navigator.userAgent;

    // iOS 웹뷰 감지
    const isIOS = /iPhone|iPad|iPod/.test(userAgent);
    const isWebKit = /AppleWebKit/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) || /Version\/[\d.]+.*Safari/.test(userAgent);
    const isNotCriOS = !/CriOS/.test(userAgent);
    const isNotFxiOS = !/FxiOS/.test(userAgent);

    const isIOSWebView =
      isIOS && isWebKit && isNotCriOS && isNotFxiOS && !isSafari && /SOPT-iOS/.test(navigator.userAgent);

    // Android 웹뷰 감지
    const isAndroid = /Android/.test(userAgent);

    // Android 웹뷰 감지 방법:
    // 2. User-Agent에 "wv"가 있으면 웹뷰 (기존 방법)
    // 3. User-Agent가 정확히 "Chrome/56.0.0.0 Mobile"이면 앱에서 설정한 값이므로 웹뷰

    const hasWvInUserAgent = /wv/.test(userAgent);
    const isChrome56Mobile = /Chrome\/56\.0\.0\.0 Mobile/.test(userAgent);
    const isAndroidWebView = isAndroid && (hasWvInUserAgent || isChrome56Mobile);

    return {
      isWebView: isIOSWebView || isAndroidWebView,
      isIOSWebView,
      isAndroidWebView,
      isIOS,
      isAndroid,
    };
  }

  const openNotionUrl = (url: string) => {
    const notionDeepLinkUrl = url.replace('https://', 'notion://');
    const originalUrl = url;
    const webViewInfo = useDetectWebView();

    // 웹뷰 환경이면 원래 URL 사용 (window.location.href 사용)
    if (webViewInfo.isWebView) {
      // iOS/Android 웹뷰에서는 window.open이 차단될 수 있으므로 window.location.href 사용
      window.location.href = originalUrl;
      return;
    }

    // 일반 브라우저에서 노션 앱 열기 시도
    try {
      // 숨겨진 링크로 노션 앱 열기 시도
      const link = document.createElement('a');
      link.href = notionDeepLinkUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 일정 시간 후에도 페이지가 포커스를 잃지 않았다면 앱이 열리지 않은 것으로 간주하고 원래 URL로 fallback
      setTimeout(() => {
        if (document.hasFocus()) {
          window.open(originalUrl, '_blank');
        }
      }, 1000);
    } catch (error) {
      // 에러 발생 시 원래 URL로 fallback
      window.open(originalUrl, '_blank');
    }
  };

  const handleClickIntroduce = () => {
    logClickEvent('TL_introduce');
    // TODO: API 연동 후 자기 소개 페이지 이동 로직 추가
    openNotionUrl(selfIntroduction);
  };

  const handleClickAppjamData = () => {
    logClickEvent('TL_appjam');
    // TODO: API 연동 후 경선 자료 페이지 이동 로직 추가
    openNotionUrl(competitionData);
  };

  const handleClickCard = () => {
    logClickEvent('memberCard', { id, name, screen: 'TL' });
    router.push(`/members/${id}`);
  };

  return (
    <LoggingImpression eventKey='memberCard' param={{ id, name, screen: 'TL' }}>
      <MotionMemberCard whileHover='hover' onClick={handleClickCard}>
        <ContentWrapper>
          <ImageWrapper>
            <MemberProfileImage isLoading={false} imageUrl={profileImageUrl} size='sm' />
          </ImageWrapper>
          <ContentArea>
            <TitleBox>
              <Text typography='SUIT_18_SB'>{name}</Text>
              <Text typography='SUIT_12_SB' color={colors.gray200}>
                {university}
              </Text>
            </TitleBox>

            <BadgesBox ref={badgeWrapperRef}>
              <Badges>
                {visibleBadges?.map((badge, idx) => (
                  <Badge
                    ref={(el: HTMLDivElement) => (badgeRefs.current[idx] = el)}
                    key={idx}
                    isActive={badge.isActive}
                  >
                    {badge.isActive && <BadgeActiveDot />}
                    <Text typography='SUIT_11_SB' color={badge.isActive ? colors.secondary : colors.gray200}>
                      {badge.content}
                    </Text>
                  </Badge>
                ))}
                {isBadgeOverflow && (
                  <Badge isActive={false}>
                    <Text typography='SUIT_11_SB'>...</Text>
                  </Badge>
                )}
              </Badges>
            </BadgesBox>
            <Intro typography='SUIT_13_M' color={colors.gray200}>
              {introduction}
            </Intro>
          </ContentArea>
        </ContentWrapper>
        <ButtonWrapper onClick={(e) => e.stopPropagation()}>
          <Button variant='fill' theme='black' style={{ width: '100%' }} onClick={handleClickIntroduce}>
            자기 소개 보기
          </Button>
          <Button variant='fill' theme='white' style={{ width: '100%' }} onClick={handleClickAppjamData}>
            경선 자료 보기
          </Button>
        </ButtonWrapper>
      </MotionMemberCard>
    </LoggingImpression>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
const Intro = styled(Text)`
  display: ${'-webkit-box'};
  margin-top: 8px;
  width: 100%;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    font-size: 13px;
    font-weight: 600;
    -webkit-line-clamp: 1;
  }
`;

const BadgeActiveDot = styled.span`
  border-radius: 50%;
  background-color: ${colors.secondary};
  width: 6px;
  height: 6px;
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
const Badges = styled.div`
  display: flex;
  gap: ${BADGE_GAP}px;
  width: fit-content;
  height: 22px;
`;

const BadgesBox = styled.div`
  position: relative;
  margin-top: 8px;
  overflow-x: hidden;
`;
const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
const TitleBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    min-height: unset;
  }
`;

const MotionMemberCard = styled(m.div)`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  transition: box-shadow 0.3s;
  border-radius: 16px;
  background-color: ${colors.gray900};
  cursor: pointer;
  padding: 16px 20px;
  width: 316px;
  @media ${MOBILE_MEDIA_QUERY} {
    position: relative;
    border-radius: 10px;
    width: 100%;
  }
`;
export default TeamLeaderCard;
