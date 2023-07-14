import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';

import { getPresignedUrl } from '@/api/endpoint_LEGACY/image';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import IconCancel from '@/public/icons/icon-cancel.svg';
import IconImage from '@/public/icons/icon-image.svg';
import IconPencil from '@/public/icons/icon-pencil.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface ImageUploaderProps {
  width?: number | string;
  height?: number | string;
  value?: string | null;
  onChange?: (value: string | null) => void;
  className?: string;
  emptyIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  errorMessage?: string;
  src?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  width = 104,
  height = 104,
  onChange,
  value,
  className,
  emptyIcon: EmptyIcon = IconImage,
  errorMessage,
  src,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [isOpenSelector, setIsOpenSelector] = useState(false);

  const handleChange = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;
    inputEl.value = '';
    inputEl.onchange = async () => {
      const files = inputEl.files;
      if (files == null || files.length === 0) return;
      const file = files[0];
      try {
        const { filename, signedUrl } = await getPresignedUrl({ filename: file.name });
        if (!signedUrl) {
          throw new Error('presigned-url을 받아오는데 실패하였습니다.');
        }

        await axios.request({
          method: 'PUT',
          url: signedUrl,
          headers: { 'Content-Type': file.type },
          data: file,
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

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setPreviewImage(undefined);
    onChange?.(null);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    handleChange();
  };

  const closeSelector = () => setIsOpenSelector(false);

  useEffect(() => {
    if (src) setPreviewImage(src);
  }, [src]);

  useEffect(() => {
    closeSelector();
  }, [previewImage]);

  useEffect(() => {
    const handleClickSelectorOutside = (e: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        closeSelector();
      }
    };
    if (isOpenSelector) {
      document.addEventListener('mousedown', handleClickSelectorOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickSelectorOutside);
    };
  }, [selectorRef, isOpenSelector]);

  return (
    <StyledWrapper>
      <Container
        className={className}
        width={width}
        height={height}
        onClick={handleChange}
        error={Boolean(errorMessage)}
      >
        <StyledInput type='file' accept='image/*' ref={inputRef} />
        {value && previewImage ? <StyledPreview src={previewImage} alt='preview-image' /> : <EmptyIcon />}
        <StyledSelectorControlButton
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenSelector(true);
          }}
        >
          <IconPencil />
        </StyledSelectorControlButton>
        <StyledSelector ref={selectorRef} isOpen={isOpenSelector}>
          <StyledEditButton type='button' onClick={handleEdit}>
            <IconPencil />
            <div>수정</div>
          </StyledEditButton>
          <StyledRemoveButton type='button' onClick={handleRemove}>
            <IconCancel />
            <div>삭제</div>
          </StyledRemoveButton>
        </StyledSelector>
      </Container>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </StyledWrapper>
  );
};

export default ImageUploader;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Container = styled.div<Pick<ImageUploaderProps, 'width' | 'height'> & { error: boolean }>`
  display: flex;
  position: relative;
  flex-shrink: 0;
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

const StyledSelectorControlButton = styled.button`
  display: flex;
  position: absolute;
  right: 12px;
  bottom: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.black40};
  cursor: pointer;
  width: 22px;
  height: 22px;
`;

const StyledSelector = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  right: -40px;
  bottom: 35px;
`;

const editButtonStyle = css`
  display: flex;
  gap: 4px;
  background-color: ${colors.black40};
  padding: 10px 12px;
  line-height: 100%;
  letter-spacing: -0.01em;

  ${textStyles.SUIT_12_M};
`;

const StyledEditButton = styled.button`
  position: relative;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  cursor: pointer;

  ${editButtonStyle}

  &::after {
    position: absolute;
    top: 10px;
    right: 0;
    background-color: ${colors.gray100};
    width: 1px;
    height: 14px;
    content: '';
  }
`;

const StyledRemoveButton = styled.button`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  cursor: pointer;

  ${editButtonStyle}
`;
