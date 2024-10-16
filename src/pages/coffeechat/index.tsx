import AuthRequired from "@/components/auth/AuthRequired";
import Header from "@/components/common/Header";


const CoffeeChatMainPage=()=>{

    return (
    <AuthRequired>
    <Header>
    </Header>
    </AuthRequired>)
}
export default CoffeeChatMainPage;