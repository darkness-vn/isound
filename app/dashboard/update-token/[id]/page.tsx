import { redirect } from "next/navigation"
import UpdateTokenContainer from "./updateToken.container"
import axios from "axios"
import { iAPIToken } from "@/types/apiToken"

export const loader = async (tokenId: string) => {
    try {
        const { data } = await axios.get(`https://isound.cyclic.cloud/token/${tokenId}`)
        return data as iAPIToken
    } catch(error) {
        return redirect("/")
    }
}

export default async function UpdateToken(props: any) {

    const data = await loader(props.params.id)

    return <>
        <UpdateTokenContainer data={data} />
    </>
}