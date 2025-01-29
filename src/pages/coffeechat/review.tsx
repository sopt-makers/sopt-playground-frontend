import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronRight } from '@sopt-makers/icons';
import { Button, Callout, SelectV2, Tag, TextArea, TextField } from '@sopt-makers/ui';
import { useState } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import BottomSheetMDS from '@/components/coffeechat/CoffeeChatReveiw/BottomSheetMDS';
import Responsive from '@/components/common/Responsive';
import Select from '@/components/common/Select';
import { MB_BIG_MEDIA_QUERY, MB_MID_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const CoffeeChatReviewUpload = () => {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [coffeechat, setCoffeechat] = useState('');
  const handleEnroll = () => {
    if (nickname.length <= 0 || content.length <= 0) {
      setIsChecked(true);
    } else {
      //여기 로직
    }
  };
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
            <Select></Select>
          </Responsive>
          <Responsive only='mobile'>
            <div style={{ marginTop: '8px' }}>
              <BottomSheetMDS
                placeholder='진행한 커피챗의 제목은 무엇인가요?'
                options={[
                  {
                    label: '💬 CRM 도구와 친해져보아요, Braze 잘 쓰는 PM 되기',
                    value: 's',
                    subLabel: '차은우ㅣ주니어(0-3년차)',
                  },
                  { label: 's', value: 'ss', subLabel: 's' },
                ]}
                value={undefined}
                onChange={() => {}}
              />
            </div>
          </Responsive>
          <StInfo>선택한 커피챗의 주제</StInfo>
          <StLabelWrapper>
            <Tag type='solid' size='md' variant='default'>
              창업
            </Tag>
            <Tag type='solid' size='md' variant='default'>
              자기개발
            </Tag>
            <Tag type='solid' size='md' variant='default'>
              포트폴리오
            </Tag>
          </StLabelWrapper>
          <StInfo>
            나의 닉네임 <span style={{ color: 'rgb(247 114 52 / 100%)' }}>*</span>
          </StInfo>
          <StSubInfo>후기는 커피솝 홈에 익명으로 등록돼요! 원하는 닉네임을 입력해주세요</StSubInfo>
          <div style={{ position: 'relative' }}>
            <StTextArea
              errorMessage='닉네임을 입력해주세요'
              isError={isChecked && nickname.length <= 0}
              maxLength={10}
              placeholder='ex. 카페인 중독자'
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
            />
            <TextCountWrapper>{nickname.length < 10 ? nickname.length : 10}/10</TextCountWrapper>
            <StInfo>
              상세 후기 <span style={{ color: 'rgb(247 114 52 / 100%)' }}>*</span>
            </StInfo>
          </div>
          <div style={{ position: 'relative', height: 'auto' }}>
            <StTextArea
              errorMessage='상세 후기를 입력해주세요'
              placeholder={`ex.
• 궁금했던 내용을 A-Z까지 친절하게 알려주셔서 유익했어요.
• 이런 내용을 나눌 수 있어서 뜻 깊었어요.`}
              fixedHeight={130}
              maxLength={500}
              onChange={(e) => setContent(e.target.value)}
              isError={isChecked && content.length <= 0}
              value={content}
            ></StTextArea>
            <TextCountWrapper style={{ top: '160px' }}>{content.length}/500</TextCountWrapper>
          </div>
          <StButtonWrapper>
            <StButton onClick={() => handleEnroll()}>후기 등록하기</StButton>
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

  .coffechat-select {
    margin-top: 8px;
    width: 100%;

    button {
      width: 100%;

      div {
        width: 100%;
      }
    }
  }

  .coffeechat-ul {
    width: 100%;
  }
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
  }
  @media ${MB_BIG_MEDIA_QUERY} {
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
  letter-spacing: -0.32px;
  color: ${colors.gray300};

  @media ${MB_BIG_MEDIA_QUERY} {
    ${fonts.LABEL_12_SB};
  }
`;

const StTextArea = styled(TextArea)`
  margin-top: 8px;
`;
const StButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 70px;
  width: 100%;
`;
const TextCountWrapper = styled.div`
  position: absolute;
  top: 56px;
  width: 100%;
  text-align: right;
  color: ${colors.gray300};
  ${fonts.LABEL_12_SB};
`;
const StButton = styled(Button)`
  @media ${MB_BIG_MEDIA_QUERY} {
    width: 100%;
    height: 42px;
    ${fonts.LABEL_16_SB}
  }
`;
const StSelect = styled.select`
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 8px;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding: 10px 0;
  width: 100%;
  height: 48px;
`;
const StLabelWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;

  div {
    border-radius: 100px;
    padding: 3px 9px;
  }
`;
