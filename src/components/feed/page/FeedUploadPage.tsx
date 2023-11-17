import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Responsive from '@/components/common/Responsive';
import Category from '@/components/feed/upload/Category';
import useUploadFeedData from '@/components/feed/upload/hooks/handleUploadFeed';
import ImagePreview from '@/components/feed/upload/ImagePreview';
import ImageUploadButton from '@/components/feed/upload/ImageUploadButton';
import ContentsInput from '@/components/feed/upload/Input/ContentsInput';
import TitleInput from '@/components/feed/upload/Input/TitleInput';
import DesktopFeedUploadLayout from '@/components/feed/upload/layout/DesktopFeedUploadLayout';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import UsingRulesButton from '@/components/feed/upload/UsingRules/UsingRulesButton';
import UsingRulesPreview from '@/components/feed/upload/UsingRules/UsingRulesPreview';
import useImageUploader from '@/hooks/useImageUploader';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function FeedUploadPage() {
  const [
    feedData,
    handleSaveCategory,
    handleSaveIsQuestion,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    handleUploadFeed,
    resetFeedData,
  ] = useUploadFeedData({
    categoryId: 1,
    title: '',
    content: '',
    isQuestion: false,
    isBlindWriter: false,
    images: [],
  });

  const { imageInputRef, handleClickImageInput } = useImageUploader(saveImageUrls);

  return (
    <form onSubmit={handleUploadFeed}>
      <Responsive only='desktop'>
        <DesktopFeedUploadLayout
          header={
            <>
              <BackArrowWrapper>
                <BackArrow onClick={resetFeedData} />
              </BackArrowWrapper>
              <Category categoryId={feedData.categoryId} onSave={handleSaveCategory} />
              <ButtonContainer>
                <UsingRulesButton />
                {/* TODO: 내용 입력 다 되면 disabled={false}되도록 로직 수정 */}
                <SubmitButton disabled={false}>올리기</SubmitButton>
              </ButtonContainer>
            </>
          }
          body={
            <>
              <TitleInput onChange={handleSaveTitle} />
              <ContentsInput onChange={handleSaveContent} />
            </>
          }
          footer={
            <>
              <ImagePreview images={feedData.images} onRemove={removeImage} />
              <TagsWrapper>
                <ImageUploadButton
                  imageLength={feedData.images.length}
                  onClick={handleClickImageInput}
                  imageInputRef={imageInputRef}
                />

                {/* TODO: 코드 태그 삽입  */}
              </TagsWrapper>
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
                <Button type='button' disabled={false} onClick={resetFeedData}>
                  취소
                </Button>
                {/* TODO: 내용 입력 다 되면 disabled={false}되도록 로직 수정 */}
                <Button type='submit' disabled={true}>
                  올리기
                </Button>
              </TopHeader>
              <Category categoryId={feedData.categoryId} onSave={handleSaveCategory} />
            </>
          }
          body={
            <>
              <CheckBoxesWrapper>{/* TODO: 질문글, 익명 체크박스 삽입  */}</CheckBoxesWrapper>
              <TitleInput onChange={handleSaveTitle} />
              <ContentsInput onChange={handleSaveContent} />
              {/* <ImagePreview images={images} onRemove={removeImage} /> */}
              <TagsWrapper>
                {/* <ImageUploadButton
                  imageLength={images.length}
                  onClick={handleClickImageInput}
                  imageInputRef={imageInputRef}
                /> */}
                {/* TODO: 사진, 코드 태그 삽입  */}
              </TagsWrapper>
            </>
          }
          footer={
            <>
              <UsingRulesPreview />
              <UsingRulesButton />
            </>
          }
        />
      </Responsive>
    </form>
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
