"use client"
import axios from "axios"
import TokenList from "@/components/tables/tokens.table";
import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PrivateRoute from "@/hooks/privateRoute"
import { auth } from "@/firebase/init"
import { message } from "antd"
import { iAPIToken } from "@/types/apiToken"
import useDeliver from "@/hooks/deliver"

interface Props {

}

const DashboardContainer: FC<Props> = (props) => {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage()
    const [listOfToken, setListOfToken] = useState<Array<iAPIToken>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const dataLoader = async () => {

        messageApi
            .open({
                type: 'loading',
                content: 'Loading...',
        })

        const { getTokenList } = await useDeliver()
        const tokens = await getTokenList()
        setListOfToken(tokens)
        messageApi.destroy()
    }

    useEffect(() => {
        dataLoader()
    }, [])

    return <main className="px-20 pt-[4.8rem]">
        {contextHolder}
        <div className="border-t-2 border-solid border-gray-300 py-8">
            <h1 className="text-2xl font-semibold">Access tokens</h1>
            <div className="mt-4">
                <p>You need an API access token to configure iSound services.</p>
                <p>Read more about API access tokens in our documentation.</p>
            </div>
            <div className="mt-4">
                <button onClick={() => router.push("/dashboard/create-token")} className="rounded-2xl border-2 border-sky-600 px-4 py-2">+ Create token</button>
            </div>

            <div className="token-list mt-6">
                <TokenList messageApi={messageApi} data={listOfToken} dataLoader={dataLoader} />
            </div>
        </div>
    </main>
}; export default PrivateRoute<Props>(DashboardContainer)