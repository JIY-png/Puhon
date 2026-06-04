import type React from "react"
import { MemberSidebar } from "@/components/member-sidebar"
import { MemberHeader } from "@/components/member-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <MemberSidebar />
      <div className="lg:pl-64">
        <MemberHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
