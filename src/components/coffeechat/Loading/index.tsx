import styled from '@emotion/styled';

import Loading from '@/components/common/Loading';

export default function CoffeechatLoading() {
  return (
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
