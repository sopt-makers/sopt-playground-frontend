import AuthRequired from "@/components/auth/AuthRequired";
import CoffeeChatCategory from "@/components/coffeechat/CoffeeChatCategory";
import CoffeeChatRecentList from "@/components/coffeechat/CoffeeRecentChatList";
import Header from "@/components/common/Header";
import { setLayout } from "@/utils/layout";

const CoffeeChatMainPage=()=>{
    return (
    <AuthRequired>
    <CoffeeChatRecentList/>
    <CoffeeChatCategory/>
    </AuthRequired>)
}
setLayout(CoffeeChatMainPage, 'headerFooter');
setLayout(CoffeeChatMainPage, 'header');
setLayout(CoffeeChatMainPage, 'headerOnlyDesktop');
export default CoffeeChatMainPage;