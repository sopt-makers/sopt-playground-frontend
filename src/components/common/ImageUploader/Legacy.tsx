import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useEffect, useRef, useState } from 'react';

import { getPresignedUrl, putPresignedUrl } from '@/api/endpoint/common/image';
import IconImage from '@/public/icons/icon-image.svg';
import { colors } from '@/styles/colors';

interface ImageUploaderProps {
  width?: number | string;
  height?: number | string;
  value?: string | null;
  onChange?: (value: string | null) => void;
  className?: string;
  emptyIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  error?: boolean;
  src?: string;
}

const ImageUploaderLegacy: FC<ImageUploaderProps> = ({
  width = 104,
  height = 104,
  onChange,
  value,
  className,
  emptyIcon: EmptyIcon = IconImage,
  error,
  src,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    if (src) setPreviewImage(src);
  }, [src]);

  const handleClick = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;
    inputEl.value = '';
    inputEl.onchange = async () => {
      const files = inputEl.files;
      if (files == null || files.length === 0) return;
      const file = files[0];
      try {
        const { filename, signedUrl } = await getPresignedUrl.request({ filename: file.name });
        if (!signedUrl) {
          throw new Error('presigned-url을 받아오는데 실패하였습니다.');
        }

        await putPresignedUrl({
          signedUrl,
          file,
        });

        const s3Url = `https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal/${filename}`;
        setPreviewImage(s3Url);
        onChange?.(s3Url);
      } catch (error) {
        console.error(error);
      }
    };
    inputEl.click();
  };

  return (
    <Container className={className} width={width} height={height} onClick={handleClick} error={error}>
      <StyledInput type='file' accept='image/*' ref={inputRef} />
      {value ? <StyledPreview src={previewImage} alt='preview-image' /> : <EmptyIcon />}
    </Container>
  );
};

export default ImageUploaderLegacy;

const Container = styled.div<Pick<ImageUploaderProps, 'width' | 'height' | 'error'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.black60};
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};
  height: ${({ height }) => (typeof height === 'string' ? height : `${height}px`)};

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${colors.red100};
    `}
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledPreview = styled.img`
  border-radius: 6px;
  width: inherit;
  height: inherit;
  object-fit: cover;
`;
