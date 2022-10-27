import styled from '@emotion/styled';
import BackIcon from 'public/icons/icon-back.svg';

const MobileHeader = () => {
  return (
    <Wrapper className='mobile-only'>
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
