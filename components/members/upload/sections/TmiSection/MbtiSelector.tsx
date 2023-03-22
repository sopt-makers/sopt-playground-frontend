import styled from '@emotion/styled';

import MbtiToggle from '@/components/members/upload/sections/TmiSection/MbtiToggle';
import { Mbti, MbtiIndex, MbtiIndicatorPosition } from '@/components/members/upload/sections/TmiSection/types';

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
`;
