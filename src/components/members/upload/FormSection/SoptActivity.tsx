import styled from '@emotion/styled';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { TEAMS } from '@/components/members/upload/constants';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import SelectOptions from '@/components/members/upload/forms/SelectOptions';
import { MemberUploadForm } from '@/components/members/upload/types';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function MemberSoptActivityFormSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<MemberUploadForm>();
  const { fields } = useFieldArray({
    control,
    name: 'activities',
  });

  return (
    <StyledFormSection>
      <FormHeader title='SOPT 활동 정보' essential />
      <ActivityList>
        {fields.map((field, index) => (
          <Activity key={field.id}>
            <StyledInput
              disabled
              {...register(`activities.${index}.generation`)}
              error={errors?.activities?.[index]?.hasOwnProperty('generation')}
              placeholder='활동기수'
            />
            <StyledInput
              disabled
              {...register(`activities.${index}.part`)}
              error={errors?.activities?.[index]?.hasOwnProperty('part')}
              placeholder='파트'
            />
            <StyledSelect
              {...register(`activities.${index}.team`)}
              error={errors?.activities?.[index]?.hasOwnProperty('team')}
              placeholder='운팀/미팀 여부'
              className='team'
            >
              <SelectOptions options={TEAMS} />
            </StyledSelect>
          </Activity>
        ))}
      </ActivityList>
    </StyledFormSection>
  );
}

const StyledFormSection = styled(FormSection)`
  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 17px;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
`;

const Activity = styled.div`
  display: flex;
  position: relative;
  gap: 12px;
  align-items: center;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 11px;
    column-gap: 9px;
    height: 107px;

    .team {
      grid-column: span 2;
    }
  }
`;

const StyledSelect = styled(Select)`
  border-radius: 14px;
  padding: 16px 34px 16px 20px;
  width: 100%;
  color: ${legacyColors.white};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    background-color: ${legacyColors.black80};
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
`;
