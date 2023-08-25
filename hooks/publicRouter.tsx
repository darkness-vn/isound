"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { auth } from "@/firebase/init"

export interface PublicRoute {
    path: string
}

export default function PublicRoute<P extends PublicRoute>(
    Page: React.ComponentType<P>
) {
    return () => {

        const router = useRouter()

        const authChecker = async () => {
            try {
                auth.onAuthStateChanged(async (credential) => {
                    if (credential?.uid) {
                        router.push("/home")
                    } else {
                        router.push("/login")
                    }
                })
            } catch (err) {

            }
        }

        useEffect(() => {
            authChecker()
        }, [])

        const props = { path: "/" } as P

        return <Page {...props} />
    }
}