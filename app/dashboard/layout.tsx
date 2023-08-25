"use client"
import Header from "@/components/header"
import type { ReactNode } from "react"

function DashboardLayout ({ children }: { children: ReactNode }) {
    return <div className="page">
        <Header />
        { children }
    </div>
}

export default DashboardLayout