import { useState } from 'react';

import { UploadFeedDataType } from '@/components/feed/upload/types';

export default function useUploadFeedData(initialForm: UploadFeedDataType) {
  const [feedData, setFeedData] = useState(initialForm);

  const handleSaveMainCategory = (categoryId: number) => {
    setFeedData((feedData) => ({ ...feedData, mainCategoryId: categoryId }));
  };

  const handleSaveCategory = (categoryId: number) => {
    setFeedData((feedData) => ({ ...feedData, categoryId: categoryId }));
  };

  const handleSaveIsQuestion = (isQuestion: boolean) => {
    setFeedData((feedData) => ({ ...feedData, isQuestion: isQuestion }));
  };

  const handleSaveIsBlindWriter = (isBlindWriter: boolean) => {
    setFeedData((feedData) => ({ ...feedData, isBlindWriter: isBlindWriter }));
  };

  const handleSaveTitle = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.target.value.replace(/\n/g, '');

    setFeedData((feedData) => ({ ...feedData, title: title }));
  };

  const handleSaveContent = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, content: e.target.value }));
  };

  const saveImageUrls = (urls: string[]) => {
    setFeedData((feedData) => ({ ...feedData, images: [...feedData.images, ...urls] }));
  };

  const removeImage = (index: number) => {
    const removeImages = feedData.images.filter((_, idx) => idx !== index);
    setFeedData((feedData) => ({ ...feedData, images: removeImages }));
  };

  const checkReadyToUpload = () => {
    return feedData.categoryId !== null && feedData.content.trim();
  };

  const resetFeedData = () => {
    setFeedData(initialForm);
  };

  return {
    feedData,
    handleSaveCategory,
    handleSaveIsQuestion,
    handleSaveMainCategory,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    resetFeedData,
    checkReadyToUpload,
  };
}
