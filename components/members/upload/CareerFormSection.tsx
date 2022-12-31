import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FormEvent } from 'react';
import { FieldError, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import Input from '@/components/common/Input';
import MonthPicker from '@/components/common/MonthPicker';
import Switch from '@/components/common/Switch';
import AddableItem from '@/components/members/upload/AddableItem';
import AddableWrapper from '@/components/members/upload/AddableWrapper';
import { DEFAULT_CAREER } from '@/components/members/upload/constants';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import { MemberUploadForm } from '@/components/members/upload/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function CareerFormSection() {
  const {
    control,
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<MemberUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'careers',
  });
  const careers = useWatch({ control, name: 'careers' });

  const onAppend = () => append(DEFAULT_CAREER);
  const onRemove = (index: number) => remove(index);
  const getCareerErrorMessage = (
    careerError:
      | {
          title?: FieldError | undefined;
          companyName?: FieldError | undefined;
          startDate?: FieldError | undefined;
          endDate?: FieldError | undefined;
        }
      | undefined,
  ) => {
    if (!careerError) return;
    if (careerError.hasOwnProperty('title')) return careerError.title?.message;
    if (careerError.hasOwnProperty('companyName')) return careerError.companyName?.message;
    if (careerError.hasOwnProperty('startDate')) return careerError.startDate?.message;
    return careerError.endDate?.message;
  };
  const onChangeIsCurrent = (e: FormEvent<HTMLInputElement>, index: number) => {
    register(`careers.${index}.isCurrent`).onChange(e);
    trigger(`careers.${index}.endDate`);
  };

  return (
    <FormSection>
      <FormHeader title='경력' />
      <AddableWrapper onAppend={onAppend}>
        {fields.map((field, index) => (
          <StyledAddableItem
            errorMessage={getCareerErrorMessage(errors.careers?.[index])}
            onRemove={() => onRemove(index)}
            key={field.id}
          >
            <CareerItem>
              <CareerTitle>{`회사정보 ${index + 1}`}</CareerTitle>
              <Input {...register(`careers.${index}.companyName`)} placeholder='회사 입력' />
              <Input {...register(`careers.${index}.title`)} placeholder='직무 입력' />
              <IsCurrent>
                현재 재직 중
                <Switch {...register(`careers.${index}.isCurrent`)} onChange={(e) => onChangeIsCurrent(e, index)} />
              </IsCurrent>
              <MonthPicker
                value={careers[index].startDate ? new Date(careers[index].startDate) : null}
                onChange={(date: Date) => {
                  setValue(`careers.${index}.startDate`, dayjs(date).format('YYYY/MM'));
                  trigger(`careers.${index}.startDate`);
                }}
                placeholder='근무 시작일'
              />
              <EndDateWrapper isShow={watch(`careers.${index}.isCurrent`)}>
                <MonthPicker
                  value={careers[index].endDate ? new Date(careers[index].endDate ?? '') : null}
                  onChange={(date: Date) => {
                    setValue(`careers.${index}.endDate`, dayjs(date).format('YYYY/MM'));
                    trigger(`careers.${index}.endDate`);
                  }}
                  placeholder='근무 종료일'
                />
              </EndDateWrapper>
            </CareerItem>
          </StyledAddableItem>
        ))}
      </AddableWrapper>
    </FormSection>
  );
}

const StyledAddableItem = styled(AddableItem)`
  margin-top: 46px;
`;

const IsCurrent = styled.div`
  display: flex;
  grid-column: 1 / span 2;
  gap: 9px;
  align-items: center;
  margin: 16px 0 10px;

  ${textStyles.SUIT_16_M}
`;

const CareerItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 18px;
  width: 630px;

  /* stylelint-disable-next-line selector-class-pattern */
  .react-datepicker__tab-loop {
    grid-row-start: 3;
    grid-column-start: 1;
  }
  /* stylelint-disable-next-line selector-class-pattern */
  .react-datepicker__triangle {
    display: none !important;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const CareerTitle = styled.div`
  grid-column: 1 / span 2;
  margin-bottom: 20px;

  ${textStyles.SUIT_18_SB}
`;

const EndDateWrapper = styled.div`
  ${(props: { isShow: boolean }) => props.isShow && 'display: none;'};

  position: relative;

  &::before {
    position: absolute;
    bottom: 16px;
    left: -14px;
    content: '-';
    ${textStyles.SUIT_16_M}
  }
`;
