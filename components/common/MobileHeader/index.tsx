import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import BackIcon from 'public/icons/icon-back.svg';

import { colors } from '@/styles/colors';

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
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: ${colors.black100};
  padding: 12px;
  width: 100%;
`;

export default MobileHeader;
