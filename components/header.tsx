"use client"
import { FC, useEffect, useState } from "react"
import Logo from "./logo"
import Link from "next/link"

interface Props { }

const Header: FC<Props> = () => {

    const [headerStyles, setHeaderStyles] = useState<string>("")

    useEffect(() => {
        window.addEventListener("scroll", transition)
        return () => window.removeEventListener("scroll", transition)
    }, [])

    const transition = () => {
        if (window.scrollY > 150) {
            // set style for header
            setHeaderStyles("bg-sky-600")
        } else {
            setHeaderStyles("bg-none")
        }
    }

    return <header className={"duration-500 fixed z-10 w-full flex justify-between items-center px-20 py-4 " + headerStyles}>
        <Logo />
        <div className="flex space-x-8 text-base items-center">
            <Link href="/price" className="font-semibold">Price</Link>
            <Link href="/document" className="font-semibold">Document</Link>
            <Link href="/about" className="font-semibold">About</Link>
            <Link href="/contact" className="font-semibold">Contact</Link>
            <Link href="/dashboard" className="font-semibold px-3 py-1 bg-sky-600 rounded-xl">Dashboard</Link>
        </div>
    </header>
}

export default Header