"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, GanttChart, LayoutDashboard, Menu, PieChart, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      label: "Directory",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Peer Analysis",
      icon: Users,
      href: "/peer-analysis",
      active: pathname === "/peer-analysis",
    },
    {
      label: "Contract Analysis",
      icon: FileText,
      href: "/contract-analysis",
      active: pathname === "/contract-analysis",
    },
    {
      label: "Regulatory Analysis",
      icon: GanttChart,
      href: "/regulatory-analysis",
      active: pathname === "/regulatory-analysis",
    },
    {
      label: "Mutual Customers",
      icon: PieChart,
      href: "/mutual-customers",
      active: pathname === "/mutual-customers",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="flex items-center border-b px-4 py-3">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <span className="text-lg">VIGs Stars Dashboard</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close navigation menu</span>
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <nav className="grid gap-2 p-4 text-sm">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                      route.active
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <span className="text-lg hidden md:inline-block">VIGs Stars Dashboard</span>
          <span className="text-xs text-muted-foreground hidden md:inline-block">vendor suite</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "hidden md:flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground",
                route.active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1 bg-muted/10">{children}</main>
    </div>
  )
}
