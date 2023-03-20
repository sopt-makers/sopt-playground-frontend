import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import TextArea from '@/components/common/TextArea';
import MemberFormHeader from '@/components/members/upload/forms/FormHeader';
import MemberFormItem from '@/components/members/upload/forms/FormItem';
import { MemberFormSection } from '@/components/members/upload/forms/FormSection';
import MbtiSelector from '@/components/members/upload/TmiSection/MbtiSelector';
import { Mbti } from '@/components/members/upload/TmiSection/types';
import { MemberUploadForm } from '@/components/members/upload/types';

export default function TmiSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<MemberUploadForm>();

  const getMbtiErrorMessage = () => {
    if (errors && errors.mbti) {
      return [
        errors.mbti[0]?.message,
        errors.mbti[1]?.message,
        errors.mbti[2]?.message,
        errors.mbti[3]?.message,
      ].filter((message) => !!message)[0];
    }
  };

  return (
    <MemberFormSection>
      <MemberFormHeader title='SOPT만 아는 나의 TMI' />
      <StyledMemberFormItem title='MBTI + 제 성격은요...' errorMessage={getMbtiErrorMessage()}>
        <MbtiWrapper>
          <Controller
            control={control}
            name='mbti'
            render={({ field }) => (
              <MbtiSelector
                {...field}
                mbti={field.value ?? [null, null, null, null]}
                onSelect={(mbti: Mbti | null) => field.onChange(mbti)}
              />
            )}
          />
          <StyledTextArea placeholder='ex) 저는 극강의 EEE에요.' />
        </MbtiWrapper>
      </StyledMemberFormItem>
    </MemberFormSection>
  );
}

const MbtiWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
`;

const StyledMemberFormItem = styled(MemberFormItem)`
  margin-top: 32px;
`;

const StyledTextArea = styled(TextArea)`
  border-radius: 13px;
  padding: 14px 20px;
  width: 632px;
  height: 76px;
`;
