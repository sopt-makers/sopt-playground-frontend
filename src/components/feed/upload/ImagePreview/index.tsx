import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

interface ImagePreviewProps {
  images: string[];
  onRemove: (index: number) => void;
}

export default function ImagePreview({ images, onRemove }: ImagePreviewProps) {
  return (
    <Container>
      {images.map((image, index) => (
        <ImageWrapper key={`${image}_${index}`}>
          <Image src={image} alt={`feed-image-${index}`} />
          <RemoveButton onClick={() => onRemove(index)}>{cancelSvg}</RemoveButton>
        </ImageWrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const RemoveButton = styled.button`
  display: flex;
  position: absolute;
  top: 4px;
  right: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #ffffffe5;
  width: 20px;
  height: 20px;
`;

const Image = styled.img`
  border-radius: 6px;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const cancelSvg = (
  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M1.88831 1.88831C2.07272 1.7039 2.37172 1.7039 2.55613 1.88831L6 5.33218L9.44387 1.88831C9.62828 1.7039 9.92728 1.7039 10.1117 1.88831C10.2961 2.07272 10.2961 2.37172 10.1117 2.55613L6.66782 6L10.1117 9.44387C10.2961 9.62828 10.2961 9.92728 10.1117 10.1117C9.92728 10.2961 9.62828 10.2961 9.44387 10.1117L6 6.66782L2.55613 10.1117C2.37172 10.2961 2.07272 10.2961 1.88831 10.1117C1.7039 9.92728 1.7039 9.62828 1.88831 9.44387L5.33218 6L1.88831 2.55613C1.7039 2.37172 1.7039 2.07272 1.88831 1.88831Z'
      fill='#212124'
    />
  </svg>
);
