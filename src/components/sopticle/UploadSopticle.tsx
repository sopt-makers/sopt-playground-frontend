import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { AnimatePresence, m } from 'framer-motion';
import { FC, FormEvent, useState } from 'react';

import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import HelpCard from '@/components/sopticle/HelpCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UploadSopticleProps {
  state: 'idle' | 'loading' | 'error' | 'success';
  errorMessage?: string;
  onSubmit: (url: string) => void;
}

const UploadSopticle: FC<UploadSopticleProps> = ({ state, errorMessage, onSubmit }) => {
  const [url, setUrl] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit(url);
  }

  return (
    <Container>
      <TitleBox>
        <Title>SOPT 공홈에 솝티클 올리기</Title>
        <SubTitle>삭제가 어려우니 정확한 링크인지 꼭 확인해주세요.</SubTitle>
      </TitleBox>
      <Form onSubmit={handleSubmit}>
        <Label>아티클 링크</Label>
        <StyledInput
          placeholder='https://'
          disabled={state === 'loading'}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <AnimatePresence initial={false}>
          {state === 'error' && (
            <MotionErrorMessageHolder
              initial='hide'
              animate='show'
              exit='hide'
              variants={{ hide: { height: 0, opacity: 0 }, show: { height: 'auto', opacity: 1 } }}
            >
              <ErrorMessage message={errorMessage} />
            </MotionErrorMessageHolder>
          )}
        </AnimatePresence>

        <Button>솝티클 업로드하기</Button>
      </Form>
      <StyledHelpCard
        title='SOPT 공식 홈페이지에 솝티클 보러가기'
        content='앗! 업로드가 아니라 솝티클을 읽고 싶으신가요?
솝트 회원들이 직접 작성한 솝티클은 공홈에서 확인할 수 있어요.'
        href='https://www.sopt.org/sopticle'
      />
    </Container>
  );
};

export default UploadSopticle;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  color: ${colors.gray10};

  ${textStyles.SUIT_32_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_B};
  }
`;

const SubTitle = styled.h2`
  margin-top: 12px;
  color: ${colors.gray300};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-top: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 32px;
  }
`;

const Label = styled.label`
  margin-bottom: 16px;
  color: ${colors.gray400};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 8px;

    ${textStyles.SUIT_14_M};
  }
`;

const StyledInput = styled(Input)`
  & input {
    border-radius: 10px;
  }
`;

const MotionErrorMessageHolder = styled(m.div)`
  & > * {
    padding-top: 10px;
    padding-left: 2px;
  }
`;

const Button = styled.button`
  margin-top: 16px;
  border-radius: 10px;
  background-color: ${colors.gray10};
  padding: 16px 0;
  color: ${colors.gray950};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 6px;

    ${textStyles.SUIT_14_M};
  }
`;

const StyledHelpCard = styled(HelpCard)`
  margin-top: 35px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 40px;
  }
`;
