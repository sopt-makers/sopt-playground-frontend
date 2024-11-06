import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import ChipField from '@/components/coffeechat/upload/CoffeechatForm/ChipField';
import { CAREER_LEVEL } from '@/components/coffeechat/upload/CoffeechatForm/constants';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import FormTitle from '@/components/common/form/FormTitle';
import TextFieldLineBreak from '@/components/common/form/TextFieldLineBreak';
import Responsive from '@/components/common/Responsive';

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
        <ChipField
          field='memberInfo.career'
          errorMessage={errors.memberInfo?.career?.message ?? ''}
          chipList={CAREER_LEVEL}
          isSingleSelect
        />
      </CareerWrapper>
      <article>
        <FormTitle essential breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}>
          자기소개
        </FormTitle>
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
                    'ex. 안녕하세요, 서버 파트 수료 후 지금은 게임 업계 PM으로 일하고 있습니다. 개발자에서 PM으로 직무를 전환하는 과정이 쉽지 않았던 만큼, 제가 느낀 인사이트를 나누고 함께 고민하고 싶어요!',
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
                    'ex. 안녕하세요, 서버 파트 수료 후 지금은 게임 업계 PM으로 일하고 있습니다. 개발자에서 PM으로 직무를 전환하는 과정이 쉽지 않았던 만큼, 제가 느낀 인사이트를 나누고 함께 고민하고 싶어요!',
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
