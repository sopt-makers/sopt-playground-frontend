import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import Responsive from '@/components/common/Responsive';
import ReviewInput from '@/components/remember/ReviewInput';
import Reviews from '@/components/remember/reviews';
import { LATEST_GENERATION } from '@/constants/generation';
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

  const { data: myData } = useGetMemberOfMe();
  const is34 = myData?.generation === LATEST_GENERATION;

  return (
    <>
      <MobileHeader only='mobile'>
        <BackArrowWrapper onClick={handleMoveToPrev}>
          <BackArrow />
        </BackArrowWrapper>
      </MobileHeader>
      <Header>{is34 ? '34기 NOW SOPT \n활동 후기를 남겨주세요!' : '34기 NOW SOPT \n활동 후기를 구경해보세요!'}</Header>
      {is34 && <ReviewInput />}
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
