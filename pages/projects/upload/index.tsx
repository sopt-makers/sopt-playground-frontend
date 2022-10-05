import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { FC } from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { User } from '@/api/project/types';
import AuthRequired from '@/components/auth/AuthRequired';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import { categoryLabel, FORM_ITEMS } from '@/components/projects/upload/constants';
import FormStatus from '@/components/projects/upload/FormStatus';
import useCreateProjectMutation from '@/components/projects/upload/hooks/useCreateProjectMutation';
import { Link } from '@/components/projects/upload/LinkForm/constants';
import { DEFAULT_MEMBER, Member } from '@/components/projects/upload/MemberForm/constants';
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
import { ToastProvider } from '@/components/projects/upload/ToastProvider';
import { Category, FormItem, Generation, Period, ServiceType, Status } from '@/components/projects/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

const DATE_PATTERN = /^\d{4}.(0[1-9]|1[0-2])/g;

const schema = yup.object().shape({
  name: yup.string().required('프로젝트 이름을 입력해주세요'),
  generation: yup.object().shape({
    generation: yup.number().optional(),
    checked: yup.boolean().required(),
  }),
  category: yup.string().required('프로젝트를 어디서 진행했는지 선택해주세요'),
  status: yup.object().shape({
    isFounding: yup.boolean(),
    isAvaliable: yup.boolean(),
  }),
  members: yup.array().of(
    yup.object().shape({
      user: yup.object().required('유저를 선택해주세요.'),
      description: yup.string().required('어떤 역할을 맡았는지 입력해주세요.'),
      role: yup.string().required('역할을 선택해주세요.'),
    }),
  ),
  releaseMembers: yup.array().of(
    yup.object().shape({
      user: yup.object().required('유저를 선택해주세요.'),
      description: yup.string().required('어떤 역할을 맡았는지 입력해주세요.'),
      role: yup.string().required('역할을 선택해주세요.'),
    }),
  ),
  serviceType: yup.array().required('서비스 형태를 선택해주세요.'),
  period: yup.object().shape({
    startAt: yup.string().required('시작일을 입력해주세요.').matches(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.'),
    endAt: yup.string().required('종료일을 입력해주세요.').matches(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.'),
  }),
  summary: yup.string().required('프로젝트 한줄 소개를 입력해주세요'),
  detail: yup.string().required('프로젝트 설명을 입력해주세요'),
  logoImage: yup.string().required('로고 이미지를 업로드해 주세요'),
  thumbnailImage: yup.string(),
  projectImage: yup.string(),
  links: yup.array().of(
    yup.object().shape({
      title: yup.string().required('프로젝트 타입을 선택해주세요.'),
      url: yup.string().required('프로젝트 링크를 입력해주세요.').url('올바른 링크를 입력해주세요.'),
    }),
  ),
});

const DEFAULT_VALUES: DefaultValues<ProjectUploadForm> = {
  name: '',
  generation: {
    generation: undefined,
    checked: true,
  },
  status: {
    isAvailable: false,
    isFounding: false,
  },
  period: {
    isOngoing: false,
  },
  members: [{ ...DEFAULT_MEMBER }],
  serviceType: [],
  summary: '',
  detail: '',
};

export interface ProjectUploadForm {
  name: string;
  generation: Generation;
  category: Category;
  status: Status;
  members: Member[];
  releaseMembers: Member[];
  serviceType: ServiceType[];
  period: Period;
  summary: string;
  detail: string;
  logoImage: string;
  thumbnailImage: string;
  projectImage: string;
  links: Link[];
}

const ProjectUploadPage: FC = () => {
  const { mutate } = useCreateProjectMutation();
  const methods = useForm<ProjectUploadForm>({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });
  const {
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = methods;
  const category = watch('category');
  const formItems = FORM_ITEMS.filter((formItem) => formItem.isRequired)
    .map((formItem) => ({
      ...formItem,
      isDirty: dirtyFields?.[formItem.value] ? true : formItem.isDirty,
    }))
    .reduce(
      (acc: FormItem[], cur) =>
        cur.value === 'members'
          ? [...acc, { ...cur, label: `${categoryLabel?.[category] ?? ''} 팀원` }]
          : [...acc, cur],
      [],
    );

  const onSubmit = (data: ProjectUploadForm) => {
    const notify = confirm('프로젝트를 업로드 하시겠습니까?');
    // TODO eslint non-null-assertion 관련 룰 만족하도록 수정 필요
    const users: Omit<User, 'user'>[] = [...data.members, ...(data.releaseMembers ?? [])].map((user) => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      user_id: user.user?.auth_user_id!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      is_team_member: user.isTeamMember!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      role: user.role!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      description: user.description!,
    }));
    const links: Omit<Link, 'isEdit'>[] = data.links.map((link) => ({
      title: link.title,
      url: link.url,
    }));

    if (notify) {
      mutate({
        name: data.name,
        generation: data.generation.checked ? undefined : data.generation.generation,
        category: data.category,
        detail: data.detail,
        summary: data.summary,
        service_type: data.serviceType,
        start_at: dayjs(data.period.startAt).toDate(),
        end_at: !data.period.isOngoing ? dayjs(data.period.endAt).toDate() : undefined,
        is_available: data.status.isAvailable,
        is_founding: data.status.isFounding,
        images: data.projectImage ? [data.projectImage] : [],
        logo_image: data.logoImage,
        thumbnail_image: data.thumbnailImage,
        users,
        links,
      });
    }
  };

  return (
    <AuthRequired>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormStatus formItems={formItems} />
          <ProjectContainer>
            <ProjectName />
            <ProjectGeneration />
            <ProjectCategory />
            <ProjectStatus />
            <ToastProvider>
              <ProjectMembers type={categoryLabel?.[category] ?? ''} />
              <ProjectReleaseMembers />
            </ToastProvider>
            <ProjectServiceType />
            <ProjectPeriod />
            <ProjectSummary />
            <ProjectDetail />
            <ProjectImageSection />
            <ProjectLink />
            <StyledButtonWrapper>
              <Button type='submit' variant='primary'>
                프로젝트 등록하기
              </Button>
            </StyledButtonWrapper>
          </ProjectContainer>
        </StyledForm>
      </FormProvider>
    </AuthRequired>
  );
};

setLayout(ProjectUploadPage, (page) => (
  <>
    <Header />
    {page}
  </>
));

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
