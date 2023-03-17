import styled from '@emotion/styled';
import * as Tabs from '@radix-ui/react-tabs';
import { FC, ReactNode } from 'react';

import Stepper from '@/components/auth/register/Stepper';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface VerifyByPhoneProps {
  byPhone: ReactNode;
  byEmail: ReactNode;
}

const VerifyFrame: FC<VerifyByPhoneProps> = ({ byPhone, byEmail }) => {
  return (
    <StyledVerifyFrame>
      <StyledStepper step={1} />
      <Title>SOPT 회원인증</Title>
      <Description>
        Playground는 SOPT 회원만을 위한 공간이에요.
        <br />
        SOPT 회원임을 인증하기 위해 전화번호를 입력해 주세요.
      </Description>
      <TabsRoot defaultValue='byPhone'>
        <TabsList>
          <TabsTrigger value='byPhone'>전화번호 인증</TabsTrigger>
          <TabsTrigger value='byEmail'>이메일 인증</TabsTrigger>
        </TabsList>
        <TabsContent key='byPhone' value='byPhone'>
          {byPhone}
        </TabsContent>
        <TabsContent key='byEmail' value='byEmail'>
          {byEmail}
        </TabsContent>
      </TabsRoot>
    </StyledVerifyFrame>
  );
};

export default VerifyFrame;

const StyledVerifyFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledStepper = styled(Stepper)`
  align-self: center;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 210px;
  }
`;

const Title = styled.h2`
  margin-top: 95px;
  text-align: center;

  ${textStyles.SUIT_32_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 60px;

    ${textStyles.SUIT_24_B}
  }
`;

const Description = styled.p`
  margin-top: 12px;
  text-align: center;
  color: ${colors.gray60};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 20px;

    ${textStyles.SUIT_12_M}
  }
`;

const TabsRoot = styled(Tabs.Root)`
  margin-top: 48px;
`;

const TabsList = styled(Tabs.List)`
  display: flex;
  gap: 12px;
`;

const TabsTrigger = styled(Tabs.Trigger)`
  flex-grow: 1;
  transition: 0.2s background-color, 0.2s color;
  border-radius: 10px;
  background-color: ${colors.black60};
  cursor: pointer;
  height: 48px;
  color: ${colors.gray30};

  ${textStyles.SUIT_15_SB}

  &[data-state='active'] {
    background-color: ${colors.purpledim100};
    color: ${colors.purple40};
  }

  &[data-state='inactive']:hover {
    background-color: ${colors.black60};
    color: ${colors.white};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_SB}
  }
`;

const TabsContent = styled(Tabs.Content)`
  margin-top: 48px;
`;
