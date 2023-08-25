"use client"
import { FC, Dispatch, SetStateAction } from "react"
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { iAPIToken } from "@/types/apiToken"
import { BiCopyAlt, BiRefresh } from "react-icons/bi"
import { CiSettings, CiCircleRemove } from "react-icons/ci"
import useDeliver from "@/hooks/deliver"
import type { MessageInstance } from "antd/es/message/interface"

interface Props {
    messageApi: MessageInstance
    data: iAPIToken[]
    dataLoader: () => Promise<void>
}

function shortenString(inputString: string, maxLength: number) {
    if (inputString.length <= maxLength) {
        return inputString;
    } else {
        return inputString.substring(0, maxLength) + "...";
    }
}

const TokenList: FC<Props> = ({ messageApi, data, dataLoader }) => {

    const deleteToken = async (id: string) => {

        const { deleteTokenById } = await useDeliver()
        await deleteTokenById(id)
        await dataLoader()
    }

    const columns: ColumnsType<iAPIToken> = [
        {
            title: 'Name',
            dataIndex: 'token_name',
            key: 'token_name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Token',
            dataIndex: 'token_content',
            key: 'token_content',
            render: (text) => <div className="flex justify-between">
                <p>{shortenString(text, 50)}</p>
                <button onClick={() => {
                    navigator.clipboard.writeText(text)
                }}><BiCopyAlt className="text-xl text-sky-600" /></button>
            </div>
        },
        {
            title: 'Limit',
            dataIndex: 'token_limit',
            key: 'token_limit',
        },
        {
            title: 'Tags',
            key: 'token_tags',
            dataIndex: 'token_tags',
            render: (_, { token_tags }) => (
                <>
                    {token_tags.map((tag) => {
                        let color = 'green'
                        if (tag === 'premium') {
                            color = '#F7C42B'
                        }
                        if (tag === 'expired') {
                            color = '#DE0004'
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (

                <div className="flex space-x-4">
                    <button className="text-sky-500 flex space-x-2 items-center">
                        <BiRefresh className="text-xl text-sky-500" />
                    </button>
                    <button className="text-sky-500 flex space-x-2 items-center">
                        <CiSettings className="text-xl text-sky-500" />
                    </button>
                    <button onClick={() => deleteToken(record.key)} className="text-sky-500 flex space-x-2 items-center">
                        <CiCircleRemove className="text-xl text-red-500" />
                    </button>
                </div>

            ),
        },
    ]

    return <Table className="token-table" columns={columns} dataSource={data} />
}; export default TokenList