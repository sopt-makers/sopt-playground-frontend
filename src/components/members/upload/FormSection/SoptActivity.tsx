import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FieldError, useFieldArray, useFormContext } from 'react-hook-form';

import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import AddableItem from '@/components/members/upload/AddableItem';
import AddableWrapper from '@/components/members/upload/AddableWrapper';
import { DEFAULT_ACTIVITY, PARTS, TEAMS } from '@/components/members/upload/constants';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import SelectOptions from '@/components/members/upload/forms/SelectOptions';
import { MemberUploadForm } from '@/components/members/upload/types';
import { GENERATIONS, LATEST_GENERATION } from '@/constants/generation';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberSoptActivityFormSectionProps {
  isEditable?: boolean;
}

export default function MemberSoptActivityFormSection({ isEditable }: MemberSoptActivityFormSectionProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<MemberUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });

  const onAppend = () => append(DEFAULT_ACTIVITY);
  const onRemove = (index: number) => remove(index);
  const getActivityErrorMessage = (
    activityError:
      | {
          generation?: FieldError | undefined;
          part?: FieldError | undefined;
          team?: FieldError | undefined;
        }
      | undefined,
  ) => {
    if (!activityError) return;
    if (activityError.hasOwnProperty('generation')) return activityError.generation?.message;
    if (activityError.hasOwnProperty('part')) return activityError.part?.message;
    return activityError.team?.message;
  };

  return (
    <StyledFormSection>
      <FormHeader title='SOPT 활동 정보' required />
      <StyledAddableWrapper onAppend={onAppend}>
        {fields.map((field, index) =>
          isEditable ? (
            <AddableItem
              onRemove={() => onRemove(index)}
              key={field.id}
              errorMessage={getActivityErrorMessage(errors.activities?.[index])}
            >
              <StyledSelectWrapper>
                <StyledSelect
                  {...register(`activities.${index}.generation`)}
                  error={errors?.activities?.[index]?.hasOwnProperty('generation')}
                  placeholder='활동기수'
                >
                  <SelectOptions options={FILTERED_GENERATIONS} />
                </StyledSelect>
                <StyledSelect
                  {...register(`activities.${index}.part`)}
                  error={errors?.activities?.[index]?.hasOwnProperty('part')}
                  placeholder='파트'
                >
                  <SelectOptions options={PARTS} />
                </StyledSelect>
                <StyledSelect
                  {...register(`activities.${index}.team`)}
                  error={errors?.activities?.[index]?.hasOwnProperty('team')}
                  placeholder='운팀/미팀 여부'
                  className='team'
                >
                  <SelectOptions options={TEAMS} />
                </StyledSelect>
              </StyledSelectWrapper>
            </AddableItem>
          ) : (
            <FixedActivity key={field.id}>
              <StyledInput
                disabled
                {...register(`activities.${index}.generation`)}
                error={errors?.activities?.[index]?.hasOwnProperty('generation')}
                placeholder='활동기수'
                width='202.66px'
              />
              <StyledInput
                disabled
                {...register(`activities.${index}.part`)}
                error={errors?.activities?.[index]?.hasOwnProperty('part')}
                placeholder='파트'
                width='202.66px'
              />
              <StyledSelect
                {...register(`activities.${index}.team`)}
                error={errors?.activities?.[index]?.hasOwnProperty('team')}
                placeholder='운팀/미팀 여부'
                className='team'
              >
                <SelectOptions options={TEAMS} />
              </StyledSelect>
            </FixedActivity>
          ),
        )}
      </StyledAddableWrapper>
    </StyledFormSection>
  );
}

const FILTERED_GENERATIONS = GENERATIONS.filter((generation) => parseInt(generation) <= LATEST_GENERATION - 1).map(
  (generation) => generation + '기',
);

const StyledFormSection = styled(FormSection)`
  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 17px;
  }
`;

const StyledAddableWrapper = styled(AddableWrapper)`
  margin-top: 46px;
  width: 683px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 30px;
    width: 100%;
  }
`;

const StyledSelectWrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
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
  color: ${colors.gray10};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    background-color: ${colors.gray800};
    width: 100%;
  }
`;

const FixedActivity = styled(StyledSelectWrapper)`
  width: 632px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  & > input {
    width: 100%;
  }
`;
