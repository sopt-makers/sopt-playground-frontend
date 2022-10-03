import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Checkbox from '@/components/common/Checkbox';
import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import { GENERATION } from '@/components/projects/upload/constants';
import FormTitle from '@/components/projects/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/projects/upload';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ProjectGeneration: FC = () => {
  const { register, watch, control, setValue } = useFormContext<ProjectUploadForm>();
  const [generation, generationChecked] = watch(['generation.generation', 'generation.checked']);

  useEffect(() => {
    if (generationChecked) {
      setValue('generation.generation', undefined);
    }
  }, [generationChecked, setValue]);

  useEffect(() => {
    if (generation) {
      setValue('generation.checked', false);
    }
  }, [generation, setValue]);

  return (
    <StyledContainer>
      <FormTitle essential>기수</FormTitle>
      <StyledDescription>참여한 팀원들의 기수에 맞춰 작성해주세요</StyledDescription>
      <StyledSelect width={236} placeholder='선택' {...register('generation.generation')}>
        {GENERATION.map((item) => (
          <option key={item} value={item}>
            {item}기
          </option>
        ))}
      </StyledSelect>
      <StyledCheckboxWrapper>
        <Controller
          name='generation.checked'
          control={control}
          render={({ field: { value, ...props } }) => <Checkbox checked={value} {...props} />}
        />
        <Text typography='SUIT_12_M' color={colors.gray100}>
          특정 기수 활동으로 진행하지 않았어요
        </Text>
      </StyledCheckboxWrapper>
    </StyledContainer>
  );
};

export default ProjectGeneration;

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 60px 0 0;
`;

const StyledDescription = styled(Text)`
  margin: 12px 0 18px;
  color: ${colors.gray100};
  ${textStyles.SUIT_14_M};
`;

const StyledSelect = styled(Select)`
  width: 236px;

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}

    width: 160px;
  }
`;

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0;

  & > span {
    margin: 0 0 0 10px;
  }
`;
