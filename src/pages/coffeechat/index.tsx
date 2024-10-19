import AuthRequired from "@/components/auth/AuthRequired";
import CoffeeChatList from "@/components/coffeechat/CoffeeChatList";
import Header from "@/components/common/Header";


const CoffeeChatMainPage=()=>{
    return (
    <AuthRequired>
    <Header>
    </Header>
    <CoffeeChatList/>
    </AuthRequired>)
}
export default CoffeeChatMainPage;