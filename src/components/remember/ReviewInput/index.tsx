import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetReviewsInfiniteQuery } from '@/api/endpoint/remember/getReviews';
import { useUploadReviewMutation } from '@/api/endpoint/remember/uploadReview';
import { LATEST_GENERATION } from '@/constants/generation';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ChangeEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const MAX_LENGTH = 3000;

export default function ReviewInput() {
  const [content, setContent] = useState<string>('');
  const [inputStatus, setInputStatus] = useState<'error' | 'focus'>();
  const { mutate } = useUploadReviewMutation();
  const { refetch } = useGetReviewsInfiniteQuery();
  const { data: myData } = useGetMemberOfMe();
  const is34 = myData?.generation === LATEST_GENERATION;

  const handleWrite = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;

    if (content === undefined || (content && content.length > MAX_LENGTH)) return;
    if (content.length === 3000) {
      setInputStatus('error');
    } else {
      setInputStatus('focus');
    }

    setContent(content);
  };

  const handleFocus = () => {
    setInputStatus('focus');
  };

  const handleBlur = () => {
    setInputStatus(undefined);
  };

  const handleSubmit = () => {
    if (content !== undefined && content !== '') {
      mutate(
        { content: content },
        {
          onSuccess: () => {
            refetch();
            setContent('');
          },
        },
      );
    }
  };

  const isError = inputStatus === 'error';
  const isFocus = inputStatus === 'focus';

  return (
    <>
      {is34 && (
        <ReviewInputWrapper>
          <InputBox isFocus={isFocus} isError={isError}>
            <Input
              value={content}
              placeholder='SOPT를 하며 재밌었던 일, 힘들었던 기억 등을 자유롭게 공유해주세요!'
              maxLength={MAX_LENGTH}
              onChange={(e) => handleWrite(e)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <SendButton onClick={handleSubmit}>
              <SendIcon isActivate={isError || isFocus} />
            </SendButton>
          </InputBox>
          <Bottom>
            {isError ? <Error /> : <div />}
            <Length>{content ? content.length.toLocaleString() : 0}/3,000</Length>
          </Bottom>
        </ReviewInputWrapper>
      )}
    </>
  );
}

const Error = () => {
  return (
    <ErrorWrapper>
      <ErrorIcon />
      <p>3,000자 이상 입력할 수 없어요</p>
    </ErrorWrapper>
  );
};

const ErrorIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <g clip-path='url(#clip0_2553_295)'>
        <path
          d='M6.99984 4.6665V6.99984M6.99984 9.33317H7.00567M12.8332 6.99984C12.8332 10.2215 10.2215 12.8332 6.99984 12.8332C3.77818 12.8332 1.1665 10.2215 1.1665 6.99984C1.1665 3.77818 3.77818 1.1665 6.99984 1.1665C10.2215 1.1665 12.8332 3.77818 12.8332 6.99984Z'
          stroke='#F04251'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_2553_295'>
          <rect width='14' height='14' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

const SendIcon = ({ isActivate }: { isActivate: boolean }) => {
  const stroke = isActivate ? 'white' : '#515159';

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M8.74976 11.2501L17.4998 2.50014M8.85608 11.5235L11.0462 17.1552C11.2391 17.6513 11.3356 17.8994 11.4746 17.9718C11.5951 18.0346 11.7386 18.0347 11.8592 17.972C11.9983 17.8998 12.095 17.6518 12.2886 17.1559L17.7805 3.08281C17.9552 2.63516 18.0426 2.41133 17.9948 2.26831C17.9533 2.1441 17.8558 2.04663 17.7316 2.00514C17.5886 1.95736 17.3647 2.0447 16.9171 2.21939L2.84398 7.71134C2.34808 7.90486 2.10013 8.00163 2.02788 8.14071C1.96524 8.26129 1.96532 8.40483 2.0281 8.52533C2.10052 8.66433 2.34859 8.7608 2.84471 8.95373L8.47638 11.1438C8.57708 11.183 8.62744 11.2026 8.66984 11.2328C8.70742 11.2596 8.74028 11.2925 8.76709 11.3301C8.79734 11.3725 8.81692 11.4228 8.85608 11.5235Z'
        stroke={stroke}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

const ReviewInputWrapper = styled.section`
  width: 100%;
  max-width: 1037px;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${colors.error};
  ${fonts.LABEL_12_SB};
`;

const Bottom = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  width: 100%;
`;

const Length = styled.div`
  color: ${colors.gray200};
  ${fonts.LABEL_12_SB};
`;

const SendButton = styled.i`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const InputBox = styled.div<{ isFocus: boolean; isError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ isError, isFocus }) => (isError ? colors.error : isFocus ? colors.gray200 : 'transparent')};
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding: 11px 16px;
  width: 100%;
`;

const Input = styled(TextareaAutosize)`
  outline: none;
  background-color: transparent;
  width: 100%;
  max-width: calc(100% - 35px);
  min-height: 26px;
  max-height: 52px;
  overflow-y: scroll;
  resize: none;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
  color: ${colors.white};
  ${fonts.BODY_16_M};

  ::placeholder {
    color: ${colors.gray300};
  }
`;
