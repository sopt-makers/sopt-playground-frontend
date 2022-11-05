import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import BackIcon from 'public/icons/icon-back.svg';

const MobileHeader = () => {
  const router = useRouter();
  return (
    <Wrapper
      onClick={() => {
        router.back();
      }}
      className='mobile-only'
    >
      <BackIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 12px;
  width: 100%;
  height: 56px;
`;

export default MobileHeader;
