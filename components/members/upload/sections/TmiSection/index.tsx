import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import Input from '@/components/common/Input';
import Responsive from '@/components/common/Responsive';
import TextArea from '@/components/common/TextArea';
import Select from '@/components/members/common/select/Select';
import { SOJU_CAPACITY_RANGE } from '@/components/members/upload/constants';
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
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function TmiSection() {
  const {
    control,
    formState: { errors },
    register,
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
                onSelect={(value: Mbti | null) => field.onChange(value)}
              />
            )}
          />
          <StyledTextArea {...register('mbtiDescription')} placeholder='ex) 저는 극강의 EEE에요.' />
        </MbtiWrapper>
      </StyledMemberFormItem>

      <StyledMemberFormItem title='소주, 어디까지 마셔봤니?'>
        <Controller
          control={control}
          name='sojuCapacity'
          render={({ field }) => (
            <StyledSelect placeholder='주량 선택' value={field.value} onChange={field.onChange}>
              {SOJU_CAPACITY_RANGE.map((capacity) => (
                <Select.Item key={capacity} value={capacity}>
                  {capacity}
                </Select.Item>
              ))}
            </StyledSelect>
          )}
        />
      </StyledMemberFormItem>

      <StyledMemberFormItem title='저는 요새 이런 걸 좋아해요!'>
        <StyledInput {...register('interest')} placeholder='ex) 요즘 넷플릭스 ‘더 글로리’에 빠졌어요.' />
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

      <StyledMemberFormItem title='나의 이상형은? 😏'>
        <Responsive only='desktop' asChild>
          <StyledInput
            {...register('idealType')}
            placeholder='ex) 마음이 따뜻한 사람, 아이스 아메리카노만 마시는 사람'
          />
        </Responsive>
        <Responsive only='mobile' asChild>
          <StyledTextArea
            {...register('idealType')}
            placeholder={`ex) 마음이 따뜻한 사람,\n아이스 아메리카노만 마시는 사람`}
          />
        </Responsive>
      </StyledMemberFormItem>

      <StyledMemberFormItem title='자유로운 자기소개'>
        <StyledIntroductionTextarea
          {...register('longIntroduction')}
          placeholder={`• 나는 이런 사람이에요.\n• SOPT에 들어온 계기\n• SOPT에 들어오기 전에 무엇을 해왔는지\n• 프로젝트할 때의 나의 성향\n• SOPT에서 하고 싶은 것 등등`}
        />
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
  margin-top: 14px;
  border-radius: 13px;
  padding: 14px 20px;
  width: 632px;
  height: 76px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: 80px;
    line-height: 150%;
  }
`;

const FavorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 35px;
  margin-top: 20px;
  width: 593px;
  row-gap: 14px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledSelect = styled(Select)`
  margin-top: 14px;

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: ${colors.black80};
  }
`;

const StyledInput = styled(Input)`
  margin-top: 14px;
  width: 632px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledIntroductionTextarea = styled(StyledTextArea)`
  margin-top: 14px;
  height: 170px;
  line-height: 170%;
  letter-spacing: -0.01em;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 152px;
  }
`;
