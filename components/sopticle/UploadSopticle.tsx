import styled from '@emotion/styled';
import { FC, useState } from 'react';

import Input from '@/components/common/Input';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UploadSopticleProps {}

const UploadSopticle: FC<UploadSopticleProps> = ({}) => {
  const [url, setUrl] = useState('');

  return (
    <Container>
      <TitleBox>
        <Title>SOPT 공홈에 솝티클 올리기</Title>
        <SubTitle>삭제가 어려우니 정확한 링크인지 꼭 확인해주세요.</SubTitle>
      </TitleBox>
      <Form>
        <Label>아티클 링크</Label>
        <StyledInput placeholder='https://' value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button>솝티클 업로드하기</Button>
      </Form>
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
  color: ${colors.white};

  ${textStyles.SUIT_32_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_B};
  }
`;

const SubTitle = styled.h2`
  margin-top: 12px;
  color: ${colors.gray60};

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
  color: ${colors.gray80};

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

const Button = styled.button`
  margin-top: 16px;
  border-radius: 10px;
  background-color: ${colors.purple100};
  padding: 16px 0;

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};
  }
`;
