import styled from '@emotion/styled';
import { formItems, ServiceType, Category, Period } from '@/components/project/upload/constants';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { colors } from '@/styles/colors';
import TextArea from '@/components/common/TextArea';
import FormStatus from '@/components/project/upload/FormStatus';
import useMemberForm from '@/components/project/upload/MemberForm/useMemberForm';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormDateTerm from '@/components/project/upload/ProjectPeriod';
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

const schema = yup.object().shape({
  'name': yup.string().required('프로젝트 이름을 입력해주세요'),
  'officialActivity': yup.string().required('어디서 진행했는지 선택해주세요'),
  'termDate.dateFrom': yup.date().required('프로젝트 기간을 입력해주세요'),
  'termDate.dateTo': yup.date().required('프로젝트 기간을 입력해주세요'),
});

export interface ProjectUploadForm {
  name: string;
  generation: string;
  generationChecked: boolean;
  category: Category;
  isAvailable: boolean;
  isFounding: boolean;
  originalMembers: any;
  additionalMembers: any;
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
  });
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = methods;
  const { members, ...memberFormProps } = useMemberForm();
  const { members: releaseMembers, ...releaseMemberFormProps } = useMemberForm();
  const { links, ...linkFormProps } = useLinkForm();

  const _formItems = formItems.map((formItem) =>
    dirtyFields?.[formItem.value]
      ? {
          ...formItem,
          isDirty: true,
        }
      : formItem,
  );

  const onSubmit = (data: ProjectUploadForm) => {
    // TODO: api 연결
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormStatus formItems={_formItems} />
        <Project>
          <ProjectName />
          <ProjectGeneration />
          <ProjectCategory />
          <ProjectStatus />
          <ProjectMembers members={members} {...memberFormProps} />
          <ProjectReleaseMembers members={releaseMembers} {...releaseMemberFormProps} />
          <ProjectServiceType />
          <ProjectPeriod />
          <ProjectSummary />
          <ProjectDetail />
          <ProjectImageSection />
          <ProjectLink links={links} {...linkFormProps} />
        </Project>
      </StyledForm>
    </FormProvider>
  );
};

export default ProjectUploadPage;

const StyledForm = styled.form`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin: 167px auto 0;
`;

const Project = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 47px 40px;
  width: 892px;
`;
