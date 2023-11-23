import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';

import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UploadSuccessProps {}

const UploadSuccess: FC<UploadSuccessProps> = ({}) => {
  return (
    <Container>
      <CheckCircle>{checkSvg}</CheckCircle>

      <Title>솝티클이 업로드 되었어요.</Title>
      <SubTitle>등록하신 솝티클은 SOPT 공식 홈페이지에서 확인할 수 있어요.</SubTitle>

      <ButtonGroup>
        <ViewButton href={'https://sopt.org/blog'} target='_blank'>
          {goSvg} 솝티클 보러가기
        </ViewButton>
        <UploadMoreButton href={playgroundLink.sopticle()}>{plusSvg} 추가로 업로드하기</UploadMoreButton>
      </ButtonGroup>
    </Container>
  );
};

const checkSvg = (
  <m.svg width={26} height={21} fill='none' initial='inactive' animate='active'>
    <m.path
      d='M1.929 11.938l8.303 6.92L24.072 2.25'
      stroke={colors.gray950}
      strokeWidth={3}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
      variants={{
        inactive: {
          pathLength: 0,
        },
        active: {
          pathLength: 1,
          transition: {
            duration: 0.8,
            delay: 0.3,
          },
        },
      }}
    />
  </m.svg>
);

export default UploadSuccess;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
`;

const CheckCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${colors.gray10};
  width: 62px;
  height: 62px;
`;

const Title = styled.h1`
  margin-top: 24px;
  color: ${colors.gray10};

  ${textStyles.SUIT_32_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_20_B};
  }
`;

const SubTitle = styled.h2`
  margin-top: 12px;
  text-align: center;
  color: ${colors.gray300};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-self: stretch;
  margin-top: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    row-gap: 12px;
    align-self: center;
    width: 100%;
    max-width: 187px;
  }
`;

const ViewButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${colors.gray10};
  cursor: pointer;
  padding: 16px 0;
  color: ${colors.gray950};
  ${textStyles.SUIT_16_M};

  & svg {
    margin-right: 6px;
    width: 16px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 6px;
    padding: 12px 0;

    ${textStyles.SUIT_14_M};

    & svg {
      margin-right: 8px;
    }
  }
`;

const UploadMoreButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${colors.gray700};
  cursor: pointer;
  padding: 16px 0;

  ${textStyles.SUIT_16_M};

  & svg {
    margin-right: 6px;
    width: 16px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 6px;
    padding: 12px 0;

    ${textStyles.SUIT_14_M};

    & svg {
      margin-right: 8px;
    }
  }
`;

const goSvg = (
  <svg fill='none' viewBox='0 0 16 16'>
    <path
      d='M12.68 3.502a.542.542 0 00-.082-.103.532.532 0 00-.388-.155H4.667a.533.533 0 000 1.067h6.268L3.4 11.845a.533.533 0 10.754.754l7.534-7.534v6.268a.533.533 0 101.067 0V3.778c0-.101-.028-.195-.077-.276z'
      fill={colors.gray950}
    />
  </svg>
);

const plusSvg = (
  <svg fill='none' viewBox='0 0 16 16'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.5 1.333c.242 0 .438.196.438.438v5.79h5.79a.438.438 0 110 .877h-5.79v5.79a.438.438 0 01-.876 0v-5.79h-5.79a.438.438 0 010-.877h5.79v-5.79c0-.242.196-.438.438-.438z'
      fill='#FCFCFC'
    />
  </svg>
);
