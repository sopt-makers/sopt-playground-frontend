import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';

import { useRecentSopticles } from '@/api/endpoint/feed/getRecentSopticle';
import Text from '@/components/common/Text';
import { SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import SopticleCard from '@/components/feed/home/SopticleArea/SopticleCard';
import { useScrollCarousel } from '@/components/feed/home/SopticleArea/useScrollCarousel';

const SopticleArea = () => {
  const router = useRouter();
  const { data: sopticles = [], isLoading } = useRecentSopticles();

  const extendedCards = [sopticles[sopticles.length - 1], ...sopticles, sopticles[0]]; // 0 = 마지막 복제, 1~N = 실제 데이터, N+1 = 첫번째 복제

  const { containerRef, activeIndex, getActualIndex, scrollToIndex } = useScrollCarousel({
    itemCount: sopticles.length,
    autoSlideInterval: 4000,
  });

  const navigateToSopticle = () => {
    router.push(`/?category=${SOPTICLE_CATEGORY_ID}`);
  };

  return (
    <Container>
      <TitleBox>
        <Title>따끈따끈한 솝티클이 업로드 됐어요✨</Title>
        <AllBtn onClick={navigateToSopticle}>전체보기</AllBtn>
      </TitleBox>

      <SopticleViewport ref={containerRef}>
        <SopticleTrack>
          {!isLoading &&
            extendedCards.map((sopticle, index) => (
              <CardWrapper key={`${sopticle.id}+${index}`}>
                <SopticleCard sopticle={sopticle} />
              </CardWrapper>
            ))}
        </SopticleTrack>
      </SopticleViewport>

      <Indicators>
        {sopticles.map((_, index) => (
          <Indicator
            key={index}
            isActive={getActualIndex(activeIndex) === index + 1}
            onClick={() => scrollToIndex(index + 1)}
          />
        ))}
      </Indicators>
    </Container>
  );
};

export default SopticleArea;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Text)`
  ${fonts.HEADING_18_B};

  word-break: keep-all;
`;

const AllBtn = styled.button`
  ${fonts.LABEL_12_SB};

  color: ${colors.gray400};
`;

const SopticleViewport = styled.div`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SopticleTrack = styled.div`
  display: flex;
  gap: 12px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex: 0 0 100%;
  scroll-snap-align: start;
  justify-content: center;
  width: 100%;
`;

const Indicators = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 10px;
  width: 100%;
`;

const Indicator = styled.button<{ isActive: boolean }>`
  border-radius: 10px;
  background-color: ${({ isActive }) => (isActive ? colors.gray50 : colors.gray600)};
  width: 16px;
  height: 4px;
`;
