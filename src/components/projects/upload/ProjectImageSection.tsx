import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetProjectById } from '@/api/endpoint_LEGACY/hooks';
import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import ImageUploaderLegacy from '@/components/common/ImageUploader/Legacy';
import Text from '@/components/common/Text';
import FormTitle from '@/components/projects/upload/FormTitle';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { ProjectUploadForm } from '@/pages/projects/upload/legacy';
import { colors } from '@sopt-makers/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const ProjectImageSection: FC = () => {
  const { control } = useFormContext<ProjectUploadForm>();

  const { query } = useStringRouterQuery(['id', 'edit'] as const);
  const isEditPage = query?.edit === 'true' ? true : false;
  const projectId = query?.id ?? undefined;
  const { data: project } = useGetProjectById(projectId);

  return (
    <StyledContainer>
      <FormTitle essential>로고 이미지</FormTitle>
      <StyledDescription>가로 300px 세로 300px 권장합니다. 예외 규격은 잘릴 수 있습니다.</StyledDescription>
      <RHFControllerFormItem
        name='logoImage'
        control={control}
        component={StyledLogoImageUploader}
        src={(isEditPage && projectId && project?.logoImage) || ''}
      />
      <StyledTitle essential>썸네일 이미지</StyledTitle>
      <StyledDescription>
        16:9 비율로 가로 368px 세로208px을 권장합니다.
        <MobileDescription>웹페이지에서 등록을 권장합니다.</MobileDescription>
      </StyledDescription>
      <RHFControllerFormItem
        name='thumbnailImage'
        control={control}
        component={StyledImageUploader}
        src={(isEditPage && projectId && project?.thumbnailImage) || ''}
      />
      <StyledTitle>프로젝트 이미지</StyledTitle>
      <StyledDescription>
        10MB 이내로 가로 1200px, 세로는 675px 사이즈로 제작해주세요.{' '}
        <MobileDescription>웹페이지에서 등록을 권장합니다.</MobileDescription>
      </StyledDescription>
      <RHFControllerFormItem
        name='projectImage'
        control={control}
        component={StyledImageUploader}
        src={(isEditPage && projectId && project?.images[0]) || ''}
      />
    </StyledContainer>
  );
};

export default ProjectImageSection;

const StyledContainer = styled.section`
  margin: 84px 0 0;
`;

const StyledDescription = styled(Text)`
  display: block;
  margin: 12px 0 18px;
  color: ${colors.gray100};
`;

const StyledTitle = styled(FormTitle)`
  margin: 60px 0 0;
`;

const MobileDescription = styled.p`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
  }
`;

const StyledLogoImageUploader = styled(ImageUploaderLegacy)`
  width: 104px;
  height: 104px;
`;

const StyledImageUploader = styled(ImageUploaderLegacy)`
  width: 369px;
  height: 208px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 369px;
  }
`;
