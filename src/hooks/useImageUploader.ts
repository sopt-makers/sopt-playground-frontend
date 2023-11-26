import { useRef } from 'react';

import { getPresignedUrl, putPresignedUrl } from '@/api/endpoint/common/image';

interface Options {
  onSuccess?: (urls: string[]) => void;
  resizeHeight?: number;
}

export default function useImageUploader({ onSuccess, resizeHeight }: Options) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<string[]>([]);

  const handleClickImageInput = () => {
    const inputEl = imageInputRef.current;
    if (!inputEl) return;
    inputEl.value = '';

    inputEl.onchange = async () => {
      if (inputEl.files == null || inputEl.files.length === 0) return;

      const files =
        resizeHeight == null
          ? inputEl.files
          : await Promise.all(Array.from(inputEl.files).map((file) => tryResizeFile(file, resizeHeight)));

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
            urlsRef.current.push(s3Url);
          } catch (error) {
            console.error(error);
          }
        }),
      );
      onSuccess?.(urlsRef.current);
      urlsRef.current = [];
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
