import Responsive from '@/components/common/Responsive';
import ReviewInput from '@/components/remember/ReviewInput';
import Reviews from '@/components/remember/reviews';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';

export default function RememberPage() {
  const router = useRouter();

  const handleMoveToPrev = () => {
    router.back();
  };

  return (
    <>
      <MobileHeader only='mobile'>
        <BackArrowWrapper onClick={handleMoveToPrev}>
          <BackArrow />
        </BackArrowWrapper>
      </MobileHeader>
      <Header>{'34기 NOW SOPT \n활동 후기를 남겨주세요!'}</Header>
      <ReviewInput />
      <Reviews />
    </>
  );
}

const MobileHeader = styled(Responsive)`
  margin-bottom: 34px;
  width: 100%;
`;

const BackArrowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

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
