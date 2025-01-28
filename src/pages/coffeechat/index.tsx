import AuthRequired from '@/components/auth/AuthRequired';
import CoffeeChatLottie from '@/components/coffeechat/Banner/CoffeeChatLottie';
import CoffeeChatCategory from '@/components/coffeechat/CoffeeChatCategory';
import CoffeeChatReviewList from '@/components/coffeechat/CoffeeChatReview';
import CoffeeChatRecentList from '@/components/coffeechat/CoffeeRecentChatList';
import { setLayout } from '@/utils/layout';

const CoffeeChatMainPage = () => {
  return (
    <AuthRequired>
      <CoffeeChatLottie />
      <CoffeeChatRecentList />
      <CoffeeChatReviewList />
      <CoffeeChatCategory />
    </AuthRequired>
  );
};
setLayout(CoffeeChatMainPage, 'headerFooter');

export default CoffeeChatMainPage;
