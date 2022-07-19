import styled from '@emotion/styled';
import { categoryLabel, FORM_ITEMS } from '@/components/project/upload/constants';
import { FC } from 'react';
import { FormProvider, useForm, DefaultValues } from 'react-hook-form';
import { colors } from '@/styles/colors';
// import FormStatus from '@/components/project/upload/FormStatus';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ProjectServiceType from '@/components/project/upload/ProjectServiceType';
import useLinkForm from '@/components/project/upload/LinkForm/useLinkForm';
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
import { Period, ServiceType, Category, FormItem, Status, Generation } from '@/components/project/upload/types';
import Button from '@/components/common/Button';
import useCreateProjectMutation from '@/components/project/upload/hooks/useCreateProjectMutation';
import { Role } from '@/api/project/types';

const schema: yup.SchemaOf<ProjectUploadForm> = yup.object().shape({
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
    isFounding: yup.boolean().required(),
    isAvaliable: yup.boolean().required(),
  }),
  members: yup.array().of(
    yup.object().shape({
      userId: yup.number().required(),
      description: yup.string().required(),
      role: yup.string().required(),
    }),
  ),
  releaseMembers: yup.array().of(
    yup.object({
      userId: yup.number().required(),
      description: yup.string().required(),
      role: yup.string().required(),
    }),
  ),
  serviceType: yup.array().required('서비스 형태를 선택해주세요.'),
  period: yup.object().shape({
    startAt: yup.date().required('프로젝트 시작일을 입력해주세요'),
    endAt: yup.date(),
  }),
  summary: yup.string().required('프로젝트 한줄 소개를 입력해주세요'),
  detail: yup.string().required('프로젝트 설명을 입력해주세요'),
  logoImage: yup.string().required('로고 이미지를 업로드해 주세요'),
  thumbnailImage: yup.string(),
  projectImage: yup.string(),
  link: yup.object(),
});

const DEFAULT_VALUES: DefaultValues<ProjectUploadForm> = {
  name: '',
  generation: {
    generation: undefined,
    checked: false,
  },
  status: {
    isAvailable: false,
    isFounding: false,
  },
  period: {
    isOngoing: false,
  },
  serviceType: [],
  summary: '',
  detail: '',
};

export interface ProjectUploadForm {
  name: string;
  generation: Generation;
  category: Category;
  status: Status;
  members: {
    userId: number;
    description: string;
    role: Role;
    is_team_member: boolean;
  }[];
  releaseMembers: any;
  serviceType: ServiceType[];
  period: Period;
  summary: string;
  detail: string;
  logoImage: File;
  thumbnailImage: File;
  projectImage: File;
  link: Link;
}

const ProjectUploadPage: FC = () => {
  const methods = useForm<ProjectUploadForm>({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const { handleSubmit, watch } = methods;
  const { links, ...linkFormProps } = useLinkForm();
  const category = watch('category');
  const { mutate } = useCreateProjectMutation();
  const [members, releaseMembers] = watch(['members', 'releaseMembers']);

  console.log('[members]: ', members);
  console.log('[releaseMembers]: ', releaseMembers);

  const onSubmit = (data: ProjectUploadForm) => {
    const notify = confirm('프로젝트를 업로드 하시겠습니까?');
    if (notify) {
      mutate({
        name: data.name,
        generation: data.generation.checked ? undefined : data.generation.generation,
        category: data.category,
        detail: data.detail,
        summary: data.summary,
        service_type: data.serviceType,
        links: links.map((link) => ({
          title: link.title ?? '',
          url: link.url,
        })),
        start_at: data.period.startAt,
        end_at: !data.period.isOngoing ? data.period.endAt : undefined,
        is_available: data.status.isAvailable,
        is_founding: data.status.isFounding,
        users: [...data.members, ...data.releaseMembers],
        images: data.projectImage,
        thumbnail_image: data.thumbnailImage,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: 릴리즈 이후에 고도화 */}
        {/* <FormStatus formItems={_formItems} /> */}
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
          <ProjectLink links={links} {...linkFormProps} />
        </ProjectContainer>
        <Button type='submit'>제출하기</Button>
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
`;
