import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ValueBaseProps {
  image: ReactNode;
  message: ReactNode;
  reverse?: boolean;
}

const ValueBase: FC<ValueBaseProps> = ({ image, message, reverse }) => {
  return (
    <Container>
      <Inner reverse={reverse ?? false}>
        <TextBox>{message}</TextBox>
        <ImageBox>{image}</ImageBox>
      </Inner>
    </Container>
  );
};

const Highlight = styled.span`
  color: ${colors.white100};
`;

export default Object.assign(ValueBase, {
  Highlight: Highlight,
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 420px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: auto;
  }
`;

const Inner = styled.div<{ reverse: boolean }>`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  width: 100%;
  max-width: 1200px;

  ${(props) =>
    props.reverse
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: row-reverse;
        `}

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 17px;
    align-items: flex-start;
    padding: 20px 0 0;
    width: fit-content;
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    align-self: center;
    border-radius: 4px 4px 0 0;
    width: 100%;
    max-width: 285px;
    height: auto;
  }
`;

const TextBox = styled.div`
  max-width: 500px;
  word-break: keep-all;
  color: ${colors.gray40};

  ${textStyles.SUIT_30_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_SB};
  }
`;
