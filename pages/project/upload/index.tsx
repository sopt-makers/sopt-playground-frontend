import styled from '@emotion/styled';
import { categoryLabel, FORM_ITEMS } from '@/components/project/upload/constants';
import { FC } from 'react';
import { FormProvider, useForm, DefaultValues } from 'react-hook-form';
import { colors } from '@/styles/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ProjectServiceType from '@/components/project/upload/ProjectServiceType';
import { Link } from '@/components/project/upload/LinkForm/constants';
import ProjectName from '@/components/project/upload/ProjectName';
import ProjectGeneration from '@/components/project/upload/ProjectGeneration';
import ProjectCategory from '@/components/project/upload/ProjectCategory';
import ProjectStatus from '@/components/project/upload/ProjectStatus';
import ProjectMembers from '@/components/project/upload/ProjectMemebers';
import ProjectReleaseMembers from '@/components/project/upload/ProjectReleaseMembers';
import ProjectPeriod from '@/components/project/upload/ProjectPeriod';
import ProjectSummary from '@/components/project/upload/ProjectSummary';
import ProjectDetail from '@/components/project/upload/ProjectDetail';
import ProjectLink from '@/components/project/upload/ProjectLink';
import ProjectImageSection from '@/components/project/upload/ProjectImageSection';
import { Period, ServiceType, Category, Status, Generation, FormItem } from '@/components/project/upload/types';
import useCreateProjectMutation from '@/components/project/upload/hooks/useCreateProjectMutation';
import { DEFAULT_MEMBER, Member } from '@/components/project/upload/MemberForm/constants';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import _omit from 'lodash/omit';
import FormStatus from '@/components/project/upload/FormStatus';
import Button from '@/components/common/Button';
import { textStyles } from '@/styles/typography';
import dayjs from 'dayjs';
import { User } from '@/api/project/types';

const DATE_PATTERN = /^\d{4}.(0[1-9]|1[0-2])/g;

const schema = yup.object().shape({
  name: yup.string().required('프로젝트 이름을 입력해주세요'),
  generation: yup
    .object()
    .shape({
      generation: yup.number(),
      checked: yup.string(),
    })
    .optional(),
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
    const users: User[] = [...data.members, ...(data.releaseMembers ?? [])].map((user) => ({
      user_id: user.user?.auth_user_id!,
      is_team_member: user.isTeamMember!,
      role: user.role!,
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
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormStatus formItems={formItems} />
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
              프로젝트 등록하기
            </Button>
          </StyledButtonWrapper>
        </ProjectContainer>
      </StyledForm>
    </FormProvider>
  );
};

export default ProjectUploadPage;

const StyledForm = styled.form`
  display: flex;
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
