import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { deleteProject } from '@/api/endpoint_LEGACY/projects';
import useConfirm from '@/components/common/Modal/useConfirm';
import MemberBlock from '@/components/members/common/MemberBlock';
import { getLinkInfo } from '@/components/projects/constants';
import { MemberRoleInfo } from '@/components/projects/constants';
import ProjectImageSlider from '@/components/projects/main/ProjectImageSlider';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import useGetProjectQuery from '@/components/projects/upload/hooks/useGetProjectQuery';
import { playgroundLink } from '@/constants/links';
import IconTrashcan from '@/public/icons/icon-trashcan.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const memberRoleOrder = [
  'TEAMLEADER',
  'MAINPM',
  'PM',
  'TEAMIMPROVEMENT',
  'DESIGN',
  'WEB',
  'SERVER',
  'ANDROID',
  'IOS',
] as const;
const sortByRole = <T extends { memberRole: (typeof memberRoleOrder)[number] }>(projectMembers: T[]): T[] =>
  [...projectMembers].sort((x, y) => memberRoleOrder.indexOf(x.memberRole) - memberRoleOrder.indexOf(y.memberRole));

interface ProjectDetailProps {
  projectId: string;
}

const ProjectDetail: FC<ProjectDetailProps> = ({ projectId }) => {
  const router = useRouter();

  const { data: project } = useGetProjectQuery({ id: projectId });
  const { data: me } = useGetMemberOfMe();
  const { refetch } = useGetProjectListQuery();

  const startAt = dayjs(project?.startAt).format('YYYY-MM');
  const endAt = project?.endAt ? dayjs(project.endAt).format('YYYY-MM') : '';
  const mainImage = project?.images[0];
  const sortedMembers = useMemo(() => sortByRole([...(project?.members ?? [])]), [project]);

  const { confirm } = useConfirm();

  const askDelete = async () => {
    const result = await confirm({
      title: '프로젝트 삭제',
      description: '프로젝트를 정말 삭제하시겠어요?',
      okButtonText: '삭제',
      okButtonColor: colors.error,
      cancelButtonText: '취소',
    });

    if (result) {
      handleDeleteProject();
    }
  };

  const handleDeleteProject = async () => {
    if (project) {
      await deleteProject(project.id);
      refetch();
      router.push(playgroundLink.projectList());
    }
  };

  return (
    <Container>
      <Header>
        <ServiceTypeWrapper>
          {project?.serviceType.map((type) => (
            <ServiceType key={type}>{type}</ServiceType>
          ))}
        </ServiceTypeWrapper>
        <ServiceInfoWrapper>
          <LogoImageWrapper>
            <LogoImage src={project?.logoImage} alt={project?.name} />
          </LogoImageWrapper>
          <InfoWrapper>
            <Name>{project?.name}</Name>
            <Description>{project?.summary}</Description>
            <StartEndAtWrapper>
              <StartEndAt>{startAt}</StartEndAt>
              {endAt ? <StartEndAt> - {endAt}</StartEndAt> : <InProgress>진행 중</InProgress>}
            </StartEndAtWrapper>
            <MobileServiceTypeWrapper>
              {project?.serviceType.map((type) => (
                <ServiceType key={type}>{type}</ServiceType>
              ))}
            </MobileServiceTypeWrapper>
          </InfoWrapper>
          {project?.writerId === me?.id && (
            <ControlWrapper>
              <div onClick={() => project && router.push(playgroundLink.projectEdit(project.id))}>수정하기</div>
              <div onClick={askDelete}>
                <IconTrashcan />
              </div>
            </ControlWrapper>
          )}
        </ServiceInfoWrapper>
      </Header>

      {project?.images.length === 1 && (
        <MainImageWrapper>
          <MainImage src={mainImage} alt={project?.name} />
        </MainImageWrapper>
      )}
      {(project?.images ?? []).length > 1 && <StyledProjectImageSlider images={project?.images ?? []} />}

      <ProjectDetailContainer>
        <DetailContainer>
          <DetailTitle>Project Overview</DetailTitle>
          <DetailWrapper>{project?.detail}</DetailWrapper>
          <LinksWrapper>
            {project?.links.map((link) => (
              <LinkBox key={link.linkUrl} href={link.linkUrl}>
                <LinkIcon key={link.linkId} src={getLinkInfo(link.linkTitle).icon} alt='link_icon' />
                {link.linkTitle}
              </LinkBox>
            ))}
          </LinksWrapper>
        </DetailContainer>

        <UserWrapper>
          <UserInfoWrapper>
            {project?.generation && <Info>{project.generation}기</Info>}
            <Info>{project?.category}</Info>
          </UserInfoWrapper>
          <UserList>
            <UserNameList>
              {sortedMembers.map((member) => {
                const badges = [];
                if (member.memberGenerations.length > 0) {
                  badges.push(member.memberGenerations.map(String).join(', ') + '기');
                }

                return (
                  <Link key={member.memberId} href={playgroundLink.memberDetail(member.memberId)}>
                    <MemberBlock
                      name={member.memberName}
                      position={MemberRoleInfo[member.memberRole]}
                      imageUrl={member.memberProfileImage}
                      badges={badges ?? []}
                    />
                  </Link>
                );
              })}
            </UserNameList>
          </UserList>
        </UserWrapper>
      </ProjectDetailContainer>

      <MobileLinksWrapper>
        {project?.links.map((link) => (
          <LinkBox key={link.linkUrl} href={link.linkUrl}>
            <LinkIcon key={link.linkId} src={getLinkInfo(link.linkTitle).icon} alt='link_icon' />
            {link.linkTitle}
          </LinkBox>
        ))}
      </MobileLinksWrapper>
    </Container>
  );
};

