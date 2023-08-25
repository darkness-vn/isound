"use client"
import axios from "axios"
import { auth } from "@/firebase/init"

export default async function useDeliver() {

    const tokenId = await auth.currentUser?.getIdToken()

    const deliverInstance = axios.create({
        baseURL: 'https://isound.cyclic.cloud',
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

    return { getTokenList, getTokenDetailById, deleteTokenById }
}