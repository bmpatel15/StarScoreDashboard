import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import OverviewDashboard from "@/components/overview-dashboard"

export const metadata: Metadata = {
  title: "Healthcare Analytics Dashboard",
  description: "Contract analysis and performance tracking for healthcare organizations",
}

export default function HomePage() {
  return (
    <DashboardLayout>
      <OverviewDashboard />
    </DashboardLayout>
  )
}
