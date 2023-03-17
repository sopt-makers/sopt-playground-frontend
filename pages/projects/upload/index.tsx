import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetMemberOfMe, useGetProjectById } from '@/api/hooks';
import { putProject } from '@/api/projects';
import AuthRequired from '@/components/auth/AuthRequired';
import Button from '@/components/common/Button';
import useToast from '@/components/common/Toast/useToast';
import { categoryLabel, FORM_ITEMS, PROJECT_DEFAULT_VALUES } from '@/components/projects/upload/constants';
import FormStatus from '@/components/projects/upload/FormStatus';
import useCreateProjectMutation from '@/components/projects/upload/hooks/useCreateProjectMutation';
import { LinkFormType } from '@/components/projects/upload/LinkForm/constants';
import { MemberFormType } from '@/components/projects/upload/MemberForm/constants';
import ProjectCategory from '@/components/projects/upload/ProjectCategory';
import ProjectDetail from '@/components/projects/upload/ProjectDetail';
import ProjectGeneration from '@/components/projects/upload/ProjectGeneration';
import ProjectImageSection from '@/components/projects/upload/ProjectImageSection';
import ProjectLink from '@/components/projects/upload/ProjectLink';
import ProjectMembers from '@/components/projects/upload/ProjectMemebers';
import ProjectName from '@/components/projects/upload/ProjectName';
import ProjectPeriod from '@/components/projects/upload/ProjectPeriod';
import ProjectReleaseMembers from '@/components/projects/upload/ProjectReleaseMembers';
import ProjectServiceType from '@/components/projects/upload/ProjectServiceType';
import ProjectStatus from '@/components/projects/upload/ProjectStatus';
import ProjectSummary from '@/components/projects/upload/ProjectSummary';
import { projectSchema } from '@/components/projects/upload/schema';
import { Category, FormItem, Generation, Period, ServiceType, Status } from '@/components/projects/upload/types';
import { convertPeriodFormat, convertPeriodFormatReverse } from '@/components/projects/upload/utils';
import { playgroundLink } from '@/constants/links';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

export interface ProjectUploadForm {
  name: string;
  generation: Generation;
  category: Category;
  status: Status;
  members: MemberFormType[];
  releaseMembers: MemberFormType[];
  serviceType: ServiceType[];
  period: Period;
  summary: string;
  detail: string;
  logoImage: string;
  thumbnailImage: string;
  projectImage: string;
  links: LinkFormType[];
}

