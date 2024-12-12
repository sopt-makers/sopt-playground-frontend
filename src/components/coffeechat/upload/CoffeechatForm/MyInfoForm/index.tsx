import styled from '@emotion/styled';
import { SelectV2 } from '@sopt-makers/ui';
import { Controller, useFormContext } from 'react-hook-form';

import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import BottomSheetSelect from '@/components/coffeechat/upload/CoffeechatForm/BottomSheetSelect';
import { CAREER_LEVEL_OPTIONS } from '@/components/coffeechat/upload/CoffeechatForm/constants';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import FormItem from '@/components/common/form/FormItem';
import FormTitle from '@/components/common/form/FormTitle';
import TextFieldLineBreak from '@/components/common/form/TextFieldLineBreak';
import Responsive from '@/components/common/Responsive';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function MyInfoForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CoffeechatFormContent>();

  return (
    <>
      <CareerWrapper>
        <FormTitle
          description='정규직으로 근무한 경력을 기준으로 선택해주세요'
          essential
          breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}
        >
          경력
        </FormTitle>

        <FormItem errorMessage={errors.memberInfo?.career?.message ?? ''}>
          <Controller
            name='memberInfo.career'
            control={control}
            render={({ field }) => (
              <>
                <CareerOptionContainer>
                  <Responsive only='desktop' {...field}>
                    <SelectV2.Root
                      type='text'
                      className='option-container'
                      visibleOptions={6}
                      defaultValue={CAREER_LEVEL_OPTIONS.find((option) => option.value === field.value)}
                      onChange={(value) => field.onChange(value)}
                    >
                      <SelectV2.Trigger>
                        <SelectV2.TriggerContent placeholder={'경력 선택'} />
                      </SelectV2.Trigger>
                      <SelectV2.Menu>
                        {CAREER_LEVEL_OPTIONS.map((option) => (
                          <SelectV2.MenuItem key={option.value} option={option} />
                        ))}
                      </SelectV2.Menu>
                    </SelectV2.Root>
                  </Responsive>

                  <Responsive only='mobile' {...field}>
                    <BottomSheetSelect
                      options={[...CAREER_LEVEL_OPTIONS]}
                      value={field.value}
                      placeholder='경력 선택'
                      onChange={(value) => field.onChange(value)}
                    />
                  </Responsive>
                </CareerOptionContainer>
              </>
            )}
          />
        </FormItem>
      </CareerWrapper>
      <article>
        <FormTitle breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}>자기소개</FormTitle>
        <Controller
          name='memberInfo.introduction'
          control={control}
          render={({ field }) => (
            <>
              <Responsive only='desktop'>
                <TextFieldLineBreak
                  name={field.name}
                  value={field.value ?? ''}
                  maxLength={200}
                  fixedHeight={126}
                  lineBreakPlaceholder={[
                    '안녕하세요, 서버 파트 수료 후 지금은 게임 업계 PM으로 일하고 있습니다. 개발자에서 PM으로 직무를 전환하는 과정이 쉽지 않았던 만큼, 제가 느낀 인사이트를 나누고 함께 고민하고 싶어요!',
                  ]}
                  isError={!!errors.memberInfo?.introduction}
                  errorMessage={errors.memberInfo?.introduction?.message}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </Responsive>
              <Responsive only='mobile'>
                <TextFieldLineBreak
                  name={field.name}
                  value={field.value ?? ''}
                  maxLength={200}
                  fixedHeight={150}
                  lineBreakPlaceholder={[
                    '안녕하세요, 서버 파트 수료 후 지금은 게임 업계 PM으로 일하고 있습니다. 개발자에서 PM으로 직무를 전환하는 과정이 쉽지 않았던 만큼, 제가 느낀 인사이트를 나누고 함께 고민하고 싶어요!',
                  ]}
                  isError={!!errors.memberInfo?.introduction}
                  errorMessage={errors.memberInfo?.introduction?.message}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </Responsive>
            </>
          )}
        />
      </article>
    </>
  );
}

const CareerWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CareerOptionContainer = styled.div`
  .option-container {
    width: 312px;

    button {
      width: 312px;

      div {
        width: 312px;
      }
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    .option-container {
      width: 100%;

      ul {
        margin-bottom: 24px;
        max-height: 400px !important;
      }

      button {
        width: 100%;

        div {
          width: 100%;
        }
      }
    }
  }
`;
