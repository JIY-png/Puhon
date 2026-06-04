import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { getAuthRole } from "@/lib/auth"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PUHON | WePlay Family",
  description: "Welcome to PUHON - A premier WePlay gaming family. Join our community of passionate gamers.",
  generator: "v0.app",
  icons: {
    icon: "/Puhon_logo.png",
    apple: "/Puhon_logo.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialRole = await getAuthRole()
  
  return (
    <html lang="en" className="bg-background">
      <body className={`font-sans antialiased`}>
        <AuthProvider initialRole={initialRole}>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
