"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"

interface SummaryData {
  declining: {
    count: number
    enrollment: number
  }
  improving: {
    count: number
    enrollment: number
  }
  avgChange: number
  medianChange: number
}

export function QbpSummaryCards() {
  const [data, setData] = useState<SummaryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setData({
        declining: {
          count: 257,
          enrollment: 16034242,
        },
        improving: {
          count: 191,
          enrollment: 13325613,
        },
        avgChange: -0.08,
        medianChange: -0.09,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-muted rounded"></div>
              <div className="h-10 w-20 bg-muted rounded"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
              <div className="h-6 w-36 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-muted rounded"></div>
              <div className="h-10 w-20 bg-muted rounded"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
              <div className="h-6 w-36 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-muted rounded"></div>
              <div className="h-10 w-20 bg-muted rounded"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
              <div className="h-6 w-36 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="text-sm font-medium mb-2">
              Number of Contracts with <span className="text-red-500 font-semibold">Declining</span> Scores from Stars
              2023 to 2024
            </div>
            <div className="text-4xl font-bold text-red-500 mb-2">{data?.declining.count}</div>
            <div className="text-sm text-muted-foreground mb-1">Enrollment</div>
            <div className="text-2xl font-semibold text-red-500">{data?.declining.enrollment.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="text-sm font-medium mb-2">
              Number of Contracts with <span className="text-green-500 font-semibold">Improving</span> Scores from Stars
              2023 to 2024
            </div>
            <div className="text-4xl font-bold text-green-500 mb-2">{data?.improving.count}</div>
            <div className="text-sm text-muted-foreground mb-1">Enrollment</div>
            <div className="text-2xl font-semibold text-green-500">{data?.improving.enrollment.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Avg Change</div>
                <div
                  className={cn(
                    "text-3xl font-bold flex items-center",
                    data?.avgChange < 0 ? "text-red-500" : "text-green-500",
                  )}
                >
                  {data?.avgChange.toFixed(2)}
                  {data?.avgChange < 0 ? <ArrowDown className="h-5 w-5 ml-1" /> : <ArrowUp className="h-5 w-5 ml-1" />}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Median Change</div>
                <div
                  className={cn(
                    "text-3xl font-bold flex items-center",
                    data?.medianChange < 0 ? "text-red-500" : "text-green-500",
                  )}
                >
                  {data?.medianChange.toFixed(2)}
                  {data?.medianChange < 0 ? (
                    <ArrowDown className="h-5 w-5 ml-1" />
                  ) : (
                    <ArrowUp className="h-5 w-5 ml-1" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
