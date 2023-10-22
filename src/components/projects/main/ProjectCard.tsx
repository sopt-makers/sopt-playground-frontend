import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';
import { FC } from 'react';

import { ProjectDetail } from '@/api/endpoint_LEGACY/projects/type';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { categoryLabel } from '@/components/projects/constants';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ProjectCard: FC<ProjectDetail> = ({
  id,
  name,
  category,
  generation,
  serviceType,
  summary,
  thumbnailImage,
  logoImage,
}) => {
  const { logClickEvent } = useEventLogger();

  return (
    <StyledCard href={playgroundLink.projectDetail(id)} onClick={() => logClickEvent('projectCard', { id, name })}>
      <StyledServiceTypeWrapper>
        {serviceType.map((serviceType, index) => (
          <StyledServiceType key={index}>{serviceType}</StyledServiceType>
        ))}
      </StyledServiceTypeWrapper>
      <StyledImageSection>
        {thumbnailImage ? (
          <StyledThumbnail className='card-image' src={thumbnailImage} width={380} alt='thumbnail-image' />
        ) : (
          <StyledLogo className='card-image' src={logoImage} width={380} alt='logo-image' />
        )}
      </StyledImageSection>
      <StyledContent>
        <StyledTitleWrapper>
          <Text typography='SUIT_18_B'>{name}</Text>
          <Text typography='SUIT_12_SB' color={colors.gray500}>
            {generation ? `${generation}기 ${categoryLabel[category]}` : categoryLabel[category]}
          </Text>
        </StyledTitleWrapper>
        <Text typography='SUIT_14_M' color={colors.gray300}>
          {summary}
        </Text>
      </StyledContent>
    </StyledCard>
  );
};

export default ProjectCard;

const StyledCard = styled(Link)`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 6px;
  width: 380px;
  height: 292px;

  :hover {
    & .card-image {
      transition: opacity 0.2s, scale 0.2s;
      opacity: 0.75;
      scale: 1.1;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 355px;
    height: 276px;
  }
`;

const StyledServiceTypeWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  left: 20px;
  align-items: center;
  z-index: 1;

  & > * {
    :not(:first-of-type) {
      margin-left: 6px;
    }
  }
`;

const StyledServiceType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2000px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
  background-color: rgb(252 252 252 / 70%);
  width: 54px;
  height: 23px;
  color: ${colors.gray600};
  ${textStyles.SUIT_12_B};
`;

const StyledImageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  width: 100%;
  height: 208px;
  overflow: hidden;
`;

const StyledThumbnail = styled(ResizedImage)`
  background: linear-gradient(180deg, rgb(35 35 50 / 0%) 0%, rgb(35 35 35 / 80%) 100%);
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledLogo = styled(ResizedImage)`
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
  padding: 10px 12px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
