import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { FC, useEffect, useRef, useState } from 'react';
import IconImage from '@/public/icons/icon-image.svg';
import { project } from '@/api/project';

interface ImageUploaderProps {
  width?: number | string;
  height?: number | string;
  value?: File | null;
  onChange: (value: File | null) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({ width = 104, height = 104, onChange, value }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    if (!value) {
      return;
    }
    const preview = URL.createObjectURL(value);
    setPreviewImage(preview);
  }, [value]);

  const handleClick = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;
    inputEl.value = '';
    inputEl.onchange = async () => {
      const files = inputEl.files;
      if (files == null || files.length === 0) return;
      const file = files[0];
      try {
        const {
          data: { signedUrl },
        } = await project.getPresignedUrl();
        if (!signedUrl) {
          throw new Error('presignedUrl이 존재하지 않습니다.');
        }
        const { data: s3Url } = await project.putImage({
          url: signedUrl,
          image: file,
        });
        onChange(s3Url);
      } catch (error) {
        console.error(error);
      }
    };
    inputEl.click();
  };

  return (
    <Container onClick={handleClick} width={width} height={height}>
      <StyledInput type='file' accept='image/*' ref={inputRef} />
      {value ? <StyledPreview src={previewImage} alt='preview-image' /> : <IconImage />}
    </Container>
  );
};

export default ImageUploader;

const Container = styled.div<Pick<ImageUploaderProps, 'width' | 'height'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.black60};
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};
  height: ${({ height }) => (typeof height === 'string' ? height : `${height}px`)};
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledPreview = styled.img`
  width: inherit;
  height: inherit;
`;
