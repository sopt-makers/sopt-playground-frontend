import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import useImageUploader from '@/hooks/useImageUploader';
import IconCancel from '@/public/icons/icon-cancel.svg';
import IconPencil from '@/public/icons/icon-pencil.svg';
import { textStyles } from '@/styles/typography';
import { buildCSSWithLength, CSSValueWithLength } from '@/utils';

interface ImageUploaderProps {
  src?: string;
  width?: CSSValueWithLength;
  height?: CSSValueWithLength;
  value?: string;
  className?: string;
  emptyIcon?: ReactNode;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onDelete?: () => void;
}

const ListImageUploader: FC<ImageUploaderProps> = ({
  width = 192,
  height = 108,
  onChange,
  onDelete,
  value,
  className,
  emptyIcon: EmptyIcon = <IconPlus />,
  errorMessage,
  src,
}) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [isSelectorOpened, setIsSelectorOpened] = useState<boolean>(false);

  const handleChangeImageInput = (s3Url: string) => {
    setPreviewImage(s3Url);
    onChange?.(s3Url);
  };
  const { imageInputRef, handleClickImageInput } = useImageUploader({ onSuccess: handleChangeImageInput });

  const previewImageSrc = value || previewImage || src;

  const openSelector = () => {
    setIsSelectorOpened(true);
  };
  const closeSelector = () => {
    setIsSelectorOpened(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setPreviewImage(undefined);
    closeSelector();
    onDelete?.();
  };

  const handleClick = () => {
    if (previewImageSrc) {
      openSelector();
    } else {
      handleClickImageInput();
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    handleClickImageInput();
    closeSelector();
  };

  useEffect(() => {
    const handleClickSelectorOutside = (e: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        closeSelector();
      }
    };
    if (isSelectorOpened) {
      document.addEventListener('mousedown', handleClickSelectorOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickSelectorOutside);
    };
  }, [selectorRef, isSelectorOpened]);

  return (
    <Container>
      <ImageUploader
        className={className}
        width={width}
        height={height}
        onClick={handleClick}
        error={Boolean(errorMessage)}
      >
        <StyledInput type='file' accept='image/*' ref={imageInputRef} />
        {isSelectorOpened && (
          <Background width={width} height={height}>
            <StyledSelector ref={selectorRef}>
              <StyledEditButton type='button' onClick={handleEdit}>
                <IconPencil />
                <div>수정</div>
              </StyledEditButton>
              <StyledRemoveButton type='button' onClick={handleDelete}>
                <IconCancel />
                <div>삭제</div>
              </StyledRemoveButton>
            </StyledSelector>
          </Background>
        )}
        {previewImageSrc ? <StyledPreview src={previewImageSrc} alt='preview-image' /> : EmptyIcon}
      </ImageUploader>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Container>
  );
};

export default ListImageUploader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageUploader = styled.div<Pick<ImageUploaderProps, 'width' | 'height'> & { error: boolean }>`
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.gray700};
  cursor: pointer;

  ${({ width }) => buildCSSWithLength('width', width)};
  ${({ height }) => buildCSSWithLength('height', height)};
  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${colors.error};
    `}
`;

const Background = styled.div<Pick<ImageUploaderProps, 'width' | 'height'>>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: rgb(0 0 0 / 50%);

  ${({ width }) => buildCSSWithLength('width', width)};
  ${({ height }) => buildCSSWithLength('height', height)};
`;

const StyledSelector = styled.div`
  display: flex;
`;

const editButtonStyle = css`
  display: flex;
  gap: 4px;
  background-color: ${colors.gray600};
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
    background-color: ${colors.gray600};
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

const StyledInput = styled.input`
  display: none;
`;

const StyledPreview = styled.img`
  border-radius: 6px;
  width: inherit;
  height: inherit;
  object-fit: cover;
`;

const IconPlus = () => (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M1 9H17' stroke='#606265' stroke-width='2' stroke-linecap='round' />
    <path d='M9 1L9 17' stroke='#606265' stroke-width='2' stroke-linecap='round' />
  </svg>
);
