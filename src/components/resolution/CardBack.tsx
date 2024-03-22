import styled from '@emotion/styled';
import { FC } from 'react';

import ResizedImage from '@/components/common/ResizedImage';

const CardBack: FC = () => {
  return (
    <MemberCard>
      <ImageHolder>
        <Image className='image' src='/logos/now-sopt.svg' width={187} alt='now_sopt' />
      </ImageHolder>
    </MemberCard>
  );
};

export default CardBack;

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px solid rgb(255 255 255 / 8%);
  border-radius: 16px;
  background-color: var(--black90, #17181b);
  width: 100%;
  max-width: 303px;
  height: 368px;
`;

const ImageHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 180px;
  height: 180px;
`;

const Image = styled(ResizedImage)`
  object-fit: cover;
`;
