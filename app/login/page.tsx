import LoginContainer from "./login.container";
import { auth } from "@/firebase/init"

export default async function Login(props: any) {
    return <>
        <LoginContainer />
    </>
}

