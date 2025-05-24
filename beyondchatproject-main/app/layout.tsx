import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'beyondchat ui ',
  description: 'Created by Nilesh Mete ',
  generator: ' nilesh',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