export default ProjectDetail;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 40px;
  }
`;
const Header = styled.section`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 66px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;
const ServiceTypeWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 194px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const MobileServiceTypeWrapper = styled.div`
  display: none;
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 0;
  }
`;

const ServiceType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2000px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
  background-color: white;
  padding: 6px 12px;
  color: ${colors.gray600};
  ${textStyles.SUIT_12_B};

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 12px;
  }
`;
const ServiceInfoWrapper = styled.div`
  display: flex;
  gap: 44px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
    padding: 28px 20px 0;
  }
`;
const LogoImageWrapper = styled.div`
  flex-shrink: 0;
  border-radius: 20px;
  width: 150px;
  height: 150px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 80px;
    height: 80px;
  }
`;
const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ControlWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: auto;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: ${colors.gray600};
    cursor: pointer;
    height: 48px;

    &:first-child {
      width: 111px;
      @media ${MOBILE_MEDIA_QUERY} {
        width: 100%;
      }
    }

    &:last-child {
      width: 48px;
      min-width: 48px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;
const Name = styled.h2`
  margin-bottom: 18px;
  line-height: 100%;
  font-size: 44px;
  font-weight: 700;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 12px;
    font-size: 24px;
  }
`;
const Description = styled.p`
  margin-bottom: 32px;
  line-height: 100%;
  font-size: 24px;
  font-weight: 400;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 18px;
    font-size: 14px;
  }
`;
const StartEndAtWrapper = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 16px;
  }
`;
const StartEndAt = styled.span`
  display: inline-block;
  line-height: 100%;
  color: ${colors.gray300};
  font-size: 18px;
  font-weight: 500;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 12px;
  }
`;
const InProgress = styled.span`
  margin-left: 12px;
  line-height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 800;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 8px;
    font-size: 12px;
  }
`;
const MainImageWrapper = styled.section`
  margin-bottom: 54px;
  border-radius: 12px;
  width: 100%;
  height: 675px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 0;
    border-radius: 0;
    height: 210px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StyledProjectImageSlider = styled(ProjectImageSlider)`
  margin-bottom: 54px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 0;
  }
`;

const ProjectDetailContainer = styled.section`
  display: flex;
  gap: 32px;
  padding-bottom: 200px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column-reverse;
    gap: 0;
    padding: 0;
  }
`;
const DetailContainer = styled.div`
  border-radius: 12px;
  background: ${colors.gray800};
  padding: 48px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    padding: 36px 24px;
  }
`;
const DetailTitle = styled.h3`
  margin-bottom: 32px;
  line-height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 800;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
    font-size: 16px;
  }
`;
const DetailWrapper = styled.div`
  margin-bottom: 54px;
  line-height: 180%;
  white-space: pre-wrap; /* or pre-line */
  font-size: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    font-size: 14px;
  }
`;
const LinksWrapper = styled.div`
  display: flex;
  gap: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const MobileLinksWrapper = styled.div`
  display: none;
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 32px 26px;
    padding: 48px 40px;
  }
`;
const LinkBox = styled.a`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  line-height: 160%;
  color: ${colors.gray300};
  font-size: 14px;
  font-weight: 500;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 12px;
  }
`;

const LinkIcon = styled.img`
  border-radius: 100%;
  background-color: ${colors.gray700};
  width: 72px;
  height: 72px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 54px;
    height: 54px;
  }
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${colors.gray800};
  padding: 48px 28px;
  height: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    background-color: transparent;
    padding: 24px 28px 36px;
  }
`;
const UserInfoWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 36px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
    margin-bottom: 28px;
  }
`;
const Info = styled.div`
  line-height: 100%;
  font-size: 18px;
  font-weight: 800;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 14px;
  }
`;
const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 26px;
  }
`;
const UserNameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
