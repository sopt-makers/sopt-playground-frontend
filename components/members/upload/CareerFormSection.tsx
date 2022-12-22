import styled from '@emotion/styled';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Input from '@/components/common/Input';
import MonthInput from '@/components/common/MonthInput';
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
  const { control, register, watch, setValue } = useFormContext<MemberUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'careers',
  });

  const onAppend = () => append(DEFAULT_CAREER);
  const onRemove = (index: number) => remove(index);

  return (
    <FormSection>
      <FormHeader title='경력' />
      <AddableWrapper onAppend={onAppend}>
        {fields.map((field, index) => (
          <StyledAddableItem onRemove={() => onRemove(index)} key={field.id}>
            <CurrentItem>
              <CurrentTitle>{`회사정보 ${index + 1}`}</CurrentTitle>
              <Input {...register(`careers.${index}.companyName`)} placeholder='회사 입력' />
              <Input {...register(`careers.${index}.title`)} placeholder='직무 입력' />
              <IsCurrent>
                현재 재직 중
                <Switch {...register(`careers.${index}.isCurrent`)} />
              </IsCurrent>
              <MonthInput
                {...register(`careers.${index}.startDate`)}
                onChange={(e) => setValue(`careers.${index}.startDate`, e.target.value)}
                placeholder='근무 시작일'
                className='start-date'
              />
              <EndDateWrapper isShow={watch(`careers.${index}.isCurrent`)}>
                <MonthInput
                  {...register(`careers.${index}.endDate`)}
                  onChange={(e) => setValue(`careers.${index}.endDate`, e.target.value)}
                  placeholder='근무 종료일'
                />
              </EndDateWrapper>
            </CurrentItem>
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

const CurrentItem = styled.div`
  display: grid;

  /* position: relative; */
  grid-template-columns: 1fr 1fr;
  column-gap: 18px;
  width: 630px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const CurrentTitle = styled.div`
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
