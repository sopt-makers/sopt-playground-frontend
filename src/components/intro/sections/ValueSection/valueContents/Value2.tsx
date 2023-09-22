import styled from '@emotion/styled';
import { FC } from 'react';

import ValueBase from '@/components/intro/sections/ValueSection/valueContents/ValueBase';

import image from './value2.png';

const Value2Content: FC = () => {
  return (
    <ValueBase
      reverse
      image={<Image src={image.src} alt='' />}
      message={
        <>
          <ValueBase.Highlight>앱잼, 솝커톤, 솝텀 등</ValueBase.Highlight>
          에서 진행된
          <br />
          프로젝트들을 확인할 수 있어요
        </>
      }
    />
  );
};

export default Value2Content;

const Image = styled.img`
  object-fit: contain;
  height: 100%;
`;
