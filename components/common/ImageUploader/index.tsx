import styled from '@emotion/styled';
import axios from 'axios';
import { FC, useRef, useState } from 'react';

import { project } from '@/api/project';
import { Fields } from '@/api/project/types';
import IconImage from '@/public/icons/icon-image.svg';
import { colors } from '@/styles/colors';

interface ImageUploaderProps {
  width?: number | string;
  height?: number | string;
  value?: string | null;
  onChange: (value: string | null) => void;
  className?: string;
  emptyIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  width = 104,
  height = 104,
  onChange,
  value,
  className,
  emptyIcon: EmptyIcon = IconImage,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

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
          data: { signedUrl, filename },
        } = await project.getPresignedUrl(file.name);
        if (!signedUrl) {
          throw new Error('presigned-url을 받아오는데 실패하였습니다.');
        }
        const { url, fields } = signedUrl;
        // MEMO: signedUrl 에서 응답으로 내려준 fields들을 formData에 그대로 담아 보내줍니다.
        const formData = new FormData();
        for (const key in fields) {
          formData.append(key, fields[key as keyof Fields]);
        }
        // MEMO: s3 버킷에 올라간 이미지 주소(s3Url)에 접근하기 위한 서버에서 준 filename으로 file의 이름을 변경하는 작업입니다.
        const blob = file.slice(0, file.size, 'image/*');
        const s3Filename = new File([blob], filename, { type: 'image/*' });
        formData.append('file', s3Filename);
        await axios.request({
          method: 'POST',
          url,
          data: formData,
        });
        const s3Url = `${url}/${filename}`;
        setPreviewImage(s3Url);
        onChange(s3Url);
      } catch (error) {
        console.error(error);
      }
    };
    inputEl.click();
  };

  return (
    <Container className={className} width={width} height={height} onClick={handleClick}>
      <StyledInput type='file' accept='image/*' ref={inputRef} />
      {value ? <StyledPreview src={previewImage} alt='preview-image' /> : <EmptyIcon />}
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
