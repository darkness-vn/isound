"use client"
import { FC } from "react"
import { useRouter } from "next/navigation"
import { AiOutlineLeft } from "react-icons/ai"
import { Input, Select } from "antd"
import Switcher from "@/components/switcher"
import { iAPIToken } from "@/types/apiToken"
import useDeliver from "@/hooks/deliver"
interface Props {
    data: iAPIToken
}
const UpdateTokenContainer: FC<Props> = ({ data, ...rest }) => {

    const router = useRouter()

    const handleChangeLang = async (value: string) => {
        const { updateToken } = await useDeliver()

        await updateToken(data.key, {
            options: {
                lang: value
            }
        })
    }

    const handleChangeLocation = async (value: string) => {
        const { updateToken } = await useDeliver()

        await updateToken(data.key, {
            options: {
                location: value
            }
        })
    }

    return <div className="pt-[4.8rem]">
        <div className="border-t-2 px-20 py-8">
            <div onClick={() => router.push("/dashboard")} className="cursor-pointer flex items-center space-x-2 text-sky-600">
                <AiOutlineLeft />
                <p>Back to all access tokens</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <h1 className="mt-4 text-2xl font-semibold">Update Token</h1>
            </div>

            <div className="mt-4">
                <h2 className="text-white text-lg font-semibold">{ data.token_name }</h2>
            </div>

            <div className="mt-4 flex space-x-8">
                <div className="flex items-center space-x-4">
                    <p>Seclect your API location/country</p>
                    <Select
                        defaultValue={data.options.location}
                        style={{ width: 120 }}
                        onChange={handleChangeLocation}
                        options={[
                            { value: 'AU', label: 'Australia' },
                            { value: 'FR', label: '	France' },
                            { value: 'JP', label: 'Japan' },
                            { value: 'KR', label: 'Korea'},
                            { value: 'GB', label: '	United Kingdom' },
                            { value: 'US', label: 'United States' },
                            { value: 'VN', label: 'Việt Nam'}
                        ]}
                    /></div>

                <div className="flex items-center space-x-4">
                    <p>Select your API language</p>
                    <Select
                        defaultValue={data.options.lang}
                        style={{ width: 120 }}
                        onChange={handleChangeLang}
                        options={[
                            { value: 'vi', label: 'Tiếng Việt' },
                            { value: 'en', label: 'English' },
                        ]}
                    /></div>
            </div>

            <div className="mt-4 space-y-2 border-2 p-6 rounded-xl">
                <Switcher id={data.key} checked={data.options.audio} target="audio" title="Play Audio" desc="You can play audio with your API (128kbps)" />
                <Switcher id={data.key} checked={data.options.video} target="video" title="Play Video" desc="You can play video with your API (480p ~ 1080p)" />
                <Switcher id={data.key} checked={data.options.feed} target="feed" title="Feed Data" desc="Get feed data (Ex: popular, hot, latest, ...)" />
                <Switcher id={data.key} checked={data.options.download} target="download" title="Download" desc="You can download any media data (Audio: 128kbps, Video: 480p ~ 1080p)" />
                <Switcher id={data.key} checked={data.options.lyric} target="lyric" title="Lyric Data" desc="Get lyric data for audio or video" />
                <Switcher id={data.key} checked={data.options.history} target="history" title="History (Premium)" desc="Your media that you played will be saved and you can get anywhere" disabled />
                <Switcher id={data.key} checked={data.options.playlist} target="playlist" title="Custom Playlist (Premium)" desc="Create and manager your custom playlist" disabled />
            </div>
        </div>
    </div>
}

export default UpdateTokenContainer