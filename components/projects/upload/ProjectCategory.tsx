import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import FormItem from '@/components/common/form/FormItem';
import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import FormTitle from '@/components/projects/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/projects/upload';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const categoryLabel = {
  APPJAM: '앱잼',
  SOPKATHON: '솝커톤',
  SOPTERM: '솝텀 프로젝트',
  STUDY: '스터디',
  JOINTSEMINAR: '합동 세미나',
  ETC: '기타',
} as const;

const ProjectCategory: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectUploadForm>();
  return (
    <>
      <StyledTitle essential>어디서 진행했나요?</StyledTitle>
      <StyledDescription>기수는 SOPT 공식 활동을 기준으로 선택해주세요</StyledDescription>
      <FormItem errorMessage={errors.category?.message}>
        <StyledSelect error={!!errors.category} placeholder='선택' {...register('category')}>
          {Object.keys(categoryLabel).map((category) => (
            <option key={category} value={category}>
              {categoryLabel[category as keyof typeof categoryLabel]}
            </option>
          ))}
        </StyledSelect>
      </FormItem>
    </>
  );
};

export default ProjectCategory;

const StyledTitle = styled(FormTitle)`
  margin: 61.25px 0 14px;
`;

const StyledDescription = styled(Text)`
  margin: 0 0 18px;
  color: ${colors.gray100};
  ${textStyles.SUIT_14_M};
`;

const StyledSelect = styled(Select)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 160px;
    ${textStyles.SUIT_14_M}
  }
`;
