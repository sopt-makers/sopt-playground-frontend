import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode } from 'react';

export default function Tooltip({ children }: { children: ReactNode }) {
  return (
    <TooltipWrapper>
      <Content>
        <Text> 모임 피드를 &nbsp;</Text>
        <Num>{children}</Num> <Text>&nbsp; 올렸어요!</Text>
      </Content>
      <Tip />
    </TooltipWrapper>
  );
}

const Tip = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='184' height='48' viewBox='0 0 184 48' fill='none'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M11.8519 0C5.30603 0 -0.000314818 5.3066 1.40088e-08 11.8524L0.000495268 22.1487C0.000810093 28.6941 5.30696 34 11.8523 34H17.0562C17.4925 34 17.8463 34.3538 17.8463 34.7901L17.8458 46.2252C17.8458 46.9154 18.6685 47.2739 19.174 46.8038L32.7145 34.2115C32.8607 34.0756 33.0529 34 33.2526 34H172.148C178.693 34 183.999 28.6937 183.999 22.1481V11.8519C183.999 5.30626 178.693 0 172.148 0H11.8519Z'
        fill='#0F1012'
      />
    </svg>
  );
};

const TooltipWrapper = styled.div`
  margin-top: 16px;
`;

const Content = styled.div`
  display: flex;
  position: absolute;
  margin: 8px 0 0 14px;

  ${fonts.LABEL_14_SB};
`;

const Text = styled.div`
  color: ${colors.gray50};
`;

const Num = styled.div`
  color: '#FDBBF9';
`;
