import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Ref } from 'react';

import { textStyles } from '@/styles/typography';

interface ImageUploadButtonProps {
  imageLength: number;
  onClick: () => void;
  imageInputRef: Ref<HTMLInputElement>;
}

const MAX_IMAGE_LENGTH = 10;

export default function ImageUploadButton({ imageLength, onClick, imageInputRef }: ImageUploadButtonProps) {
  return (
    <Button type='button' onClick={onClick}>
      {imageSvg}
      사진
      {imageLength > 0 && (
        <Length>
          {imageLength}/{MAX_IMAGE_LENGTH}
        </Length>
      )}
      <StyledInput type='file' accept='image/*' ref={imageInputRef} multiple />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  border-radius: 21px;
  background-color: ${colors.gray700};
  padding: 6px 12px;
  color: ${colors.gray10};
  ${textStyles.SUIT_13_M};

  &:hover {
    background-color: ${colors.gray600};
  }

  &:active {
    background-color: ${colors.gray500};
  }
`;

const imageSvg = (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M5.73548 4.00012C4.70455 4.00012 3.86882 4.83586 3.86882 5.86679C3.86882 6.89772 4.70455 7.73346 5.73548 7.73346C6.76641 7.73346 7.60215 6.89772 7.60215 5.86679C7.60215 4.83586 6.76641 4.00012 5.73548 4.00012ZM4.93548 5.86679C4.93548 5.42496 5.29365 5.06679 5.73548 5.06679C6.17731 5.06679 6.53548 5.42496 6.53548 5.86679C6.53548 6.30862 6.17731 6.66679 5.73548 6.66679C5.29365 6.66679 4.93548 6.30862 4.93548 5.86679Z'
      fill='#C3C3C6'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M4.00208 1.4668C2.60296 1.4668 1.46875 2.60101 1.46875 4.00013V12.0001C1.46875 13.3993 2.60296 14.5335 4.00208 14.5335H12.0021C13.4012 14.5335 14.5354 13.3993 14.5354 12.0001V4.00013C14.5354 2.60101 13.4012 1.4668 12.0021 1.4668H4.00208ZM2.53542 4.00013C2.53542 3.19011 3.19207 2.53346 4.00208 2.53346H12.0021C12.8121 2.53346 13.4688 3.19011 13.4688 4.00013V10.046L10.9124 7.48967C10.8124 7.38965 10.6767 7.33346 10.5353 7.33346C10.3938 7.33346 10.2582 7.38965 10.1582 7.48967L7.20201 10.4458L5.71254 8.95634C5.50426 8.74806 5.16657 8.74806 4.95829 8.95634L2.53542 11.3792V4.00013ZM6.83177 11.5841L8.29163 13.0439C8.49991 13.2522 8.83759 13.2522 9.04587 13.0439C9.25415 12.8356 9.25415 12.498 9.04587 12.2897L7.95626 11.2001L10.5353 8.62104L13.4688 11.5545V12.0001C13.4688 12.8101 12.8121 13.4668 12.0021 13.4668H4.00208C3.44821 13.4668 2.96604 13.1598 2.71649 12.7066L5.33542 10.0877L6.81801 11.5703C6.82026 11.5726 6.82253 11.5749 6.82483 11.5772C6.82713 11.5795 6.82944 11.5818 6.83177 11.5841Z'
      fill='#C3C3C6'
    />
  </svg>
);

const Length = styled.div`
  color: ${colors.secondary};

  ${textStyles.SUIT_13_M}
`;

const StyledInput = styled.input`
  display: none;
`;
