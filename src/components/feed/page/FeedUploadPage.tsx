import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FormEvent } from 'react';

import Responsive from '@/components/common/Responsive';
import Category from '@/components/feed/upload/Category';
import { useCategorySelect } from '@/components/feed/upload/hooks/useCategorySelect';
import useUploadFeedData from '@/components/feed/upload/hooks/useUploadFeedData';
import ImagePreview from '@/components/feed/upload/ImagePreview';
import ImageUploadButton from '@/components/feed/upload/ImageUploadButton';
import ContentsInput from '@/components/feed/upload/Input/ContentsInput';
import TitleInput from '@/components/feed/upload/Input/TitleInput';
import DesktopFeedUploadLayout from '@/components/feed/upload/layout/DesktopFeedUploadLayout';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import UsingRules from '@/components/feed/upload/UsingRules';
import useImageUploader from '@/hooks/useImageUploader';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function FeedUploadPage() {
  const [
    feedData,
    handleSaveCategory,
    handleSaveIsQuestion,
    handleSaveMainCategory,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    handleUploadFeed,
    resetFeedData,
    checkReadyToUpload,
  ] = useUploadFeedData({
    mainCategoryId: 0,
    categoryId: 0,
    title: '',
    content: '',
    isQuestion: false,
    isBlindWriter: false,
    images: [],
  });

  const { imageInputRef: desktopRef, handleClickImageInput: handleDesktopClickImageInput } =
    useImageUploader(saveImageUrls);
  const { imageInputRef: mobileRef, handleClickImageInput: handleMobileClickImageInput } =
    useImageUploader(saveImageUrls);
  const { isDropDown, allClosed, categoryOpen, tagOpen, usingRulesOpen } = useCategorySelect('categoryOpen');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUploadFeed();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Responsive only='desktop'>
        <DesktopFeedUploadLayout
          header={
            <>
              <BackArrowWrapper>
                <BackArrow onClick={resetFeedData} />
              </BackArrowWrapper>
              <Category
                feedData={feedData}
                onSaveCategory={handleSaveCategory}
                onSaveMainCategory={handleSaveMainCategory}
                isDropDown={isDropDown}
                categoryOpen={categoryOpen}
                tagOpen={tagOpen}
                usingRulesOpen={usingRulesOpen}
              />
              <ButtonContainer>
                <UsingRules isDropDown={isDropDown} allClosed={allClosed} />
                <SubmitButton disabled={!checkReadyToUpload()}>올리기</SubmitButton>
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
                  onClick={handleDesktopClickImageInput}
                  imageInputRef={desktopRef}
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
                <Button type='submit' disabled={!checkReadyToUpload()}>
                  올리기
                </Button>
              </TopHeader>
              <Category
                feedData={feedData}
                onSaveCategory={handleSaveCategory}
                onSaveMainCategory={handleSaveMainCategory}
                isDropDown={isDropDown}
                categoryOpen={categoryOpen}
                tagOpen={tagOpen}
                usingRulesOpen={usingRulesOpen}
              />
            </>
          }
          body={
            <>
              <CheckBoxesWrapper>{/* TODO: 질문글, 익명 체크박스 삽입  */}</CheckBoxesWrapper>
              <TitleInput onChange={handleSaveTitle} />
              <ContentsInput onChange={handleSaveContent} />
              <ImagePreview images={feedData.images} onRemove={removeImage} />
              <TagsWrapper>
                <ImageUploadButton
                  imageLength={feedData.images.length}
                  onClick={handleMobileClickImageInput}
                  imageInputRef={mobileRef}
                />
                {/* TODO:  코드 태그 삽입  */}
              </TagsWrapper>
            </>
          }
          footer={
            <>
              <UsingRules isDropDown={isDropDown} allClosed={allClosed} />
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
