"use client"
import axios from "axios"
import { auth } from "@/firebase/init"

const LOCAL_API = "http://localhost:8888"
const PROD_API = "https://isound.cyclic.cloud"

interface TokenOptions {
    location?: string,
    lang?: string,
    feed?: boolean,
    audio?: boolean,
    video?: boolean,
    download?: boolean
    lyric?: boolean,
    history?: boolean,
    playlist?: boolean
}

export default async function useDeliver() {

    const tokenId = await auth.currentUser?.getIdToken()

    const deliverInstance = axios.create({
        baseURL: LOCAL_API,
        timeout: 10000,
        headers: {
            'tokenId': tokenId,
            'Authorization': tokenId,
            'Content-Type': 'application/json',
        },
    })

    const getTokenList = async () => {
        const { data } = await deliverInstance.get("/user/token")
        return data
    }

    const getTokenDetailById = async (id: string) => {
        const { data } = await deliverInstance.get(`/user/token`, {
            params: { token: id }
        })
        return data
    }

    const deleteTokenById = async (id: string) => {
        const { data } = await deliverInstance.delete(`/user/token/${id}`)
        return data
    }

    type TokenPayload = {
        tokenName?: string,
        options?: TokenOptions
    }

    const generateToken = async ({ tokenName, options }: TokenPayload) => {
        await deliverInstance.post(`/user/token/create-api-token`, { tokenName, options })
    }

    const updateToken = async (tokenId: string, payload: TokenPayload) => {
        await deliverInstance.put(`/token/${tokenId}`, { ...payload })
    }

    return { getTokenList, getTokenDetailById, deleteTokenById, generateToken, updateToken }
}