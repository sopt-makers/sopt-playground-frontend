import { useState } from 'react';

import { categories } from '@/components/feed/upload/Category/constants';
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
    console.log('isBlindWriter ' + isBlindWriter);
    setFeedData((feedData) => ({ ...feedData, isBlindWriter: isBlindWriter }));
  };

  const handleSaveTitle = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, title: e.target.value }));
  };

  const handleSaveContent = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, content: e.target.value }));
  };

  const saveImageUrls = (urls: string) => {
    setFeedData((feedData) => ({ ...feedData, images: [...feedData.images, urls] }));
  };

  const removeImage = (index: number) => {
    const removeImages = feedData.images.filter((_, idx) => idx !== index);
    setFeedData((feedData) => ({ ...feedData, images: removeImages }));
  };

  const checkReadyToShowUsingRules = () => {
    return feedData.categoryId !== 0;
  };

  const checkReadyToUpload = () => {
    return feedData.categoryId !== 0 && feedData.content !== '' && feedData.title !== '';
  };

  const resetFeedData = () => {
    setFeedData(initialForm);
  };

  const parentCategory =
    categories.find(
      (category) =>
        category.id === feedData.mainCategoryId || category.children.some((tag) => tag.id === feedData.categoryId),
    ) ?? null;

  const isInitial =
    categories.find(
      (category) =>
        category.id === feedData.mainCategoryId && category.children.some((tag) => tag.id === feedData.categoryId),
    ) ?? null;

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
    checkReadyToShowUsingRules,
    parentCategory,
    isInitial,
  };
}
