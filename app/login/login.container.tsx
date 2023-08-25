"use client"
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, googleProvider, store } from "@/firebase/init"
import { useRouter } from "next/navigation"
import Input from "@/components/input"
import PublicRoute from "@/hooks/publicRouter"
import { FC, FormEvent, useState } from "react"
import { AiOutlineMail, AiOutlineLock, AiFillApple } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { BsFacebook } from "react-icons/bs"
import Logo from "@/components/logo"
import RegisterForm from "@/components/auth/register"
import { doc, getDoc, setDoc } from "firebase/firestore"

interface Props {

}

const LoginContainer: FC<Props> = (props) => {
    const router = useRouter()
    const [email, $email] = useState<string>("")
    const [password, $password] = useState<string>("")

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
        console.log(email, password)
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        console.log(user)
    }

    const loginWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            const user = res.user
            console.log(user)

            const docRef = doc(store, "users", user.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(`user da ton tai`)
            } else {
                const userData = {
                    _id: user.uid,
                    email: user.email,
                    name: null,
                    avatar: null
                }
                await setDoc(doc(store, 'users', user.uid), userData)
            }
            router.push("/home")
            // const token = await user.getIdToken()
            // console.log(`idToken`, token)
            // const tokenResult = await user.getIdTokenResult()
            // console.log(`tokenResult`, tokenResult)
        } catch (error) {
            console.log(error)
        }
    }

    const getAuth = () => {
        const data = auth.currentUser
        console.log(data)
    }

    return <div style={{ backgroundImage: "url(/isound-bg.jpg)" }} className="bg-cover page flex justify-center items-center">
        <div className="rounded-xl bg-black bg-opacity-60">

            <div className="px-8 py-6">
                <Logo />
                <p className="text-white">Soundscape Revolution: Tune into Life</p>
            </div>

            <div className="flex px-8 py-6 bg-white bg-opacity-60 justify-between space-x-12">
                <RegisterForm />
                <div className="login">
                    <p className="text-lg font-semibold">Login</p>
                    <small>Đăng nhập với tài khoản, mật khẩu</small>
                    <form className="mt-4 flex flex-col space-y-3">
                        <Input icon={<AiOutlineMail />} placeholder="Email" />
                        <Input icon={<AiOutlineLock />} type="password" placeholder="Password" />
                        <button className="drop-shadow-xl shadow-lg text-center w-full py-2 rounded-lg bg-green-500">
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>

            <div className="w-full py-1 space-x-3 bg-white bg-opacity-60 flex justify-center items-center">
                <div className="border-2 w-full h-0"></div>
                <p className="text-center min-w-[100px]">Hoặc dùng</p>
                <div className="border-2 w-full h-0"></div>
            </div>

            <div className="px-8 pt-2 py-6 space-x-4 flex bg-white bg-opacity-60 rounded-b-xl justify-between">
                <button onClick={loginWithGoogle} className="bg-black bg-opacity-50 drop-shadow-xl shadow-lg border-t-[1px] w-[33%] flex justify-center space-x-2 items-center py-2 rounded-xl">
                    <FcGoogle className="text-xl" />
                    <p className="text-base font-semibold">Google</p>
                </button>

                <button className="bg-black bg-opacity-50 drop-shadow-xl shadow-lg border-t-[1px] w-[33%] flex justify-center space-x-2 items-center py-2 rounded-xl">
                    <BsFacebook className="text-blue-500 text-xl" />
                    <p className="text-base font-semibold">Facebook</p>
                </button>

                <button onClick={getAuth} className="bg-black bg-opacity-50 drop-shadow-xl shadow-lg border-t-[1px] w-[33%] flex justify-center space-x-2 items-center py-2 rounded-xl">
                    <AiFillApple className="text-xl" />
                    <p className="text-base font-semibold">Apple</p>
                </button>
            </div>
        </div>
    </div>
}

export default LoginContainer