const ProjectUploadPage: FC = () => {
  const { data: myProfileData } = useGetMemberOfMe();
  const { mutate } = useCreateProjectMutation();
  const queryClient = useQueryClient();
  const methods = useForm<ProjectUploadForm>({
    resolver: yupResolver(projectSchema),
    defaultValues: PROJECT_DEFAULT_VALUES,
    mode: 'onChange',
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { dirtyFields },
  } = methods;
  const category = watch('category');
  const formItems = FORM_ITEMS.filter((formItem) => formItem.isRequired)
    .map((formItem) => ({
      ...formItem,
      isDirty: formItem.isDirty(dirtyFields, methods.getValues()),
    }))
    .reduce(
      (acc: Array<Omit<FormItem, 'isDirty'> & { isDirty: boolean }>, cur) =>
        cur.value === 'members'
          ? [...acc, { ...cur, label: `${categoryLabel?.[category] ?? ''} 팀원` }]
          : [...acc, cur],
      [],
    );
  const toast = useToast();
  const router = useRouter();

  const { query } = useStringRouterQuery(['id', 'edit'] as const);
  const isEditPage = query?.edit === 'true' ? true : false;
  const uploadType = isEditPage ? '수정' : '등록';
  const postId = query?.id;
  const { data: project } = useGetProjectById(postId);

  const onSubmit = async (data: ProjectUploadForm) => {
    const notify = confirm(`프로젝트를 ${uploadType} 하시겠습니까?`);
    const members: ProjectUploadForm['members'] = [...data.members, ...(data.releaseMembers ?? [])].map(
      ({ isTeamMember, memberDescription, memberRole, searchedMember }) => ({
        isTeamMember,
        memberRole,
        memberDescription,
        memberGeneration: searchedMember?.generation ?? 0,
        memberId: searchedMember?.id ?? 0,
        memberName: searchedMember?.name ?? '',
      }),
    );

    if (notify && myProfileData) {
      const input = {
        name: data.name,
        generation: data.generation.checked ? undefined : data.generation.generation,
        category: data.category,
        detail: data.detail,
        summary: data.summary,
        serviceType: data.serviceType,
        startAt: convertPeriodFormat(data.period.startAt),
        endAt: !data.period.isOngoing ? convertPeriodFormat(data.period.endAt) : undefined,
        isAvailable: data.status.isAvailable,
        isFounding: data.status.isFounding,
        images: data.projectImage ? [data.projectImage] : [],
        logoImage: data.logoImage,
        thumbnailImage: data.thumbnailImage,
        members,
        links: data.links,
        writerId: myProfileData.id,
      };
      if (isEditPage && postId) {
        await putProject({ id: Number(postId), data: input });
        router.push(playgroundLink.projectList());
        queryClient.invalidateQueries('getProjectListQuery');
        queryClient.invalidateQueries('getProjectQuery');
      } else if (!isEditPage && !postId) {
        mutate(input, {
          onSuccess: () => {
            toast.show({ message: '프로젝트가 성공적으로 업로드 되었습니다.' });
            router.push(playgroundLink.projectList());
            queryClient.invalidateQueries('getProjectListQuery');
          },
        });
      }
    }
  };

  useEffect(() => {
    if (isEditPage && postId && project) {
      setValue('name', project.name);
      if (project.generation) {
        setValue('generation', { generation: project.generation, checked: false });
      } else {
        setValue('generation', { checked: true });
      }
      setValue('category', project.category);
      setValue('status.isAvailable', project.isAvailable);
      setValue('status.isFounding', project.isFounding);
      setValue(
        'members',
        project.members
          .filter((m) => m.isTeamMember)
          .map((member) => ({
            memberId: member.memberId,
            memberRole: member.memberRole,
            memberDescription: member.memberDescription,
            isTeamMember: member.isTeamMember,
            memberName: member.memberName,
            memberGeneration: member.memberGeneration,
            searchedMember: {
              id: member.memberId,
              name: member.memberName,
              generation: member.memberGeneration,
              hasProfile: true as const,
              profileImage: member.profileImage,
            },
          })),
      );
      setValue(
        'releaseMembers',
        project.members
          .filter((m) => !m.isTeamMember)
          .map((member) => ({
            memberId: member.memberId,
            memberRole: member.memberRole,
            memberDescription: member.memberDescription,
            isTeamMember: member.isTeamMember,
            memberName: member.memberName,
            memberGeneration: member.memberGeneration,
            searchedMember: {
              id: member.memberId,
              name: member.memberName,
              generation: member.memberGeneration,
              hasProfile: true as const,
              profileImage: member.profileImage,
            },
          })),
      );
      setValue('serviceType', project.serviceType);
      setValue('period.startAt', convertPeriodFormatReverse(project.startAt));
      setValue('period.endAt', convertPeriodFormatReverse(project.endAt ?? ''));
      setValue('period.isOngoing', project.endAt ? false : true);
      setValue('summary', project.summary);
      setValue('detail', project.detail);
      setValue('logoImage', project.logoImage);
      setValue('thumbnailImage', project.thumbnailImage);
      setValue('projectImage', project.images[0]);
      setValue(
        'links',
        project.links.map((link) => ({
          linkTitle: link.linkTitle,
          linkUrl: link.linkUrl,
        })),
      );
    }
  }, [isEditPage, postId, project, setValue]);

  return (
    <AuthRequired>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {!isEditPage && <FormStatus formItems={formItems} />}
          <ProjectContainer>
            <ProjectName />
            <ProjectGeneration />
            <ProjectCategory />
            <ProjectStatus />
            <ProjectMembers type={categoryLabel?.[category] ?? ''} />
            <ProjectReleaseMembers />
            <ProjectServiceType />
            <ProjectPeriod />
            <ProjectSummary />
            <ProjectDetail />
            <ProjectImageSection />
            <ProjectLink />
            <StyledButtonWrapper>
              <Button type='submit' variant='primary'>
                프로젝트 {uploadType}하기
              </Button>
            </StyledButtonWrapper>
          </ProjectContainer>
        </StyledForm>
      </FormProvider>
    </AuthRequired>
  );
};

setLayout(ProjectUploadPage, 'header');

export default ProjectUploadPage;

const StyledForm = styled.form`
  display: flex;
  position: relative;
  gap: 40px;
  justify-content: center;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 47px 40px;
  width: 892px;

  @media screen and (max-width: 1055px) {
    border-radius: 0%;
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 38px 24px 107px;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;

  & > button {
    ${textStyles.SUIT_14_M};
  }
`;
