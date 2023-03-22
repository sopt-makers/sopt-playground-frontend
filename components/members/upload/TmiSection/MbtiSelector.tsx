import styled from '@emotion/styled';

import MbtiToggle from '@/components/members/upload/TmiSection/MbtiToggle';
import { Mbti, MbtiIndex, MbtiIndicatorPosition } from '@/components/members/upload/TmiSection/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MbtiSelectorProps {
  mbti: Mbti;
  onSelect: (mbti: Mbti | null) => void;
}

export default function MbtiSelector({ mbti, onSelect }: MbtiSelectorProps) {
  const onClickMbtiToggle = (index: MbtiIndex, position: MbtiIndicatorPosition) => {
    const newMbti: Mbti = [...mbti];
    newMbti[index] = newMbti[index] === position ? null : position;

    onSelect(newMbti.every((position) => position === null) ? null : newMbti);
  };

  return (
    <Container>
      {mbti.map((selectedPosition, mbtiIndex) => (
        <MbtiToggle
          index={mbtiIndex as MbtiIndex}
          selectedPosition={selectedPosition}
          onClick={onClickMbtiToggle}
          key={mbtiIndex}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
`;
