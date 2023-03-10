import { FC, useEffect, useState } from 'react';

import OAuthCallback from '@/components/auth/oauth/OAuthCallback';
import Loading from '@/components/common/Loading';

const OAuthPage: FC = () => {
  const [url, setUrl] = useState<URL | null>(null);
  useEffect(() => {
    const url = new URL(location.href);
    setUrl(url);
  }, []);

  return url === null ? <Loading type='fullPage' /> : <OAuthCallback url={url} />;
};

export default OAuthPage;
