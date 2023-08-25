"use client"
import { FC, FormEvent, useState } from "react"
import Input from "@/components/input"
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, googleProvider } from "@/firebase/init"

interface Props {

}

const LoginForm: FC<Props> = (props) => {

    const [email, $email] = useState<string>("")
    const [password, $password] = useState<string>("")

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {

        }
    }

    return <>
        <p className="text-lg font-semibold">Login</p>
        <small>Đăng nhập với tài khoản, mật khẩu</small>
        <form className="mt-4 flex flex-col space-y-3">
            <Input onTextChange={(e)=>$email(e.target.value)} icon={<AiOutlineMail />} placeholder="Email" />
            <Input onTextChange={(e)=>$password(e.target.value)} icon={<AiOutlineLock />} type="password" placeholder="Password" />
            
            
            <button className="drop-shadow-xl shadow-lg text-center w-full py-2 rounded-lg bg-green-500">
                Đăng nhập
            </button>
        </form>
    </>
}; export default LoginForm