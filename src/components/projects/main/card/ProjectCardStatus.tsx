import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex } from '@toss/emotion-utils';
import { PropsWithChildren } from 'react';

const ProjectCardStatus = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex css={{ gap: 4 }} align='center'>
      <IconCircleSuccess />
      <StatusText>{children}</StatusText>
    </Flex>
  );
};

export default ProjectCardStatus;

const StatusText = styled.span`
  color: ${colors.gray100};
  ${fonts.LABEL_12_SB}

  ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_11_SB};
  }
`;

const IconCircleSuccess = () => (
  <svg width='5' height='6' viewBox='0 0 5 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='2.5' cy='3' r='2.5' fill='#16BF81' />
  </svg>
);
