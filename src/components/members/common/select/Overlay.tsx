import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

/**
 * @description hacky한 방법으로 Select.Portal의 이벤트 전파를 막기위해 마운트하는 컴포넌트입니다.
 * 다른 대안을 찾게되면 이 컴포넌트는 삭제될 예정입니다.
 * issue: https://github.com/radix-ui/primitives/issues/1658
 */
export const Overlay = ({ open }: { open: boolean }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
    setVisible(true);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [open]);

  return visible ? <StyledOverlay onClick={(e) => e.stopPropagation()} /> : null;
};

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* Choose whatever z-index makes most sense to you */
  z-index: 1050;
  isolation: isolate;
`;
