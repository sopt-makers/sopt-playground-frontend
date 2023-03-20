import MbtiToggle from '@/components/members/upload/TmiSection/MbtiToggle';
import { Mbti, MbtiIndex, MbtiIndicatorPosition } from '@/components/members/upload/TmiSection/types';

interface MbtiSelectorProps {
  mbti: Mbti;
  onSelect: (mbti: Mbti) => void;
}

export default function MbtiSelector({ mbti, onSelect }: MbtiSelectorProps) {
  const onClickMbtiToggle = (index: MbtiIndex, position: MbtiIndicatorPosition) => {
    const newMbti: Mbti = [...mbti];
    newMbti[index] = position;
    onSelect(newMbti);
  };

  return (
    <>
      {mbti.map((selectedPosition, mbtiIndex) => (
        <MbtiToggle
          index={mbtiIndex as MbtiIndex}
          selectedPosition={selectedPosition}
          onClick={onClickMbtiToggle}
          key={mbtiIndex}
        />
      ))}
    </>
  );
}
