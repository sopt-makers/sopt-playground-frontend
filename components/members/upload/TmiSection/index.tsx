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
  const { control } = useFormContext<MemberUploadForm>();
  return (
    <MemberFormSection>
      <MemberFormHeader title='SOPT만 아는 나의 TMI' />
      <StyledMemberFormItem title='MBTI + 제 성격은요...'>
        <MbtiWrapper>
          <Controller
            control={control}
            name='mbti'
            render={({ field }) => (
              <MbtiSelector
                {...field}
                mbti={field.value ?? [null, null, null, null]}
                onSelect={(mbti: Mbti) => field.onChange(mbti)}
              />
            )}
          />
          <TextArea />
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
