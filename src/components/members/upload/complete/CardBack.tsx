import styled from '@emotion/styled';
import { FC } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import ResizedImage from '@/components/common/ResizedImage';
import { LATEST_GENERATION } from '@/constants/generation';

const CardBack: FC = () => {
  const { data: myData } = useGetMemberOfMe();
  const is35 = myData?.generation === LATEST_GENERATION;

  const logoSrc = is35 ? '/logos/and-sopt.svg' : '/logos/logo-playground-full.svg';
  return (
    <MemberCard>
      <ImageHolder>
        <Image className='image' src={logoSrc} width={187} alt='now_sopt' />
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
