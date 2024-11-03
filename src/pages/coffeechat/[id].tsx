import AuthRequired from '@/components/auth/AuthRequired';
import CoffeechatDetail from '@/components/coffeechat/detail';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const CoffeechatDetailPage = () => {
  const { query, status } = useStringRouterQuery(['id'] as const);
  const memberId = status === 'success' ? query.id : '';

  return (
    <AuthRequired>
      {(status === 'loading' || status === 'error') && null}
      {status === 'success' ? <CoffeechatDetail memberId={memberId} /> : null}
    </AuthRequired>
  );
};

setLayout(CoffeechatDetailPage, 'header');

export default CoffeechatDetailPage;
