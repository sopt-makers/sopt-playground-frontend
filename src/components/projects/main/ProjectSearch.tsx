import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex, width100 } from '@toss/emotion-utils';

interface ProjectSearchProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

const ProjectSearch = ({ value, defaultValue, onValueChange, placeholder }: ProjectSearchProps) => {
  return (
    <Container align='center' justify='space-between'>
      <Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
      />
      <Icon />
    </Container>
  );
};

export default ProjectSearch;

const Container = styled(Flex)`
  gap: 8px;
  border-radius: 8px;
  background-color: ${colors.gray800};
  padding: 16px 14px;

  ${width100}

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 6px;
    padding: 9px 18px;
    ${fonts.BODY_14_M};
  }
`;

const Input = styled.input`
  color: ${colors.gray200};
  ${width100};
  ${fonts.BODY_16_M};

  ::placeholder {
    ${colors.gray200};
  }
`;

const Icon = () => (
  <svg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle
      cx='9'
      cy='9'
      r='7.75'
      transform='matrix(-1 0 0 1 18 0.5)'
      stroke='#808087'
      stroke-width='2.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path d='M21 21.5L15 15.5' stroke='#808087' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' />
  </svg>
);
