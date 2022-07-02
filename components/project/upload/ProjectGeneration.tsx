import Checkbox from '@/components/common/Checkbox';
import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import { GENERATION } from '@/components/project/upload/constants';
import FormTitle from '@/components/project/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/project/upload';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const ProjectGeneration: FC = () => {
  const { register, watch, control, setValue } = useFormContext<ProjectUploadForm>();
  const [generation, generationChecked] = watch(['generation', 'generationChecked']);

  useEffect(() => {
    if (generationChecked) {
      setValue('generation', undefined);
    }
  }, [generationChecked, setValue]);

  useEffect(() => {
    if (generation) {
      setValue('generationChecked', false);
    }
  }, [generation, setValue]);

  return (
    <StyledContainer>
      <FormTitle>기수</FormTitle>
      <StyledDescription>참여한 팀원들의 기수에 맞춰 작성해주세요</StyledDescription>
      <Select width={236} placeholder='선택' {...register('generation')}>
        {GENERATION.map((item) => (
          <option key={item} value={item}>
            {item}기
          </option>
        ))}
      </Select>
      <StyledCheckboxWrapper>
        <Controller
          name='generationChecked'
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

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0;

  & > span {
    margin: 0 0 0 10px;
  }
`;
