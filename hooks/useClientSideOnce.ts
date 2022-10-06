import { useRef } from 'react';

/**
 * 클라이언트 사이드에서만 인자로 주어진 핸들러를 딱 한번 호출합니다.
 * 핸들러가 동기 함수일 경우 렌더링 전에 실행됩니다.
 *
 * useEffect와 다르게 handler가 자식 컴포넌트의 훅보다 먼저 실행됩니다.
 * @param handler
 */
function useClientSideOnce(handler: () => void) {
  const isExecuted = useRef(false);

  if (typeof window !== 'undefined') {
    if (!isExecuted.current) {
      handler();
      isExecuted.current = true;
    }
  }
}

export default useClientSideOnce;
