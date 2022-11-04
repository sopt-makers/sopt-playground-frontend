import styled from '@emotion/styled';
import { FC } from 'react';

import { ProjectLink } from '@/api/projects/type';
import Text from '@/components/common/Text';
import { categoryLabel } from '@/components/projects/upload/constants';
import { LinkTitle } from '@/components/projects/upload/LinkForm/constants';
import { Category, ServiceType } from '@/components/projects/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const getLinkInfo = (title: LinkTitle) => {
  switch (title) {
    case 'website':
      return { icon: '/icons/icon-web.svg', label: '서비스 바로가기' };
    case 'googlePlay':
      return { icon: '/icons/icon-playstore.svg', label: 'Google Play' };
    case 'appStore':
      return { icon: '/icons/icon-appstore.svg', label: 'App Store' };
    case 'github':
      return { icon: '/icons/icon-github.svg', label: 'Github' };
  }
};

export interface ProjectCardProps {
  serviceType: ServiceType[];
  name: string;
  category: Category;
  generation?: number;
  summary: string;
  thumbnailImage?: string;
  logoImage: string;
  links: ProjectLink[];
  onClick: () => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  category,
  generation,
  serviceType,
  summary,
  thumbnailImage,
  logoImage,
  links,
  onClick,
}) => {
  return (
    <StyledCard onClick={onClick}>
      <StyledServiceTypeWrapper>
        {serviceType.map((serviceType, index) => (
          <StyledServiceType key={index}>{serviceType}</StyledServiceType>
        ))}
      </StyledServiceTypeWrapper>
      <StyledImageSection>
        {thumbnailImage ? (
          <StyledThumbnail className='card-image' src={thumbnailImage} alt='thumbnail-image' />
        ) : (
          <StyledLogo className='card-image' src={logoImage} alt='logo-image' />
        )}
        <ServiceLinkWrapper className='card-hover'>
          {links?.map(({ linkTitle, linkUrl }, index) => (
            <StyledServiceLink key={index} href={linkUrl} onClick={(e) => e.stopPropagation()}>
              <StyledLinkIcon alt='link-icon' src={getLinkInfo(linkTitle as LinkTitle)?.icon} />
              <Text typography='SUIT_12_SB'>{getLinkInfo(linkTitle as LinkTitle)?.label}</Text>
            </StyledServiceLink>
          ))}
        </ServiceLinkWrapper>
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

export default ProjectCard;

const StyledCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${colors.black80};
  cursor: pointer;
  padding: 6px;
  width: 380px;
  height: 292px;

  :hover {
    & .card-hover {
      transition: visibility 0.3s linear, opacity 0.3s linear;
      visibility: visible;
      opacity: 1;
    }

    & .card-image {
      transition: opacity 0.2s;
      opacity: 0.8;
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
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
  background-color: rgb(252 252 252 / 70%);
  width: 54px;
  height: 23px;
  color: ${colors.black40};
  ${textStyles.SUIT_12_B};
`;

const StyledImageSection = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 208px;
`;

const ServiceLinkWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 60px;
  gap: 16px;
  visibility: hidden;
  opacity: 0;
`;

const StyledLinkIcon = styled.img`
  width: 54px;
  height: 54px;
`;

const StyledServiceLink = styled.a`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const StyledThumbnail = styled.img`
  border-radius: 6px;
  background: linear-gradient(180deg, rgb(35 35 50 / 0%) 0%, rgb(35 35 35 / 80%) 100%);
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
  padding: 10px 12px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
