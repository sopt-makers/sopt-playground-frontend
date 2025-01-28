import AuthRequired from '@/components/auth/AuthRequired';
import { setLayout } from '@/utils/layout';

const CoffeeChatReviewUpload = () => {
  return (
    <AuthRequired>
      <>ss</>
    </AuthRequired>
  );
};
setLayout(CoffeeChatReviewUpload, 'headerFooter');
export default CoffeeChatReviewUpload;
