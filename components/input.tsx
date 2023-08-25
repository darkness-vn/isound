"use client"
import { HTMLAttributes, ReactNode, FC, ChangeEvent } from "react"

interface Props extends React.HTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode
    label?: React.ReactNode
    type?: string
    surfix?: React.ReactNode
    onTextChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<Props> = ({ icon, type, label, surfix, onTextChange, ...rest }) => {
    return <>
        { label && label }
        <div className="drop-shadow-xl shadow-lg flex space-x-2 rounded-lg px-4 py-2 bg-gray-800 items-center">
            {icon && icon}
            <input onChange={onTextChange} {...rest} type={type ?? "text"} className="bg-gray-800 border-none outline-none w-[85%]" />
            {surfix && surfix}
        </div>
    </>
}

export default Input