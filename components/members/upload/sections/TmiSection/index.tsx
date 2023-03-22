import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import TextArea from '@/components/common/TextArea';
import MemberFormHeader from '@/components/members/upload/forms/FormHeader';
import MemberFormItem from '@/components/members/upload/forms/FormItem';
import { MemberFormSection } from '@/components/members/upload/forms/FormSection';
import FavorToggle from '@/components/members/upload/sections/TmiSection/FavorToggle';
import MbtiSelector from '@/components/members/upload/sections/TmiSection/MbtiSelector';
import {
  FavorAlcohol,
  FavorFishBread,
  FavorMintChocolate,
  FavorPeach,
  FavorSweetAndSourPork,
  FavorTteokbokki,
  Mbti,
} from '@/components/members/upload/sections/TmiSection/types';
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
      <StyledMemberFormItem title='나는 어느 쪽?'>
        <FavorWrapper>
          <Controller
            control={control}
            name='favor.sweetAndSourPork'
            render={({ field }) => (
              <FavorToggle<FavorSweetAndSourPork>
                left='부먹'
                right='찍먹'
                selected={field.value}
                onSelect={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name='favor.peach'
            render={({ field }) => (
              <FavorToggle<FavorPeach> left='딱복' right='물복' selected={field.value} onSelect={field.onChange} />
            )}
          />
          <Controller
            control={control}
            name='favor.mintChocolate'
            render={({ field }) => (
              <FavorToggle<FavorMintChocolate>
                left='민초'
                right='반민초'
                selected={field.value}
                onSelect={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name='favor.fishBread'
            render={({ field }) => (
              <FavorToggle<FavorFishBread> left='팥붕' right='슈붕' selected={field.value} onSelect={field.onChange} />
            )}
          />
          <Controller
            control={control}
            name='favor.alcohol'
            render={({ field }) => (
              <FavorToggle<FavorAlcohol> left='소주' right='맥주' selected={field.value} onSelect={field.onChange} />
            )}
          />
          <Controller
            control={control}
            name='favor.tteokbokki'
            render={({ field }) => (
              <FavorToggle<FavorTteokbokki> left='밀떡' right='쌀떡' selected={field.value} onSelect={field.onChange} />
            )}
          />
        </FavorWrapper>
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

const FavorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 35px;
  margin-top: 20px;
  width: 593px;
  row-gap: 14px;
`;
