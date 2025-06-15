import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Project Management',
  description: 'Project management dashboard with analytics and task tracking',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      {children}
    </div>
  )
}