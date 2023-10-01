import styled from '@emotion/styled';
import { FC } from 'react';

import ValueBase from '@/components/intro/sections/ValueSection/valueContents/ValueBase';

import image from './value1.png';

const Value1Content: FC = () => {
  return (
    <ValueBase
      image={<Image src={image.src} alt='' />}
      message={
        <>
          <ValueBase.Highlight>기수, 파트, MBTI </ValueBase.Highlight>등 다양한 필터로 구성원을 확인할 수 있어요
        </>
      }
    />
  );
};

export default Value1Content;

const Image = styled.img`
  object-fit: contain;
  height: 100%;
`;
