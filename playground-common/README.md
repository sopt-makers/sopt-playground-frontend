# playground-common

[SOPT Playground 프론트엔드](https://github.com/sopt-makers/sopt-playground-frontend)에서 다른 팀과 공유해야 할 컴포넌트들을 제공하는 라이브러리에요.

## Usage

```ts
# yarn
yarn add @sopt-makers/playground-common
# npm
npm install @sopt-makers/playground-common
```

## Components

### DesktopHeader

데스크톱 버전의 Playground 헤더에요.

```tsx
import { DesktopHeader, LinkRenderer } from '@sopt-makers/playground-common';
import { useRouter } from 'next/router';

const DesktopHeaderSample = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logout!');
  };

  // 링크의 a태그를 렌더링하는 render function (next/link도 사용할 수 있음)
  const renderLink: LinkRenderer = ({ href, children }) => {
    return <a href={href}>{children}</a>;
  };

  // path가 현재 경로인지를 판정하는 함수
  const activePathMatcher = (path: string) => router.pathname?.startsWith(path);

  const user = { id: '2', name: '박건영', image: '<Image URL>' };

  return (
    <DesktopHeader user={user} onLogout={handleLogout} renderLink={renderLink} activePathMatcher={activePathMatcher} />
  );
};
```

### MobileHeader

모바일 버전의 Playground 헤더에요.

```tsx
import { MobileHeader, LinkRenderer } from '@sopt-makers/playground-common';
import { useRouter } from 'next/router';

const MobileHeaderSample = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logout!');
  };

  // 링크의 a태그를 렌더링하는 render function (next/link도 사용할 수 있음)
  const renderLink: LinkRenderer = ({ href, children }) => {
    return <a href={href}>{children}</a>;
  };

  // path가 현재 경로인지를 판정하는 함수
  const activePathMatcher = (path: string) => router.pathname?.startsWith(path);

  const user = { id: '2', name: '박건영', image: '<Image URL>' };

  return (
    <MobileHeader user={user} onLogout={handleLogout} renderLink={renderLink} activePathMatcher={activePathMatcher} />
  );
};
```

### playgroundLink

Playground 사이트의 각종 경로 모음이에요.

```ts
import { playgroundLink } from '@sopt-makers/playground-common';

console.log(playgroundLink.memberDetail('3')); /* /members?id=3 */
```

### WelcomeBanner

34기 환영 배너에요.

```ts
// 로그인한 유저가 34인지 boolean값을 내려주세요.
return <WelcomeBanner is34={is34} />;
```

## License

[MIT License](https://github.com/sopt-makers/sopt-playground-frontend/blob/main/LICENSE.md)
