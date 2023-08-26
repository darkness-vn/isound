"use client"
import axios from "axios"
import { auth } from "@/firebase/init"

const LOCAL_API = "http://localhost:8888"
const PROD_API = "https://isound.cyclic.cloud"

export default async function useDeliver() {

    const tokenId = await auth.currentUser?.getIdToken()

    const deliverInstance = axios.create({
        baseURL: PROD_API,
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

    type GenerateTokenInput = {
        tokenName: string,
        options?: {
            feedData: boolean,
            mediaInfo: boolean,
            playAudio: boolean,
            playVideo: boolean
            download: boolean,
            history: boolean
        }
    }

    const generateToken = async ({ tokenName, options }:GenerateTokenInput) => {
        await deliverInstance.post(`/user/token/create-api-token`, {tokenName})
    }

    return { getTokenList, getTokenDetailById, deleteTokenById, generateToken }
}