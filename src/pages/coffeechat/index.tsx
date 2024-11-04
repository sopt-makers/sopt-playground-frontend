import AuthRequired from '@/components/auth/AuthRequired';
import CoffeeChatLottie from '@/components/coffeechat/Banner/CoffeeChatLottie';
import CoffeeChatCategory from '@/components/coffeechat/CoffeeChatCategory';
import CoffeeChatRecentList from '@/components/coffeechat/CoffeeRecentChatList';
import { setLayout } from '@/utils/layout';

const CoffeeChatMainPage = () => {
  return (
    <AuthRequired>
      <CoffeeChatLottie/>
      <CoffeeChatRecentList />
      <CoffeeChatCategory />
    </AuthRequired>
  );
};
setLayout(CoffeeChatMainPage, 'headerFooter');
setLayout(CoffeeChatMainPage, 'header');
export default CoffeeChatMainPage;
