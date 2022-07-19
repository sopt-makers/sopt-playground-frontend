import styled from '@emotion/styled';
import ProjectCard from '@/components/project/main/ProjectCard';
import { FC } from 'react';
import useGetProjectListQuery from '@/components/project/upload/hooks/useGetProjectListQuery';

// dummy
import { Category, ServiceType } from '@/api/project/types';
import Text from '@/components/common/Text';
import { LinkTitle } from '@/components/project/upload/LinkForm/constants';
const THUMBNAIL_IMAGE = 'https://dummyimage.com/368x208/8040ff/ffffff';
const LOGO_IMAGE = 'https://dummyimage.com/120x120/8040ff/ffffff';

const dummy = [
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
    links: [{ title: 'website', url: 'https://zigzag.kr' }],
  },
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
    links: [{ title: 'website', url: 'https://zigzag.kr' }],
  },
];

const ProjectPage: FC = () => {
  // const { data } = useGetProjectListQuery();

  return (
    <StyledContainer>
      <StyledContent>
        <Text typography='SUIT_22_B'>{dummy.length} Projects</Text>
        <StyledGridContainer>
          {dummy.map(
            ({ category, description, generation, links, logoImage, name, serviceType, thumbnailIamge }, index) => (
              <ProjectCard
                key={index}
                category={category}
                description={description}
                generation={generation}
                links={links.map((link) => ({ ...link, title: link.title as LinkTitle }))}
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
  justify-content: center;
  width: 100%;
`;

const StyledContent = styled.div`
  justify-self: flex-start;
  margin: 64px 0 0;
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 64px;
  margin-top: 22px;
  row-gap: 30px;
`;
