import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button, Callout, Chip, SelectV2 } from '@sopt-makers/ui';
import { Spacing } from '@toss/emotion-utils';
import { AnimatePresence, m } from 'framer-motion';
import { FC, FormEvent, useState } from 'react';

import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UploadBlogProps {
  state: 'idle' | 'pending' | 'error' | 'success';
  errorMessage?: string;
  onSubmit: (url: string) => void;
}

const UploadBlog: FC<UploadBlogProps> = ({ state, errorMessage, onSubmit }) => {
  const [url, setUrl] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit(url);
  }

  const sampleOptions = [
    { value: '1', label: '111' },
    { value: '2', label: '222' },
    { value: '3', label: '333' },
  ];

  return (
    <Container>
      <TitleBox>
        <Title>SOPT 공식 홈페이지에 활동후기 올리기</Title>
      </TitleBox>
      <Callout
        buttonLabel='공식 홈페이지 바로가기'
        hasIcon
        type='information'
        onClick={() => window.open('https://www.sopt.org/blog', '_blank')}
      >
        작성하신 활동후기는 SOPT 공식 홈페이지에 업로드 돼요. SOPT 예비 지원자들에게 인사이트를 나누어보세요.
      </Callout>
      <Form onSubmit={handleSubmit}>
        <section>
          <Label>
            후기글 링크
            <Text typography='SUIT_14_SB' color={colors.secondary}>
              *
            </Text>
          </Label>
          <Text typography='SUIT_12_SB' color={colors.gray300}>
            한번 업로드한 링크는 삭제하기 어려워요. 신중하게 업로드해주세요.
          </Text>
          <StyledInput
            placeholder='ex. http://soptmakers.com'
            disabled={state === 'pending'}
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
        </section>
        <section>
          <Label>
            유형 선택
            <Text typography='SUIT_14_SB' color={colors.secondary}>
              *
            </Text>
          </Label>
          <SelectWrapper>
            <SelectV2.Root
              type='text'
              // onChange={onChange}
              // defaultValue={value}
            >
              <SelectV2.Trigger>
                <StyledSelectTrigger placeholder='후기 유형 선택' />
              </SelectV2.Trigger>
              <SelectV2.Menu>
                {sampleOptions.map((option) => (
                  <SelectV2.MenuItem key={option.value} option={option} />
                ))}
              </SelectV2.Menu>
            </SelectV2.Root>
            <SelectV2.Root
              type='text'
              // onChange={onChange}
              // defaultValue={value}
            >
              <SelectV2.Trigger>
                <StyledSelectTrigger placeholder='전형 선택' />
              </SelectV2.Trigger>
              <SelectV2.Menu>
                {sampleOptions.map((option) => (
                  <SelectV2.MenuItem key={option.value} option={option} />
                ))}
              </SelectV2.Menu>
            </SelectV2.Root>
          </SelectWrapper>
        </section>
        <section>
          <Label>
            세부 활동 선택
            <Text typography='SUIT_14_SB' color={colors.secondary}>
              *
            </Text>
          </Label>
          <Text typography='SUIT_12_SB' color={colors.gray300}>
            어떤 활동에 대한 후기인지 모두 선택해주세요.
          </Text>
          <ChipWrapper>
            {sampleOptions.map((option) => (
              <Chip key={option.value}>{option.label}</Chip>
            ))}
          </ChipWrapper>
          <Spacing size={40} />
        </section>
        <Button disabled={!url}>활동후기 업로드하기</Button>
      </Form>
    </Container>
  );
};

export default UploadBlog;

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
  margin-bottom: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: flex-start;
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  color: ${colors.gray10};

  ${textStyles.SUIT_32_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_B};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-self: stretch;
  margin-top: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 32px;
  }
`;

const Label = styled.label`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  color: ${colors.white};

  ${textStyles.SUIT_14_SB};
`;

const StyledInput = styled(Input)`
  margin: 8px 0;

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

const SelectWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledSelectTrigger = styled(SelectV2.TriggerContent)`
  width: max-content;
  min-width: fit-content;
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;
