import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Text from '@/components/common/Text';
import ProfileIcon from 'public/icons/icon-profile.svg';
import { css } from '@emotion/react';
import ResizedImage from '@/components/common/ResizedImage';

export const MemberCard = () => {
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
