import AuthRequired from "@/components/auth/AuthRequired";
import CoffeeChatCategory from "@/components/coffeechat/CoffeeChatCategory";
import CoffeeChatRecentList from "@/components/coffeechat/CoffeeRecentChatList";
import AdsBanner from "@/components/common/Banner/AdsBanner";
import Header from "@/components/common/Header";


const CoffeeChatMainPage=()=>{
    return (
    <AuthRequired>
    <Header/>
    {/* <AdsBanner/> */}
    <CoffeeChatRecentList/>
    <CoffeeChatCategory/>
    </AuthRequired>)
}
export default CoffeeChatMainPage;