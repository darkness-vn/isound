"use client"
import { FC, useState } from "react"
import { Switch } from "antd"
import useDeliver from "@/hooks/deliver"

interface Props {
    target: string
    title: string
    desc?: string
    disabled?: boolean
    id: string
    checked: boolean
}

const Switcher: FC<Props> = (props) => {

    const [loading, $loading] = useState<boolean>(false)

    const onChange = async (checked: boolean) => {
        $loading(true)
        const { updateToken } = await useDeliver()

        await updateToken(props.id, {
            options: {
                [props.target]:checked
            }
        })

        $loading(false)
    }

    return <div className="disable-last-border flex space-x-4 w-full items-center justify-between border-b-2 py-2">
        <div>
            <p className="text-white font-semibold">{props.title}</p>
            { props.desc && <p className="text-sm text-gray-400">{ props.desc }</p>}
        </div>
        <Switch onChange={onChange} defaultChecked={props.checked} loading={loading} disabled={props.disabled ?? false}/>
    </div>
}

export default Switcher