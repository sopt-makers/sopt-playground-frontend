import styled from '@emotion/styled';
import ProjectCard, { ProjectCardProps } from '@/components/project/main/ProjectCard';
import { FC } from 'react';
import useGetProjectListQuery from '@/components/project/upload/hooks/useGetProjectListQuery';

// dummy
import { Category, ServiceType } from '@/api/project/types';
import Text from '@/components/common/Text';
import { LinkTitle } from '@/components/project/upload/LinkForm/constants';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
const THUMBNAIL_IMAGE = 'https://dummyimage.com/368x208/8040ff/ffffff';
const LOGO_IMAGE = 'https://dummyimage.com/120x120/8040ff/ffffff';

const dummy: ProjectCardProps[] = [
  {
    name: '핸디캔디',
    generation: 28,
    category: Category.APPJAM,
    description: '핸디캔디로 미래의 나에게 보상을 설정해 보아요',
    thumbnailIamge: THUMBNAIL_IMAGE,
    logoImage: LOGO_IMAGE,
    serviceType: [ServiceType.APP, ServiceType.WEB],
    links: [
      { title: 'website', url: 'https://zigzag.kr' },
      { title: 'appStore', url: 'https://zigzag.kr' },
      { title: 'googlePlay', url: 'https://zigzag.kr' },
    ],
  },
  {
    name: '핸디캔디',
    generation: 28,
    category: Category.APPJAM,
    description: '핸디캔디로 미래의 나에게 보상을 설정해 보아요',
    logoImage: LOGO_IMAGE,
    serviceType: [ServiceType.WEB],
    links: [{ title: 'github', url: 'https://zigzag.kr' }],
  },
  {
    name: '쿠키파킹',
    generation: 27,
    category: Category.APPJAM,
    description: '나만의 파킹랏',
    thumbnailIamge: THUMBNAIL_IMAGE,
    logoImage: LOGO_IMAGE,
    serviceType: [ServiceType.APP, ServiceType.WEB],
    links: [
      { title: 'website', url: 'https://zigzag.kr' },
      { title: 'appStore', url: 'https://fashionbykakao.kr' },
      { title: 'googlePlay', url: 'https://zigzag.kr' },
    ],
  },
  {
    name: '핸디캔디',
    generation: 28,
    category: Category.APPJAM,
    description: '핸디캔디로 미래의 나에게 보상을 설정해 보아요',
    logoImage: LOGO_IMAGE,
    serviceType: [ServiceType.WEB],
    links: [{ title: 'github', url: 'https://zigzag.kr' }],
  },
];

const ProjectPage: FC = () => {
  const { data } = useGetProjectListQuery();

  return (
    <StyledContainer>
      <StyledContent>
        <StyledLength typography='SUIT_22_B'>{dummy.length} Projects</StyledLength>
        <StyledGridContainer>
          {dummy.map(
            ({ category, description, generation, links, logoImage, name, serviceType, thumbnailIamge }, index) => (
              <ProjectCard
                key={index}
                category={category}
                description={description}
                generation={generation}
                links={links}
                logoImage={logoImage}
                name={name}
                serviceType={serviceType}
                thumbnailIamge={thumbnailIamge}
              />
            ),
          )}
        </StyledGridContainer>
      </StyledContent>
    </StyledContainer>
  );
};

export default ProjectPage;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px 10px;
  }
`;

const StyledContent = styled.div`
  justify-self: flex-start;
  margin: 64px 0 0;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
  }
`;

const StyledLength = styled(Text)`
  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  margin-top: 22px;
  row-gap: 64px;

  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: start;
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: start;
    column-gap: 0;
    row-gap: 24px;
  }
`;
