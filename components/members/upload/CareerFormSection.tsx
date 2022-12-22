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
  const { control } = useFormContext<MemberUploadForm>();
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
              <Input placeholder='회사 입력' />
              <Input placeholder='직무 입력' />
              <IsCurrent>
                현재 재직중
                <Switch />
              </IsCurrent>
              <StartDateWrapper>
                <MonthInput placeholder='근무 시작일' className='start-date' />
              </StartDateWrapper>
              <MonthInput placeholder='근무 종료일' />
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
  position: relative;
  grid-template-columns: 1fr 1fr;
  column-gap: 18px;
  width: 630px;

  input[type='month']::-webkit-calendar-picker-indicator {
    filter: invert(100%);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const CurrentTitle = styled.div`
  grid-column: 1 / span 2;
  margin-bottom: 20px;

  ${textStyles.SUIT_18_SB}
`;

const StartDateWrapper = styled.div`
  &::after {
    position: absolute;
    bottom: 16px;
    padding-left: 4px;
    content: '-';
  }
`;
