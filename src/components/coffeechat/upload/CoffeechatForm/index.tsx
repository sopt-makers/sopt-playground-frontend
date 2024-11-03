import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import CoffeechatInfoForm from '@/components/coffeechat/upload/CoffeechatForm/CoffeechatInfoForm';
import MyInfoForm from '@/components/coffeechat/upload/CoffeechatForm/MyInfoForm';

export default function CoffeechatForm() {
  return (
    <>
      <SectionTitle>1. 내 정보</SectionTitle>
      <FormSection>
        <MyInfoForm />
      </FormSection>
      <SectionTitle>2. 커피챗 정보</SectionTitle>
      <FormSection>
        <CoffeechatInfoForm />
      </FormSection>
    </>
  );
}

const SectionTitle = styled.header`
  margin-top: 60px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.gray800};
  padding-bottom: 12px;
  width: 100%;
  color: ${colors.white};
  ${fonts.HEADING_24_B};

  @media ${COFFEECHAT_MOBILE_MEDIA_QUERY} {
    margin-top: 40px;
    ${fonts.HEADING_20_B};
  }
`;

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
