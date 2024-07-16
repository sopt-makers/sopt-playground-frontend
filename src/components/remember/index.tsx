import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export default function RememberPage() {
  return (
    <>
      <Header>34기 NOW SOPT 활동 후기를 남겨주세요!</Header>
    </>
  );
}

const Header = styled.header`
  margin-bottom: 28px;
  text-align: center;
  color: ${colors.white};
  ${fonts.HEADING_28_B};
`;
