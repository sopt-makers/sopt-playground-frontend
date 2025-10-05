import { useRef } from 'react';

import { getPresignedUrl, putPresignedUrl } from '@/api/endpoint/common/image';
import { MAX_FEED_IMAGE_LENGTH } from '@/components/feed/upload/ImageUploadButton';

interface Options {
  onSuccess?: (urls: string[]) => void;
  resizeHeight?: number;
  currentLength?: number;
}

export default function useImageUploader({ onSuccess, resizeHeight, currentLength = 0 }: Options) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleClickImageInput = () => {
    const inputEl = imageInputRef.current;
    if (!inputEl) return;
    inputEl.value = '';

    inputEl.onchange = async () => {
      if (inputEl.files == null || inputEl.files.length === 0) return;

      if (currentLength + inputEl.files.length > MAX_FEED_IMAGE_LENGTH) {
        alert(`최대 ${MAX_FEED_IMAGE_LENGTH}장까지 업로드할 수 있습니다. (현재: ${currentLength}장)`);
        return;
      }

      // MEMO: 리사이징 로직 임시 주석 처리
      // const files =
      //   resizeHeight == null
      //     ? inputEl.files
      //     : await Promise.all(Array.from(inputEl.files).map((file) => tryResizeFile(file, resizeHeight)));
      const files = inputEl.files;

      // const uploadFiles = debounce(async () => {
      const urls: string[] = [];

      await Promise.all(
        Array.from(files).map(async (file) => {
          try {
            const { filename, signedUrl } = await getPresignedUrl.request({ filename: file.name });
            if (!signedUrl) {
              throw new Error('presigned-url을 받아오는데 실패하였습니다.');
            }

            await putPresignedUrl({
              signedUrl: decodeURIComponent(signedUrl),
              file,
            });

            const s3Url = `https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal/${filename}`;
            urls.push(s3Url);
          } catch (error) {
            console.error(error);
          }
        }),
      );
      onSuccess?.(urls);
      // }, 500);

      // uploadFiles();
    };

    inputEl.click();
  };

  return { imageInputRef, handleClickImageInput };
}

const tryResizeFile = async (file: File, targetHeight: number) => {
  try {
    const { readAndCompressImage } = await import('browser-image-resizer');
    const blob = await readAndCompressImage(file, { maxHeight: targetHeight, mimeType: 'image/jpeg' });
    const newFile = new File([blob], file.name, {
      type: 'image/jpeg',
    });
    return newFile;
  } catch {
    return file;
  }
};
