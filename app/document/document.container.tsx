import Input from "@/components/input"
import { FC } from "react"
import { AiOutlineSearch } from "react-icons/ai"

interface Props {

}

const DocumentContainer: FC<Props> = (props) => {
    return <div className="bg-cover" style={{ backgroundImage: `url(/isound-bg.jpg)` }}>
        <div className="py-32 px-20 flex justify-between items-center">
            <div className="txt-group">
                <h1 className="text-5xl font-bold">iSound Documentation</h1>
                <p className="text-lg my-5 text-gray-300">Examples, tutorials, and API references for building with iSound</p>
                <Input icon={<AiOutlineSearch className="text-2xl" />} placeholder="Search the docs" style={{ height: 45 }} />
            </div>
            <div className="flex space-x-6">
                <div className="w-52 shadow-lg drop-shadow-lg rounded-lg h-80">
                    <img src="https://upload.wikimedia.org/wikipedia/vi/5/5d/Lac_troi_single_sontungmtp.jpg" className="w-full h-full rounded-lg" alt="" />
                </div>
                <div className="w-52 shadow-lg drop-shadow-lg rounded-lg h-80">
                    <img src="https://i1.sndcdn.com/artworks-HgeFr49nbZSisRls-lv1NZA-t500x500.jpg" className="w-full h-full rounded-lg" alt="" />
                </div>
                <div className="w-52 shadow-lg drop-shadow-lg rounded-lg h-80">
                    <img src="https://i.scdn.co/image/ab67616d0000b273afcae7fbb42b549a8ed348af" className="w-full h-full rounded-lg" alt="" />
                </div>
            </div>
        </div>

        <div className="relative w-full text-base space-x-8 items-center px-20 h-14 bg-gray-800 flex border-y-2 border-gray-500">
            <p className="nav-item active">Info</p>
            <p className="nav-item">Search</p>
            <p className="nav-item">Audio</p>
            <p className="nav-item">Video</p>
            <p className="nav-item">Data</p>
            <p className="nav-item">Resources</p>
            <p className="nav-item">Demo</p>
        </div>

        <div className="w-full bg-black h-[600px] p-20">
            <h1 className="mb-6 text-3xl font-bold underline underline-offset-8">API document</h1>
            <section className="space-y-3 mb-6">
                <code className="text-2xl"><span className="get-method">[GET]</span> /media/info/:mediaID?token=YOUR_TOKEN</code>
                <p>Params:</p>
                <p>* mediaId: {"{ type: string, required: true, description: 'Youtube video/audio id' }"}</p>
                <p>* token: {"{ type: string, required: true, description: 'Your api token, can be created in dashboard' }"}</p>
            
                <p>Example:</p>
                <code className="bg-red-500 px-2">
                    {`const { data } = await axios.get('/media/info/HZaShvbm8Q0?token=YOUR_TOKEN')`}
                </code>
            </section>

            <section className="space-y-3 mb-6">
                <code className="text-2xl"><span className="get-method">[GET]</span> /media/play/:mediaID?token=YOUR_TOKEN</code>
                <p>Params:</p>
                <p>* mediaId: {"{ type: string, required: true, description: 'Youtube video/audio id' }"}</p>
                <p>* token: {"{ type: string, required: true, description: 'Your api token, can be created in dashboard' }"}</p>
            
                <p>Example:</p>
                <code className="bg-red-500 px-2">
                    {`const { data } = await axios.get('/media/play/HZaShvbm8Q0?token=YOUR_TOKEN')`}
                </code>
            </section>
        </div>
    </div>
}

export default DocumentContainer