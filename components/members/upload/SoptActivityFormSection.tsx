import styled from '@emotion/styled';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Select from '@/components/common/Select';
import AddableItem from '@/components/members/upload/AddableItem';
import AddableWrapper from '@/components/members/upload/AddableWrapper';
import { PART, TEAM } from '@/components/members/upload/constants';
import { GENERATION } from '@/components/members/upload/constants';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import SelectOptions from '@/components/members/upload/forms/SelectOptions';
import { MemberUploadForm } from '@/components/members/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function MemberSoptActivityFormSection() {
  const { control, register } = useFormContext<MemberUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });

  const onAppend = () => append({ generation: '', part: '', team: '' });
  const onRemove = (index: number) => remove(index);

  return (
    <StyledFormSection>
      <FormHeader title='SOPT 활동 정보' />
      <StyledAddableWrapper onAppend={onAppend}>
        {fields.map((field, index) => (
          <AddableItem onRemove={() => onRemove(index)} key={field.id}>
            <StyledSelectWrapper>
              <StyledSelect {...register(`activities.${index}.generation`)} placeholder='활동기수'>
                <SelectOptions options={GENERATION} />
              </StyledSelect>
              <StyledSelect {...register(`activities.${index}.part`)} placeholder='파트'>
                <SelectOptions options={PART} />
              </StyledSelect>
              <StyledSelect {...register(`activities.${index}.team`)} placeholder='운팀/미팀' className='team'>
                <SelectOptions options={TEAM} />
              </StyledSelect>
            </StyledSelectWrapper>
          </AddableItem>
        ))}
      </StyledAddableWrapper>
    </StyledFormSection>
  );
}

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
  display: flex;
  position: relative;
  gap: 12px;
  align-items: center;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    column-gap: 9px;
    height: 107px;
    row-gap: 11px;

    .team {
      grid-column: span 2;
    }
  }
`;

const StyledSelect = styled(Select)`
  border-width: 1.5px;
  border-radius: 14px;
  padding: 16px 34px 16px 20px;
  width: 100%;
  color: ${colors.gray80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    background-color: ${colors.black80};
    width: 100%;
  }
`;
