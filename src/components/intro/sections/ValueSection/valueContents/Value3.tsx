import styled from '@emotion/styled';
import { FC } from 'react';

import ValueBase from '@/components/intro/sections/ValueSection/valueContents/ValueBase';

import image from './value3.png';

const Value3Content: FC = () => {
  return (
    <ValueBase
      image={<Image src={image.src} alt='' />}
      message={
        <>
          <ValueBase.Highlight>다양한 스터디, 모임 </ValueBase.Highlight>
          등을 자유롭게
          <br />
          개설하고, 참여할 수 있어요
        </>
      }
    />
  );
};

export default Value3Content;

const Image = styled.img`
  object-fit: contain;
  height: 100%;
`;
