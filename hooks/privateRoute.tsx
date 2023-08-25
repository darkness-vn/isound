"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { auth } from "@/firebase/init"

export interface PrivateRouteProps {

}

export default function PrivateRoute<P extends PrivateRouteProps>(
    Route: React.ComponentType<P>
) {
    return () => {

        const router = useRouter()
        const [isAuth, setIsAuth] = useState<boolean>(false)
        
        const authChecker = async () => {
            try {
                auth.onAuthStateChanged(async (credential) => {
                    if (credential?.uid) {
                        setIsAuth(true)
                    } else {
                        router.push("/login")
                    }
                })
            } catch(err) {

            }
        }

        useEffect(() => {
            authChecker()
        }, [])

        const props = { } as P

        return isAuth && <Route {...props} />
    }
}