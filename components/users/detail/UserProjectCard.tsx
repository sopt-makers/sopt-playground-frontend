import styled from '@emotion/styled';
import { FC } from 'react';

import Text from '@/components/common/Text';
import { categoryLabel } from '@/components/projects/upload/constants';
import { Category, ServiceType } from '@/components/projects/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export interface UserProjectCardProps {
  serviceType: ServiceType[];
  name: string;
  category: Category;
  generation?: number;
  summary: string;
  thumbnailImage?: string;
  logoImage: string;
}

const MemberProjectCard: FC<UserProjectCardProps> = ({
  name,
  category,
  generation,
  serviceType,
  summary,
  thumbnailImage,
  logoImage,
}) => {
  const serviceTypeMap = {
    웹: 'WEB',
    앱: 'APP',
  };

  return (
    <StyledCard>
      <StyledServiceTypeWrapper>
        {serviceType.map((item, index) => (
          <StyledServiceType key={index}>{serviceTypeMap[item]}</StyledServiceType>
        ))}
      </StyledServiceTypeWrapper>
      <StyledImageSection>
        {thumbnailImage ? (
          <StyledThumbnail className='card-image' src={thumbnailImage} alt='thumbnail-image' />
        ) : (
          <StyledLogo className='card-image' src={logoImage} alt='logo-image' />
        )}
      </StyledImageSection>
      <StyledContent>
        <StyledTitleWrapper>
          <Text typography='SUIT_18_B'>{name}</Text>
          <Text typography='SUIT_12_SB' color={colors.gray100}>
            {generation ? `${generation}기 ${categoryLabel[category]}` : categoryLabel[category]}
          </Text>
        </StyledTitleWrapper>
        <Text typography='SUIT_14_M' color={colors.gray60}>
          {summary}
        </Text>
      </StyledContent>
    </StyledCard>
  );
};

export default MemberProjectCard;

const StyledCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 24px;
  background-color: ${colors.black80};
  cursor: pointer;
  width: 381px;
  height: 317px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 355px;
    height: 276px;
  }
`;

const StyledServiceTypeWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  left: 21.5px;
  align-items: center;
  z-index: 1;

  & > * {
    :not(:first-child) {
      margin-left: 6px;
    }
  }
`;

const StyledServiceType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2000px;
  background: rgb(0 0 0 / 15%);
  backdrop-filter: blur(5px);
  width: 53px;
  height: 23px;
  ${textStyles.SUIT_12_B};
`;

const StyledImageSection = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 216px;
`;

const StyledThumbnail = styled.img`
  border-radius: 24px 24px 0 0;
  width: 100%;
  height: 100%;
`;

const StyledLogo = styled.img`
  margin: 44px 0 0;
  border-radius: 20px;
  width: 120px;
  height: 120px;
`;

const StyledContent = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 18px 28px 19px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
