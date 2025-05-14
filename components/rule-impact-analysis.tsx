"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RuleImpactAnalysis() {
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
                  label: "Improved Star Ratings",
                  data: [2.71, 4.14, 3.89, 3.84, 3.46],
                  backgroundColor: "#22c55e",
                  borderColor: "#16a34a",
                  borderWidth: 1,
                },
                {
                  label: "Declined Star Ratings",
                  data: [3.98, 3.66, 2.9, 4.27, 3.14],
                  backgroundColor: "#ef4444",
                  borderColor: "#dc2626",
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
                  text: "Average Performance Based on MX Weight Change",
                  font: {
                    size: 14,
                  },
                },
                legend: {
                  position: "top",
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Average Star Rating",
                  },
                  min: 0,
                  max: 5,
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
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Member Experience Weight Change Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground mb-2">Improved</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Score</div>
                    <div className="text-xl font-semibold text-green-500">196</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="text-xl font-semibold text-green-500">45</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Gained QBP</div>
                    <div className="text-xl font-semibold text-green-500">7</div>
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <div className="text-sm text-muted-foreground mb-2">Declined</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Score</div>
                    <div className="text-xl font-semibold text-red-500">381</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="text-xl font-semibold text-red-500">95</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Lost QBP</div>
                    <div className="text-xl font-semibold text-red-500">93</div>
                  </div>
                </div>
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
            <CardTitle className="text-base">What Does the Member Experience Weight Change Mean?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="mb-4">
              As plans evaluate where to focus attention and resources over the coming months, one exercise to consider
              is an evaluation of the impact of the member experience measure weight change that is coming in Stars
              2026... aka, January 1, 2024.
            </p>
            <p className="mb-4">
              The charts show the average Star ratings by measure set for two distinct groups of contracts. The top
              chart shows the average performance of contracts that saw improved Star ratings after applying the new
              member experience measure weights to Stars 2024.
            </p>
            <p className="mb-4">
              The bottom chart shows the same breakdown but for the contracts that saw a Star rating decline after
              applying the new weights.
            </p>
            <p className="mb-4">
              The big differentiator, no surprise here, is that the{" "}
              <span className="font-semibold">higher the score of the HEDIS and Pharmacy measures</span> are relative to
              that of the CAHPS and Ops measures, the more likely a plan is to see improved ratings as a result of the
              change.
            </p>
            <p className="font-semibold text-blue-700">In Summary</p>
            <p>
              If a plan has meaningfully higher average ratings in CAHPS and Operations measures, then there would be
              good reason to apply a significant amount of resources and focus to the Med Adherence measures and certain
              HEDIS measures in calendar year 2024.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            Contracts at Risk of Losing QBP Due to Member Experience Weight Change
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Contract</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead className="hidden md:table-cell">State</TableHead>
                <TableHead className="text-right">
                  Final Stars 2024 Overall Score
                  <br />
                  <span className="text-xs">Actual | 2-Weight | Difference</span>
                </TableHead>
                <TableHead className="text-right">
                  Final Stars 2024 Overall Rating
                  <br />
                  <span className="text-xs">Actual | 2-Weight | Difference</span>
                </TableHead>
                <TableHead className="text-right">Estimated QBP Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index} className="animate-pulse">
                        <TableCell>
                          <div className="h-4 w-16 bg-muted rounded"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-40 bg-muted rounded"></div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="h-4 w-8 bg-muted rounded"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-32 bg-muted rounded ml-auto"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-32 bg-muted rounded ml-auto"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-24 bg-muted rounded ml-auto"></div>
                        </TableCell>
                      </TableRow>
                    ))
                : [
                    {
                      contract: "H1537",
                      parent: "UnitedHealth Group, Inc.",
                      state: "PA",
                      scoreActual: 4.76,
                      score2Weight: 4.51,
                      scoreDiff: -0.25,
                      ratingActual: 5,
                      rating2Weight: 4.5,
                      ratingDiff: -0.5,
                      qbpChange: 0,
                    },
                    {
                      contract: "H3416",
                      parent: "HealthPartners UnityPoint Health, Inc.",
                      state: "IA",
                      scoreActual: 4.37,
                      score2Weight: 3.89,
                      scoreDiff: -0.48,
                      ratingActual: 4.5,
                      rating2Weight: 4,
                      ratingDiff: -0.5,
                      qbpChange: 0,
                    },
                    {
                      contract: "H3379",
                      parent: "UnitedHealth Group, Inc.",
                      state: "NY",
                      scoreActual: 3.93,
                      score2Weight: 3.7,
                      scoreDiff: -0.23,
                      ratingActual: 4,
                      rating2Weight: 3.5,
                      ratingDiff: -0.5,
                      qbpChange: -23439000,
                    },
                    {
                      contract: "H3335",
                      parent: "Lifetime Healthcare, Inc.",
                      state: "NY",
                      scoreActual: 4.39,
                      score2Weight: 4.16,
                      scoreDiff: -0.22,
                      ratingActual: 4.5,
                      rating2Weight: 4,
                      ratingDiff: -0.5,
                      qbpChange: 0,
                    },
                    {
                      contract: "H3305",
                      parent: "MVP Health Care, Inc.",
                      state: "NY",
                      scoreActual: 4.44,
                      score2Weight: 3.81,
                      scoreDiff: -0.63,
                      ratingActual: 4.5,
                      rating2Weight: 4,
                      ratingDiff: -0.5,
                      qbpChange: 0,
                    },
                  ].map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.contract}</TableCell>
                      <TableCell>{item.parent}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.state}</TableCell>
                      <TableCell className="text-right">
                        {item.scoreActual.toFixed(2)} | {item.score2Weight.toFixed(2)} |{" "}
                        <span className="text-red-500">{item.scoreDiff.toFixed(2)}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.ratingActual.toFixed(1)} | {item.rating2Weight.toFixed(1)} |{" "}
                        <span className="text-red-500">{item.ratingDiff.toFixed(1)}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.qbpChange === 0 ? (
                          "0"
                        ) : (
                          <span className="text-red-500">${Math.abs(item.qbpChange).toLocaleString()}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
