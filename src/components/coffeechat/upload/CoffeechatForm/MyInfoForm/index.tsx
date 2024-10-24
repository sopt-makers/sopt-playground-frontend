import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import ChipField from '@/components/coffeechat/upload/CoffeechatForm/ChipField';
import { CAREER_LEVEL } from '@/components/coffeechat/upload/CoffeechatForm/constants';
import { CoffeechatFormContent, CoffeechatFormPaths } from '@/components/coffeechat/upload/CoffeechatForm/types';
import FormTitle from '@/components/common/form/FormTitle';
import TextFieldLineBreak from '@/components/common/form/TextFieldLineBreak';
import Responsive from '@/components/common/Responsive';

export default function MyInfoForm() {
  const {
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext<CoffeechatFormContent>();

  const handleChange = (key: CoffeechatFormPaths, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(key, e.target.value);
  };

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
          errorMessage={errors.memberInfo?.career ? '경력을 선택해주세요' : ''}
          chipList={CAREER_LEVEL}
          isSingleSelect
        />
      </CareerWrapper>
      <article>
        <FormTitle essential breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}>
          자기소개
        </FormTitle>
        <Responsive only='desktop'>
          <TextFieldLineBreak
            value={watch('memberInfo.introduction') ?? ''}
            maxLength={200}
            fixedHeight={126}
            lineBreakPlaceholder={['• 직무 경험이나 관심 분야를 적어주면 더 좋아요!']}
            isError={!!errors.memberInfo?.introduction}
            errorMessage='자기소개를 입력해주세요'
            onChange={(e) => handleChange('memberInfo.introduction', e)}
          />
        </Responsive>
        <Responsive only='mobile'>
          <TextFieldLineBreak
            value={watch('memberInfo.introduction') ?? ''}
            maxLength={200}
            fixedHeight={150}
            lineBreakPlaceholder={['• 직무 경험이나 관심 분야를 적어주면 더 좋아요!']}
            isError={!!errors.memberInfo?.introduction}
            errorMessage='자기소개를 입력해주세요'
            onChange={(e) => handleChange('memberInfo.introduction', e)}
          />
        </Responsive>
      </article>
    </>
  );
}

const CareerWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
