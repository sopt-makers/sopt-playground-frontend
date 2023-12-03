import styled from '@emotion/styled';

export default function InAppBrowserImpossibleBanner() {
  return (
    <ImpossibleDescription>
      인앱브라우저에서는 소셜로그인이 불가능해요 😭 <br /> 링크를 복사해 기본 브라우저에서 다시 시도해주시겠어요?
    </ImpossibleDescription>
  );
}

const ImpossibleDescription = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  text-align: center;
`;
