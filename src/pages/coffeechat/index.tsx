import AuthRequired from '@/components/auth/AuthRequired';
import CoffeeChatCategory from '@/components/coffeechat/CoffeeChatCategory';
import CoffeeChatRecentList from '@/components/coffeechat/CoffeeRecentChatList';
import { setLayout } from '@/utils/layout';

const CoffeeChatMainPage = () => {
  return (
    <AuthRequired>
      <CoffeeChatRecentList />
      <CoffeeChatCategory />
    </AuthRequired>
  );
};
setLayout(CoffeeChatMainPage, 'headerFooter');
setLayout(CoffeeChatMainPage, 'header');
export default CoffeeChatMainPage;
