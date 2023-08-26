"use client"
import { Checkbox } from 'antd'
import { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { AiOutlineLeft } from "react-icons/ai"
import Input from '@/components/input'
import PrivateRoute from '@/hooks/privateRoute'
import { auth } from '@/firebase/init'
import useDeliver from '@/hooks/deliver'

const onChange = (checkedValues: CheckboxValueType[]) => {

}

const free_options = [
    { label: 'Get feed data', value: 'feed' },
    { label: 'Get media info', value: 'info' },
    { label: 'Play audio', value: 'play-audio' },
    { label: 'Play video', value: 'play-video' },
    { label: 'Download', value: 'download' },
]

const premium_options = [
    { label: 'Play high quality music', value: 'hq' },
    { label: 'Custom playlist', value: 'custom-playlist' },
    { label: 'Play video', value: 'play-video' },
]

export function FeaturePicker() {
    return <>
        <p className='mb-2 font-semibold text-gray-300'>Free features</p>
        <Checkbox.Group options={free_options} defaultValue={['Pear']} onChange={onChange} />

        <p className='mt-4 mb-2 font-semibold text-gray-300'>Premium features</p>
        <Checkbox.Group disabled options={premium_options} defaultValue={['Pear']} onChange={onChange} />
    </>
}

function CreateTokenContainer() {

    const router = useRouter()
    const [tokenName, $tokenName] = useState<string>("")

    const handleCreateAPIToken = async () => {
        try {
            const { generateToken } = await useDeliver()
            await generateToken({ tokenName })
            router.push("/dashboard")
        } catch (err) {

        }
    }

    return <main className="px-20 pt-[4.8rem]">
        <div className="border-t-2 border-solid border-gray-300 py-8">
            <div onClick={() => router.push("/dashboard")} className="cursor-pointer flex items-center space-x-2 text-sky-600">
                <AiOutlineLeft />
                <p>Back to all access tokens</p>
            </div>
            <h1 className="mt-4 text-2xl font-semibold">Create an access token</h1>
            <div className="mt-4">
                <p className="text-lg font-semibold">Token name</p>
                <p>Choose a name to help associate it with a project.</p>
            </div>
            <div className="mt-4">
                <Input onTextChange={(e) => $tokenName(e.target.value)} label={<p className="mb-1 text-sm font-semibold">Provide your token name</p>} surfix={"150 characters"} />
            </div>

            <div className="mt-6">
                <p className="text-lg font-semibold">Token scopes</p>
                <p>The feature will be applied to your token.</p>
            </div>
            <div className="mt-4">
                <FeaturePicker />
            </div>

            <div className="mt-4">
                <p>This token will work for requests originating from any URL.</p>
                <div className="mt-6 flex space-x-4 text-sm">
                    <button onClick={() => router.push("/dashboard")} className="border-2 border-blue-700 text-blue-600 rounded-2xl px-4 py-2">Cancel</button>
                    <button onClick={handleCreateAPIToken} className="bg-blue-600 text-white rounded-2xl px-4 py-2">Create token</button>
                </div>
            </div>
        </div>
    </main>
}

export default PrivateRoute(CreateTokenContainer)