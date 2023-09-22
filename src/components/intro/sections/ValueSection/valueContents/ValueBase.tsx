import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface ValueBaseProps {
  image: ReactNode;
  message: ReactNode;
  reverse?: boolean;
}

const ValueBase: FC<ValueBaseProps> = ({ image, message, reverse }) => {
  return (
    <Container>
      <Inner>
        {reverse ? (
          <>
            <TextBox>{message}</TextBox>
            <ImageBox>{image}</ImageBox>
          </>
        ) : (
          <>
            <ImageBox>{image}</ImageBox>
            <TextBox>{message}</TextBox>
          </>
        )}
      </Inner>
    </Container>
  );
};

export default ValueBase;

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 420px;
`;

const Inner = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-content: center;
  transform: translateZ(0);
  border: 1px solid var(--black40, ${colors.black40});
  border-radius: 16px 16px 0 0;
  background-color: ${colors.black100};
  width: 630px;
  height: 370px;
  overflow: hidden;

  & > img {
    object-fit: contain;
    height: 100%;
  }
`;

const TextBox = styled.div`
  color: ${colors.gray40};

  ${textStyles.SUIT_30_SB};
`;
