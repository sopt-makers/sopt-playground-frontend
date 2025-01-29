import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button, Callout, SelectV2, TextArea, TextField } from '@sopt-makers/ui';

import AuthRequired from '@/components/auth/AuthRequired';
import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import TextFieldLineBreak from '@/components/common/form/TextFieldLineBreak';
import Responsive from '@/components/common/Responsive';
import Select from '@/components/common/Select';
import { MB_BIG_MEDIA_QUERY, MB_MID_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const CoffeeChatReviewUpload = () => {
  return (
    <AuthRequired>
      <StMainSection>
        <StReviewSection>
          <StTitle>커피챗 후기 작성하기</StTitle>
          <Callout type='information'>
            커피솝에서 유익한 시간 보내셨나요? 커피솝에서 더 많은 커피챗이 오갈 수 있도록 소중한 후기를 부탁드려요!
          </Callout>
          <StInfo>
            후기를 작성할 커피챗 <span style={{ color: 'rgb(247 114 52 / 100%)' }}>*</span>
          </StInfo>
          <StSubInfo>커피챗을 진행한 회원인지 확인이 필요해요. 어떤 커피챗을 진행했는지는 공개되지 않아요</StSubInfo>
          <Responsive only='desktop'>
            <SelectV2.Root className='coffechat-select' type='text' visibleOptions={4}>
              <SelectV2.Trigger>
                <SelectV2.TriggerContent placeholder='경력' />
              </SelectV2.Trigger>
              <SelectV2.Menu>
                <StDesktopSelect>
                  <SelectV2.MenuItem key={'dd'} option={{ value: 'dd', label: 'dd' }} />
                </StDesktopSelect>
              </SelectV2.Menu>
            </SelectV2.Root>
          </Responsive>
          <StInfo>
            나의 닉네임 <span style={{ color: 'rgb(247 114 52 / 100%)' }}>*</span>
          </StInfo>
          <StSubInfo>후기는 커피솝 홈에 익명으로 등록돼요! 원하는 닉네임을 입력해주세요</StSubInfo>
          <StTextField errorMessage='닉네임을 입력해주세요' isError={true} maxLength={10} placeholder='안녕하세요' />
          <StInfo>
            상세 후기 <span style={{ color: 'rgb(247 114 52 / 100%)' }}>*</span>
          </StInfo>
          <StTextArea
            placeholder='ex) 
            궁금했던 내용을 A-Z까지 친절하게 알려주셔서 유익했어요.
            이런 내용을 나눌 수 있어서 뜻 깊었어요.'
            fixedHeight={142}
          ></StTextArea>
          <StButtonWrapper>
            <Button>후기 등록하기</Button>
          </StButtonWrapper>
        </StReviewSection>
      </StMainSection>
    </AuthRequired>
  );
};
setLayout(CoffeeChatReviewUpload, 'headerFooter');
export default CoffeeChatReviewUpload;
const StMainSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  margin-bottom: 142px;
  width: 100%;
  height: 100%;
  @media ${MB_BIG_MEDIA_QUERY} {
    margin-top: 0;
    margin-bottom: 84px;
  }
`;
const StReviewSection = styled.div`
  padding: 40px;
  padding-right: 30px;
  padding-left: 30px;
  width: 1260px;

  @media ${MB_BIG_MEDIA_QUERY} {
    padding: 30px;
    padding-right: 20px;
    padding-left: 20px;
  }
`;
const StTitle = styled.div`
  margin-bottom: 20px;
  width: 100%;
  height: 48px;
  ${fonts.HEADING_32_B}
  @media ${MB_BIG_MEDIA_QUERY} {
    ${fonts.HEADING_24_B}

    margin-bottom:16px;
  }
`;
const StInfo = styled.div`
  ${fonts.LABEL_16_SB}

  margin-top:40px;
  @media ${MB_BIG_MEDIA_QUERY} {
    ${fonts.LABEL_14_SB};
  }
`;
const StSubInfo = styled.div`
  ${fonts.LABEL_14_SB}

  margin-top:8px;
  color: ${colors.gray300};
  @media ${MB_BIG_MEDIA_QUERY} {
    ${fonts.LABEL_12_SB};
  }
`;
const StDesktopSelect = styled.div`
  width: 100%;

  ul {
    width: 100%;
  }

  li {
    width: 100%;
  }
`;
const StTextField = styled(TextField)`
  margin-top: 8px;
`;
const StTextArea = styled(TextArea)`
  margin-top: 8px;
`;
const StButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  width: 100%;
`;
