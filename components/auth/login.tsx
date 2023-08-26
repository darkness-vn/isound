"use client"
import { FC, FormEvent, useState } from "react"
import Input from "@/components/input"
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, googleProvider } from "@/firebase/init"
import { useRouter } from "next/navigation"

interface Props {

}

const LoginForm: FC<Props> = (props) => {

    const router = useRouter()
    const [email, $email] = useState<string>("")
    const [password, $password] = useState<string>("")

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            router.push("/home")
        } catch (err) {
            console.log(err)
        }
    }

    return <div>
        <p className="text-lg font-semibold">Login</p>
        <small>Đăng nhập với tài khoản, mật khẩu</small>
        <form onSubmit={handleLogin} className="mt-4 flex flex-col space-y-3">
            <Input onTextChange={(e) => $email(e.target.value)} icon={<AiOutlineMail />} placeholder="Email" />
            <Input onTextChange={(e) => $password(e.target.value)} icon={<AiOutlineLock />} type="password" placeholder="Password" />
            <button type="submit" className="drop-shadow-xl shadow-lg text-center w-full py-2 rounded-lg bg-green-500">
                Đăng nhập
            </button>
        </form>
    </div>
}; export default LoginForm