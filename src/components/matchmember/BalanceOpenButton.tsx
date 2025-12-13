import { isClientSide } from '@/utils';
import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

const BalanceOpenButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isClientSide()) {
      setIsOpen(localStorage.getItem('BALANCEGAME_OPEN') === 'true');
    }
  }, []);

  const handleClick = () => {
    localStorage.setItem('BALANCEGAME_OPEN', isOpen ? 'false' : 'true');
    setIsOpen((prev) => !prev);
  };

  return (
    <ToggleButton size='sm' onClick={handleClick}>
      {isOpen ? '작업스타일 모달 QA 종료' : '작업스타일 모달 QA하기'}
    </ToggleButton>
  );
};

const ToggleButton = styled(Button)`
  position: absolute;
  right: 10px;
  bottom: 50px;
`;

export default BalanceOpenButton;
