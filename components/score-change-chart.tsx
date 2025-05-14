"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ScoreChangeChart() {
  const [isLoading, setIsLoading] = useState(true)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)

      if (typeof window !== "undefined" && chartRef.current) {
        import("chart.js").then(({ Chart, registerables }) => {
          Chart.register(...registerables)

          const ctx = document.createElement("canvas")
          chartRef.current?.appendChild(ctx)

          new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["CAHPS", "HEDIS", "HOS", "Operations", "Pharmacy"],
              datasets: [
                {
                  label: "1-Weight Avg Rate Change",
                  data: [-0.17, 0.04, -0.02, -0.08, -0.07],
                  backgroundColor: "#3b82f6",
                  borderColor: "#2563eb",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              animation: {
                duration: 1000,
                easing: "easeOutQuart",
              },
              plugins: {
                title: {
                  display: true,
                  text: "Change in Average Measure Set Star Rating - S23 to S24",
                  font: {
                    size: 14,
                  },
                },
                legend: {
                  display: false,
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: false,
                  title: {
                    display: true,
                    text: "Change",
                  },
                },
              },
            },
          })
        })
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      if (chartRef.current) {
        chartRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Star Rating Changes from S23 to S24 - by Measure Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">1-Weight</div>
              <div className="text-xl font-semibold text-red-500">-0.17</div>
              <div className="text-xs text-muted-foreground">Avg Rate Change</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">3-Weight</div>
              <div className="text-xl font-semibold text-green-500">0.04</div>
              <div className="text-xs text-muted-foreground">Avg Rate Change</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">4-Weight</div>
              <div className="text-xl font-semibold text-red-500">-0.02</div>
              <div className="text-xs text-muted-foreground">Avg Rate Change</div>
            </div>
          </div>

          <div ref={chartRef} className="w-full h-64">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weighted Average Measure Set Star Rating - S23 to S24</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 text-left">Measure</th>
                    <th className="px-4 py-2 text-center">Set</th>
                    <th className="px-4 py-2 text-center">Wt</th>
                    <th className="px-4 py-2 text-center">Stars 2023 Score</th>
                    <th className="px-4 py-2 text-center">Stars 2024 Score</th>
                    <th className="px-4 py-2 text-center">Rating Diff</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={index} className="animate-pulse border-t">
                          <td className="px-4 py-2">
                            <div className="h-4 w-40 bg-muted rounded"></div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <div className="h-4 w-16 mx-auto bg-muted rounded"></div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <div className="h-4 w-6 mx-auto bg-muted rounded"></div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <div className="h-4 w-10 mx-auto bg-muted rounded"></div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <div className="h-4 w-10 mx-auto bg-muted rounded"></div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <div className="h-4 w-12 mx-auto bg-muted rounded"></div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <>
                      <tr className="border-t">
                        <td className="px-4 py-2">Reviewing Appeals Decisions</td>
                        <td className="px-4 py-2 text-center">Operations</td>
                        <td className="px-4 py-2 text-center">4</td>
                        <td className="px-4 py-2 text-center">95.0</td>
                        <td className="px-4 py-2 text-center">95.0</td>
                        <td className="px-4 py-2 text-center text-red-500">-0.66</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">MPF Price Accuracy</td>
                        <td className="px-4 py-2 text-center">Operations</td>
                        <td className="px-4 py-2 text-center">1</td>
                        <td className="px-4 py-2 text-center">95.3</td>
                        <td className="px-4 py-2 text-center">96.9</td>
                        <td className="px-4 py-2 text-center text-red-500">-0.65</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">Statin Use with Diabetes</td>
                        <td className="px-4 py-2 text-center">Pharmacy</td>
                        <td className="px-4 py-2 text-center">1</td>
                        <td className="px-4 py-2 text-center">85.1</td>
                        <td className="px-4 py-2 text-center">85.7</td>
                        <td className="px-4 py-2 text-center text-red-500">-0.41</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">COA - Medication Review</td>
                        <td className="px-4 py-2 text-center">HEDIS</td>
                        <td className="px-4 py-2 text-center">1</td>
                        <td className="px-4 py-2 text-center">92.7</td>
                        <td className="px-4 py-2 text-center">93.1</td>
                        <td className="px-4 py-2 text-center text-red-500">-0.37</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">MTM Program Comp Rate-CMR</td>
                        <td className="px-4 py-2 text-center">Pharmacy</td>
                        <td className="px-4 py-2 text-center">1</td>
                        <td className="px-4 py-2 text-center">82.6</td>
                        <td className="px-4 py-2 text-center">83.1</td>
                        <td className="px-4 py-2 text-center text-red-500">-0.30</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
