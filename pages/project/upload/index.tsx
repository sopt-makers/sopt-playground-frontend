import styled from '@emotion/styled';
import { categoryLabel, formItems } from '@/components/project/upload/constants';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { colors } from '@/styles/colors';
import FormStatus from '@/components/project/upload/FormStatus';
import useMemberForm from '@/components/project/upload/MemberForm/useMemberForm';
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
import { Period, ServiceType, Category, FormItem } from '@/components/project/upload/types';

const schema = yup.object().shape({
  'name': yup.string().required('프로젝트 이름을 입력해주세요'),
  'generation': yup.string(),
  'category': yup.string().required('어디서 진행했는지 선택해주세요'),
  'isAvaliable': yup.boolean().required(),
  'isFounding': yup.boolean().required(),
  'serviceType': yup.array().required('서비스 형태를 선택해주세요.'),
  'period.startAt': yup.date().required('프로젝트 시작일을 입력해주세요'),
  'period.endAt': yup.date().required('프로젝트 종료일을 입력해주세요'),
  'summary': yup.string().required('프로젝트 한줄 소개를 입력해주세요'),
  'detail': yup.string().required('프로젝트 설명을 입력해주세요'),
  'logoImage': yup.string().required('로고 이미지를 업로드해 주세요'),
  'thumbnailIamge': yup.string(),
  'projectIamge': yup.string(),
  'link': yup.object(),
});

export interface ProjectUploadForm {
  name: string;
  generation?: string;
  generationChecked: boolean;
  category: Category;
  isAvailable: boolean;
  isFounding: boolean;
  members: any;
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
    defaultValues: {
      generationChecked: false,
      isAvailable: false,
      isFounding: false,
      period: {
        isOngoing: false,
      },
      serviceType: [],
    },
    mode: 'onSubmit',
  });
  const {
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = methods;
  const { members, ...memberFormProps } = useMemberForm();
  const { members: releaseMembers, ...releaseMemberFormProps } = useMemberForm();
  const { links, ...linkFormProps } = useLinkForm();
  const category = watch('category');
  const label = categoryLabel?.[category] ?? '';

  const _formItems = formItems
    .map((formItem) =>
      dirtyFields?.[formItem.value]
        ? {
            ...formItem,
            isDirty: true,
          }
        : formItem,
    )
    .reduce(
      (acc: FormItem[], cur) =>
        cur.value === 'members' ? [...acc, { ...cur, label: `${label} 팀원` }] : [...acc, cur],

      [],
    );

  const onSubmit = (data: ProjectUploadForm) => {
    // TODO: api 연결
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormStatus formItems={_formItems} />
        <ProjectContainer>
          <ProjectName />
          <ProjectGeneration />
          <ProjectCategory />
          <ProjectStatus />
          <ProjectMembers type={categoryLabel?.[category] ?? ''} members={members} {...memberFormProps} />
          <ProjectReleaseMembers members={releaseMembers} {...releaseMemberFormProps} />
          <ProjectServiceType />
          <ProjectPeriod />
          <ProjectSummary />
          <ProjectDetail />
          <ProjectImageSection />
          <ProjectLink links={links} {...linkFormProps} />
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
`;
