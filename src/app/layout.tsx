import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StarknetProvider from "../components/starknet-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Token Bound| Starknet',
  description: 'An implementation of ERC 6551 on Starknet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <StarknetProvider>
        <body className={inter.className}>{children}</body>
      </StarknetProvider>
    </html>
  )
}
