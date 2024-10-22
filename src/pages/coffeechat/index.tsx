import AuthRequired from "@/components/auth/AuthRequired";
import CoffeeChatCategory from "@/components/coffeechat/CoffeeChatCategory";
import CoffeeChatList from "@/components/coffeechat/CoffeeChatList";
import AdsBanner from "@/components/common/Banner/AdsBanner";
import Header from "@/components/common/Header";


const CoffeeChatMainPage=()=>{
    return (
    <AuthRequired>
    <Header>
    </Header>
    <AdsBanner/>
    <CoffeeChatList/>
    <CoffeeChatCategory/>
    </AuthRequired>)
}
export default CoffeeChatMainPage;