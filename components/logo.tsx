import { Orbitron } from 'next/font/google'
import { FC } from 'react'
import { SiMusicbrainz, SiAudiomack } from "react-icons/si"
import { RiNeteaseCloudMusicLine } from "react-icons/ri"
const orbitron = Orbitron({ weight: "500", subsets: ['latin'] })

interface Props {
    size?: number
}

const Logo: FC<Props> = ({ size }) => {
    return <div className='flex space-x-1 items-center'>
        <SiAudiomack style={{ fontSize: size ?? 30 }} />
        <p className={orbitron.className} style={{ fontSize: size ?? 30, fontWeight: 600 }}>
            iSound
        </p>
    </div>
}

export default Logo