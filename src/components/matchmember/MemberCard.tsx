import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Text from '@/components/common/Text';
import ProfileIcon from 'public/icons/icon-profile.svg';
import ResizedImage from '@/components/common/ResizedImage';
import { useGetRecommendations } from '@/api/endpoint/members/getRecommendations';
import { useEffect, useState } from 'react';
import { Skeleton, useToast } from '@sopt-makers/ui';
import { playgroundLink } from '@/constants/links';
import { useRouter } from 'next/router';
import NonIcon from '@/public/icons/img/popup/member_match_search.svg';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { useRunOnce } from '@/hooks/useRunOnce';
import axios from 'axios';

export const MemberCard = () => {
  const { data, isPending, isError, error } = useGetRecommendations();
  const [_isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();
  const { logImpressionEvent } = useEventLogger();
  const { open: toastOpen } = useToast();

  useRunOnce(() => {
    logImpressionEvent('feedCard', { screen: '기획경선 홈팝업' });
  }, []);

  useEffect(() => {
    if (isError) {
      const status =
        axios.isAxiosError(error) && !!error.response && typeof error.response.status === 'number'
          ? error.response.status
          : null;

      const errorMessage =
        status === 400 ? `밸런스게임을 먼저 진행해주세요` : `데이터를 불러오는 중 오류가 발생했습니다.`;
      toastOpen({ icon: 'error', content: errorMessage });
    }
  }, [isError, error]);

  if (isPending)
    return (
      <CardWrapper>
        <Text typography='SUIT_12_SB' color='#ADC8E9'>
          케미 UP!
        </Text>
        <CardContent>
          <Skeleton width={108} height={108} variant='circular' />
          <Tag>
            <Skeleton width={80} height={20} />
          </Tag>
          <InfoBox>
            <Skeleton width={40} height={30} /> <Skeleton width={90} height={30} />
          </InfoBox>
          <BadgeContainer>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} width={40} height={22} />
            ))}
          </BadgeContainer>
          <BackgroundBlur />
        </CardContent>
      </CardWrapper>
    );

  const member = data?.recommendations?.[0];
  if (!member)
    return (
      <NonWrapper>
        <NonIcon />
        <Text typography='SUIT_14_SB' color={colors.gray400}>
          {`아직 나와 맞는 멤버가 나타나지 않았어요.\n다른 멤버들을 살펴볼까요?`}
        </Text>
      </NonWrapper>
    );

  return (
    <CardWrapper onClick={() => router.push(playgroundLink.memberDetail(member.id))}>
      <Text typography='SUIT_12_SB' color='#ADC8E9'>
        케미 UP!
      </Text>
      <CardContent>
        <ImageBox>
          {member.profileImage ? (
            <ResizedProfileImage src={member.profileImage} onLoad={() => setIsImageLoaded(true)} width={108} />
          ) : (
            <EmptyProfileImage>
              <ProfileIcon />
            </EmptyProfileImage>
          )}
        </ImageBox>
        <Tag>
          <Circle />
          {member.activity?.generation}기 {member.activity?.part}
        </Tag>
        <InfoBox>
          <Text typography='SUIT_20_SB' color={colors.gray10}>
            {member.name}
          </Text>
          {member.university && (
            <Text typography='SUIT_12_SB' color={colors.gray200}>
              {member.university}
            </Text>
          )}
        </InfoBox>
        <BadgeContainer>
          {member.workPreference &&
            Object.entries(member.workPreference).map(([key, value]) => <Badge key={key}>{value}</Badge>)}
        </BadgeContainer>
        <BackgroundBlur />
      </CardContent>
    </CardWrapper>
  );
};

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

const ResizedProfileImage = styled(ResizedImage)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

  color: ${colors.gray200};
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

const NonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${colors.gray800};
  padding: 16px;
  width: 339px;
  height: 285px;

  & > span {
    text-align: center;
    white-space: pre-wrap;
  }
`;
