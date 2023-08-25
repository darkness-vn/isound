import Header from "@/components/header";
import { FC } from "react"
import { Orbitron } from 'next/font/google'
const orbitron = Orbitron({ weight: "700", subsets: ['latin'] })

interface Props {

}

const HomeContainer: FC<Props> = (props) => {
    return <div className="page">
        <Header />
        <main className="pt-12 h-screen pb-6 bg-cover" style={{ backgroundImage: `url(/isound-bg.jpg)` }}>
            <div className="flex w-full justify-center items-center pt-28">
                <div className="text-center">
                    <h1 style={orbitron.style} className="text-[3rem] font-bold">Soundscape Revolution</h1>
                    <h1 style={orbitron.style} className="text-[3rem] font-bold">❁ Tune into Life ❁</h1>
                    <h1 style={orbitron.style} className="my-2 text-sky-300 text-[2rem] font-bold">Audio for developer</h1>
                    <p className="text-xl">Provide audio API service for software developers.</p>
                    <p className="text-xl">Music sources around the world.</p>
                    <p className="text-xl">Quickly and powerfully.</p>
                    <div className="flex mt-4 justify-center items-center flex-col space-y-4">
                        <button className="bg-sky-400 rounded-3xl px-8 py-2 text-lg font-semibold">Start for free</button>
                        <button className="text-sky-700 underline rounded-3xl px-8 py-1 text-lg font-semibold">API Documents</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
}; export default HomeContainer