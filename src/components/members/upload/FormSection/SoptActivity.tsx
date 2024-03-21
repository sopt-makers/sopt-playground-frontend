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
import { GENERATIONS, LAST_EDITABLE_GENERATION } from '@/constants/generation';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberSoptActivityFormSectionProps {
  isEditable?: boolean;
  isCheckPage?: boolean;
  handleClickDisabled?: () => void;
}

export default function MemberSoptActivityFormSection({
  isEditable,
  isCheckPage = false,
  handleClickDisabled,
}: MemberSoptActivityFormSectionProps) {
  const {
    control,
    register,
    formState: { errors },
    getValues,
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

  const checkDuplicateGeneration = (value: string, id: number) => {
    const activities = getValues('activities');
    return (
      activities.find(({ generation }, index) => index !== id && generation === value) === undefined ||
      '기수가 중복되었어요.'
    );
  };

  const checkEditableGeneration = (generation: string) => {
    if (generation === '') return true;
    const num = generation.match(/\d+/g);
    if (!num) return false;
    return Number(num[0]) <= LAST_EDITABLE_GENERATION;
  };

  return (
    <StyledFormSection>
      {!isCheckPage && (
        <FormHeader title='SOPT 활동 정보' description='추가적인 수정은 채널톡 문의를 통해서만 가능합니다.' required />
      )}
      <StyledAddableWrapper onAppend={onAppend} isCheckPage={isCheckPage}>
        {fields.map((field, index) =>
          isEditable && checkEditableGeneration(field.generation) ? (
            <AddableItem
              onRemove={() => onRemove(index)}
              key={field.id}
              isFirstItem={index === 0}
              errorMessage={getActivityErrorMessage(errors.activities?.[index])}
            >
              <StyledSelectWrapper>
                <StyledSelect
                  {...register(`activities.${index}.generation`, {
                    onChange: handleClickDisabled,
                    validate: (value) => checkDuplicateGeneration(value, index),
                  })}
                  error={errors?.activities?.[index]?.hasOwnProperty('generation')}
                  placeholder='활동기수'
                >
                  <SelectOptions options={FILTERED_GENERATIONS} />
                </StyledSelect>
                <StyledSelect
                  {...register(`activities.${index}.part`, { onChange: handleClickDisabled })}
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

const FILTERED_GENERATIONS = GENERATIONS.filter((generation) => parseInt(generation) <= LAST_EDITABLE_GENERATION).map(
  (generation) => generation + '기',
);

const StyledFormSection = styled(FormSection)`
  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 17px;
  }
`;

const StyledAddableWrapper = styled(AddableWrapper)<{ isCheckPage: boolean }>`
  margin-top: ${({ isCheckPage }) => !isCheckPage && '32px'};
  width: 683px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: ${({ isCheckPage }) => !isCheckPage && '30px'};
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
