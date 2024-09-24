import styled from '@emotion/styled';

import ResizedImage from '@/components/common/ResizedImage';

interface CardBackProps {
  is35: boolean;
}

const CardBack = ({ is35 }: CardBackProps) => {
  const logoSrc = is35 ? '/logos/and-sopt.svg' : '/logos/logo-playground-full.svg';
  const alt = is35 ? 'AND SOPT 로고' : 'playground 로고';
  return (
    <MemberCard>
      <ImageHolder>
        <Image className='image' src={logoSrc} width={187} alt={alt} />
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
