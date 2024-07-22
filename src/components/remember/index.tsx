import ReviewInput from '@/components/remember/ReviewInput';
import Reviews from '@/components/remember/reviews';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export default function RememberPage() {
  return (
    <>
      <Header>{'34기 NOW SOPT \n활동 후기를 남겨주세요!'}</Header>
      <ReviewInput />
      <Reviews />
    </>
  );
}

const Header = styled.header`
  margin-bottom: 28px;
  text-align: center;
  white-space: nowrap;
  color: ${colors.white};
  ${fonts.HEADING_28_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_18_B};

    white-space: pre;
  }
`;
