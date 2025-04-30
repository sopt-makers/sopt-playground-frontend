import { useState } from 'react';

import useBlindWriterPromise from '@/components/feed/common/hooks/useBlindWriterPromise';
import useCategory from '@/components/feed/common/hooks/useCategory';
import { SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import { PostedFeedDataType } from '@/components/feed/upload/types';

export default function useUploadFeedData(defaultValue: PostedFeedDataType) {
  const [feedData, setFeedData] = useState(defaultValue);
  const { handleShowBlindWriterPromise } = useBlindWriterPromise();
  const { findParentCategory } = useCategory();

  const resetIsBlindWriter = (categoryId: number) => {
    !findParentCategory(categoryId)?.hasBlind && setFeedData((feedData) => ({ ...feedData, isBlindWriter: false }));
  };

  const resetIsQuestion = (categoryId: number) => {
    !findParentCategory(categoryId)?.hasQuestion && setFeedData((feedData) => ({ ...feedData, isQuestion: false }));
  };

  const handleSaveCategory = (categoryId: number) => {
    const isSopticle = findParentCategory(categoryId)?.id === SOPTICLE_CATEGORY_ID;

    resetIsBlindWriter(categoryId);
    resetIsQuestion(categoryId);
    setFeedData((feedData) => ({
      ...feedData,
      categoryId,
      ...(isSopticle // / 솝티클이면 content와 title 초기화
        ? { content: '', title: '' }
        : {}),
    }));
  };

  const handleSaveIsQuestion = (isQuestion: boolean) => {
    setFeedData((feedData) => ({ ...feedData, isQuestion: isQuestion }));
  };

  const handleSaveIsBlindWriter = (isBlindWriter: boolean) => {
    isBlindWriter && handleShowBlindWriterPromise();

    setFeedData((feedData) => ({ ...feedData, isBlindWriter: isBlindWriter }));
  };

  const handleSaveTitle = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.target.value.replace(/\n/g, '');

    setFeedData((feedData) => ({ ...feedData, title: title }));
  };

  const handleSaveContent = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, content: e.target.value }));
  };

  const handleSaveSopticleUrl = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, sopticleUrl: e.target.value }));
  };

  const saveImageUrls = (urls: string[]) => {
    setFeedData((feedData) => ({ ...feedData, images: [...feedData.images, ...urls] }));
  };

  const removeImage = (index: number) => {
    const removeImages = feedData.images.filter((_, idx) => idx !== index);
    setFeedData((feedData) => ({ ...feedData, images: removeImages }));
  };

  const checkReadyToUpload = () => {
    return (
      (feedData.categoryId !== null && feedData.content.trim()) ||
      (feedData.categoryId === SOPTICLE_CATEGORY_ID && feedData.sopticleUrl?.trim())
    );
  };

  const resetFeedData = () => {
    setFeedData(defaultValue);
  };

  return {
    feedData,
    handleSaveCategory,
    handleSaveIsQuestion,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    resetFeedData,
    checkReadyToUpload,
    findParentCategory,
    handleSaveSopticleUrl,
  };
}
