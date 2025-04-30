import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button } from '@sopt-makers/ui';
import { m } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UploadSuccessProps {}

const UploadSuccess: FC<UploadSuccessProps> = ({}) => {
  const router = useRouter();

  return (
    <Container>
      <CheckCircle>{checkSvg}</CheckCircle>

      <Title>활동후기가 업로드 되었어요.</Title>
      <SubTitle>등록한 활동후기는 SOPT 공식{'\n'}홈페이지에서 확인할 수 있어요.</SubTitle>

      <ButtonGroup>
        <LoggingClick eventKey='reviewGoToHomepage'>
          <Button size='lg' onClick={() => window.open('https://www.sopt.org/blog', '_blank')}>
            업로드한 활동후기 보러가기
          </Button>
        </LoggingClick>
        {/* TODO: 헤더 바꿀때 url이랑 함께 바꾸기 */}
        <Button size='lg' theme='black' onClick={() => router.push(playgroundLink.blog())}>
          활동후기 더 올리기
        </Button>
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

  ${textStyles.SUIT_32_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_SB};
  }
`;

const SubTitle = styled.h2`
  margin-top: 12px;
  text-align: center;
  color: ${colors.gray300};

  ${textStyles.SUIT_16_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};

    white-space: pre;
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
    padding: 0 12px;
    width: 100%;
  }
`;
