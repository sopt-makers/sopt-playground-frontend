import Text from '@/components/common/Text';
import { categoryLabel } from '@/components/project/upload/constants';
import { Category, ServiceType } from '@/components/project/upload/types';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { FC } from 'react';

interface ProjectCardProps {
  serviceType: ServiceType[];
  name: string;
  category: Category;
  generation: number;
  description: string;
  thumbnailIamge?: string;
  logoImage: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  category,
  generation,
  serviceType,
  description,
  thumbnailIamge,
  logoImage,
}) => {
  return (
    <StyledCard>
      <StyledServiceTypeWrapper>
        {serviceType.map((item, index) => (
          <StyledServiceType key={index}>{item}</StyledServiceType>
        ))}
      </StyledServiceTypeWrapper>
      <StyledImageSection>
        {thumbnailIamge ? (
          <StyledThumbnail src={thumbnailIamge} alt='thumbnail-image' />
        ) : (
          <StyledLogo src={logoImage} alt='logo-image' />
        )}
        {/* <StyledServiceLink></StyledServiceLink> */}
      </StyledImageSection>
      <StyledContent>
        <StyledTitleWrapper>
          <Text typography='SUIT_18_B'>{name}</Text>
          <Text typography='SUIT_12_SB' color={colors.gray100}>{`${generation}기 ${categoryLabel[category]}`}</Text>
        </StyledTitleWrapper>
        <Text typography='SUIT_14_M' color={colors.gray60}>
          {description}
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
`;

const StyledServiceTypeWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  left: 20px;
  align-items: center;

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

  /* position: relative; */
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 208px;
`;

const StyledServiceLink = styled.div`
  display: flex;
  bottom: 16px;
  align-items: center;
  justify-content: center;
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
