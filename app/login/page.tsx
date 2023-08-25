import LoginContainer from "./login.container";
import { useRouter } from 'next/navigation'
import { auth } from "@/firebase/init"
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

type Repo = {
    name: string
    stargazers_count: number
}

export const getStaticProps: GetStaticProps<{
    repo: Repo
}> = async () => {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const repo = await res.json()
    return { props: { repo } }
}

export default async function Login(props: any) {

    const authState = auth.currentUser

    console.log(props)


    return <>
        <LoginContainer />
    </>
}

