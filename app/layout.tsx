import './globals.css'
import type { Metadata } from 'next'
import { Button, ConfigProvider, theme } from 'antd';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBorderSecondary: "#4F4F4F",
              colorText: "#A8A8A8",
              colorTextHeading: "#A8A8A8",
              colorBgContainer: "#1B1D1E"
            },
            Message: {
              colorText: "#FFFFFF",
              contentBg: "#292929",
            },
          }
        }}
      >
        <body className={inter.className}>{children}</body>
      </ConfigProvider>
    </html>
  )
}