import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button, Callout, SelectV2, Tag, TextArea, useDialog, useToast } from '@sopt-makers/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useState } from 'react';

import { useGetCoffeechatHistory } from '@/api/endpoint/coffeechat/getCoffeechatHistory';
import { postCoffeechatReview } from '@/api/endpoint/coffeechat/postCoffeechatReview';
import AuthRequired from '@/components/auth/AuthRequired';
import BottomSheetMDS from '@/components/coffeechat/CoffeeChatReveiw/BottomSheetMDS';
import useCustomConfirm from '@/components/common/Modal/useCustomConfirm';
import Responsive from '@/components/common/Responsive';
import { MB_BIG_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const CoffeeChatReviewUpload = () => {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const { open } = useDialog();
  const { confirm } = useCustomConfirm();
  const [coffeechat, setCoffeechat] = useState<number>(0);

  const { open: toastOpen } = useToast();
  const { data, isLoading } = useGetCoffeechatHistory();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: () => postCoffeechatReview.request(coffeechat, nickname, content),
    onSuccess: () => {
      toastOpen({
        icon: 'success',
        content: '후기가 등록됐어요! 경험을 나눠주셔서 감사해요.',
        style: {
          content: {
            whiteSpace: 'pre-wrap',
          },
        },
      });
      router.push(playgroundLink.coffeechat());
    },
  });
  const selectOptions = data?.coffeeChatHistories.map((item) => ({
    label: item.coffeeChatBio || '',
    value: item.id ?? undefined,
    description: item.name + ' | ' + item.career || '',
  }));

  const handleEnroll = async () => {
    if (nickname.length <= 0 || content.length <= 0) {
      setIsChecked(true);
    } else if (coffeechat === 0) {
      open({
        title: `커피챗을 선택해주세요.`,
        description: <StDescription>커피챗 리뷰는 커피챗 작성 후에만 작성 가능합니다.</StDescription>,
        type: 'single',
        typeOptions: {
          approveButtonText: '확인',
        },
      });
    } else {
      open({
        title: '후기를 등록하기 전, 확인해주세요!',
        description: (
          <StDescription>
            한 번 등록한 후기는 수정할 수 없어요. 수정 및 삭제를 원하신다면 메이커스 카카오 채널로 문의해 주세요.
          </StDescription>
        ),
        type: 'default',
        typeOptions: {
          cancelButtonText: '닫기',
          approveButtonText: '등록하기',
          buttonFunction: async () => {
            await mutate();
          },
        },
      });
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
            <SelectV2.Root
              type='textDesc'
              className='coffechat-select'
              visibleOptions={3}
              onChange={(e) => setCoffeechat(Number(e))}
            >
              <SelectV2.Trigger>
                <SelectV2.TriggerContent placeholder={'진행한 커피챗의 제목이 무엇인가요?'} />
              </SelectV2.Trigger>
              <StSelectV2Menu className='coffeechat-ul'>
                {selectOptions?.map((option) => (
                  <StSelectV2MenuItem key={option.value} option={option} />
                ))}
              </StSelectV2Menu>
            </SelectV2.Root>
          </Responsive>
          <Responsive only='mobile'>
            <div style={{ marginTop: '8px' }}>
              <BottomSheetMDS
                placeholder='진행한 커피챗의 제목은 무엇인가요?'
                options={selectOptions || []}
                value={undefined}
                onChange={(value) => {
                  setCoffeechat(Number(value));
                }}
              />
            </div>
          </Responsive>
          {coffeechat > 0 && (
            <>
              {' '}
              <StInfo>선택한 커피챗의 주제</StInfo>
              <StLabelWrapper>
                {data?.coffeeChatHistories
                  .find((item) => item.id === coffeechat) // id가 coffeechat인 객체 찾기
                  ?.coffeeChatTopicType?.map((tag, index) => (
                    <Tag key={index} type='solid' size='md' variant='default'>
                      {tag}
                    </Tag>
                  ))}
              </StLabelWrapper>
            </>
          )}

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

const StLabelWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;

  div {
    border-radius: 100px;
    padding: 3px 9px;
  }
`;
const StSelectV2Menu = styled(SelectV2.Menu)`
  width: calc(100vw - 60px);
  max-width: 1200px;
  white-space: nowrap;

  li {
    width: calc(100vw - 60px);
    max-width: 1200px;

    button {
      width: calc(100vw - 60px);
      max-width: 1200px;
    }
  }
`;
const StSelectV2MenuItem = styled(SelectV2.MenuItem)`
  li {
    width: calc(100% - 60px);
  }
`;
const StDescription = styled.div`
  margin-top: 12px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
  }
`;
