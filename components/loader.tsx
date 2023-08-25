"use client"
import { auth, store } from "@/firebase/init"
import { FC, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import Logo from "./logo"

interface Props {
    timeout?: number
    onError?: () => void
    onErrorRedirectPath?: string
    onSuccess?: () => void
    onSuccessRedirectPath?: string
}

const Loader:FC<Props> = ({ timeout, onError, onErrorRedirectPath, onSuccess, onSuccessRedirectPath }) => {

    const router = useRouter()

    const userAuthChecker = async () => {
        try {
            auth.onAuthStateChanged(async (credential) => {
                if (credential?.uid) {
                    try {
                        let snap = await getDoc(doc(store, 'users', credential?.uid))
    
                        if (snap.exists()) {
                            console.log(snap.data())
                            // set user data
                        }
    
                        setTimeout(() => {
                            router.push(onSuccessRedirectPath ?? "/home")
                        }, timeout ?? 2000)
    
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    setTimeout(() => {
                        router.push(onSuccessRedirectPath ?? "/login")
                    }, timeout ?? 2000)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        userAuthChecker()
    }, [])

    return <div className="w-screen min-h-screen bg-cover flex justify-center flex-col items-center" style={{backgroundImage:"url(/isound-bg.jpg)"}}>
        <img src="/loader.svg" alt="" className="w-20 h-20" />
        <Logo size={50}/>
        <p>Loading...</p>
    </div>
}; export default Loader