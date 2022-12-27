import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { MemberProject } from '@/api/members/type';
import { categoryLabel } from '@/components/projects/upload/constants';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const MemberProjectCard: FC<MemberProject> = ({
  id,
  name,
  category,
  generation,
  serviceType,
  summary,
  thumbnailImage,
  logoImage,
}) => {
  return (
    <Link passHref href={playgroundLink.projectDetail(id)} legacyBehavior>
      <StyledCard>
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
        </StyledImageSection>
        <StyledContent>
          <StyledTitleWrapper>
            <Title>{name}</Title>
            <Generation>
              {generation ? `${generation}기 ${categoryLabel[category]}` : categoryLabel[category]}
            </Generation>
          </StyledTitleWrapper>
          <Summary>{summary}</Summary>
        </StyledContent>
      </StyledCard>
    </Link>
  );
};

export default MemberProjectCard;

const StyledCard = styled.a`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 24px;
  background-color: ${colors.black80};
  cursor: pointer;
  width: 381px;
  height: 317px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px;
    width: 100%;
    height: 277px;
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
    :not(:first-of-type) {
      margin-left: 6px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    top: 17.36px;
    left: 18.44px;
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
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 1711.29px;
  }
`;

const StyledImageSection = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 216px;
  @media ${MOBILE_MEDIA_QUERY} {
    height: 188.74px;
  }
`;

const StyledThumbnail = styled.img`
  border-radius: 24px 24px 0 0;
  width: 100%;
  height: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px 20px 0 0;
  }
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
  @media ${MOBILE_MEDIA_QUERY} {
    padding: 21.4px 19.89px 24.02px 20.77px;
  }
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  line-height: 100%;
  font-size: 20px;
  font-weight: 700;
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 16px;
  }
`;

const Generation = styled.div`
  line-height: 100%;
  letter-spacing: -0.01em;
  color: ${colors.gray60};
  font-size: 12px;
  font-weight: 500;
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 14px;
  }
`;

const Summary = styled.div`
  margin-top: 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: ${colors.gray80};
  font-size: 14px;
  font-weight: 500;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12.83px;
  }
`;
