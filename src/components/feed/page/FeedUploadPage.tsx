import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Responsive from '@/components/common/Responsive';
import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import DesktopFeedUploadLayout from '@/components/feed/upload/layout/DesktopFeedUploadLayout';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import UsingRulesButton from '@/components/feed/upload/UsingRules/UsingRulesButton';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function FeedUploadPage() {
  return (
    <>
      <Responsive only='desktop'>
        <DesktopFeedUploadLayout
          header={
            <>
              <BackArrowWrapper>
                <BackArrow />
              </BackArrowWrapper>
              <CategoryHeader />
              <ButtonContainer>
                <UsingRulesButton />
                {/* TODO: 내용 입력 다 되면 disabled={false}되도록 로직 수정 */}
                <SubmitButton disabled={false}>올리기</SubmitButton>
              </ButtonContainer>
            </>
          }
          body={<>{/* TODO: 피드 input 삽입  */}</>}
          footer={
            <>
              <TagsWrapper>{/* TODO: 사진, 코드 태그 삽입  */}</TagsWrapper>
              <CheckBoxesWrapper>{/* TODO: 질문글, 익명 체크박스 삽입  */}</CheckBoxesWrapper>
            </>
          }
        />
      </Responsive>
      <Responsive only='mobile'>
        <MobileFeedUploadLayout
          header={
            <>
              <TopHeader>
                <Button type='button' disabled={false}>
                  취소
                </Button>
                {/* TODO: 내용 입력 다 되면 disabled={false}되도록 로직 수정 */}
                <Button type='submit' disabled={true}>
                  올리기
                </Button>
              </TopHeader>
              <CategoryHeader />
            </>
          }
          body={
            <>
              <CheckBoxesWrapper>{/* TODO: 질문글, 익명 체크박스 삽입  */}</CheckBoxesWrapper>
              {/* TODO: 피드 input 삽입  */}
              <TagsWrapper>{/* TODO: 사진, 코드 태그 삽입  */}</TagsWrapper>
            </>
          }
          footer={<>{/* TODO: 사진, 코드 태그 삽입  */}</>}
        />
      </Responsive>
    </>
  );
}

const BackArrowWrapper = styled.div`
  position: absolute;
  left: 0;
  padding-left: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  gap: 24px;
  padding-right: 32px;
`;

const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  height: 44px;
`;

const Button = styled.button<{ disabled: boolean }>`
  ${textStyles.SUIT_16_M};

  color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray600}
        `
      : css`
          ${colors.gray50}
        `};
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray700}
        `
      : css`
          ${colors.blue400}
        `};
  padding: 8px 12px;
  color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray300}
        `
      : css`
          ${colors.gray50}
        `};

  ${textStyles.SUIT_16_M};
`;

const UsingRulesButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 122px;
  justify-content: flex-end;
  width: 100%;
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
  }
`;

const CheckBoxesWrapper = styled.div`
  display: flex;
  gap: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 24px 0;
  }
`;
