import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';

import { useDeleteResolutionMutation } from '@/api/endpoint/resolution/deleteTimecapsop';

const TimecapsopDelteButton = () => {
  const { mutate } = useDeleteResolutionMutation();

  const handleClick = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      mutate();
    }
  };

  return (
    <DelteBtn size='sm' onClick={handleClick}>
      타임캡솝 삭제하기
    </DelteBtn>
  );
};

const DelteBtn = styled(Button)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export default TimecapsopDelteButton;
