"use client"
import { FC, FormEvent, useState } from "react"
import Input from "@/components/input"
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth, store } from "@/firebase/init"
import { doc, setDoc } from "firebase/firestore"
import { message } from "antd"

interface Props {

}

const RegisterForm: FC<Props> = (props) => {
    const router = useRouter()
    const [email, $email] = useState<string>("")
    const [password, $password] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage()

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
        try {
            if (!email || !password) {
                return messageApi.open({
                    type: 'error',
                    content: 'Email and password must be provided',
                })
            }

            const { user } = await createUserWithEmailAndPassword(auth, email, password)

            const userData = {
                _id: user.uid,
                email: user.email,
                name: null,
                avatar: null
            }

            await setDoc(doc(store, 'users', user.uid), userData)
            router.push("/home")
        } catch(error) {
            messageApi.open({
                type: 'error',
                content: 'Some thing went wrong',
            })
            console.log(error)
        }   
    }

    return <div>
        {contextHolder}
        <p className="text-lg font-semibold">Register</p>
        <small>Đăng ký nhanh</small>
        <form onSubmit={handleRegister} className="mt-4 flex flex-col space-y-3">
            <Input onTextChange={(e) => $email(e.target.value)} icon={<AiOutlineMail />} placeholder="Email" />
            <Input onTextChange={(e) => $password(e.target.value)} icon={<AiOutlineLock />} type="password" placeholder="Password" />
            <button className="drop-shadow-xl shadow-lg w-full text-center py-2 rounded-lg bg-green-500">
                Đăng ký
            </button>
        </form>
    </div>
}; export default RegisterForm