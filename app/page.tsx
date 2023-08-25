import Image from 'next/image'
import Loader from '@/components/loader'

export default function Index() {
  return <>
    <Loader timeout={1000}/>
  </>
}
