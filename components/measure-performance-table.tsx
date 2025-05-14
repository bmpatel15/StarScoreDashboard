"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface MeasurePerformance {
  id: string
  contract: string
  parent: string
  state: string
  enrollment: number
  measure2023Rating: number
  measure2024Rating: number
  ratingDifference: number
  stars2024Overall: string
}

export function MeasurePerformanceTable() {
  const [measures, setMeasures] = useState<MeasurePerformance[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setMeasures([
        {
          id: "1",
          contract: "H4054",
          parent: "Provider Partners Health Plans",
          state: "TX",
          enrollment: 1973,
          measure2023Rating: 4.5,
          measure2024Rating: 3.0,
          ratingDifference: -1.5,
          stars2024Overall: "-",
        },
        {
          id: "2",
          contract: "H7273",
          parent: "Banner Medicare Advantage",
          state: "AZ",
          enrollment: 244,
          measure2023Rating: 5.0,
          measure2024Rating: 3.67,
          ratingDifference: -1.33,
          stars2024Overall: "-",
        },
        {
          id: "3",
          contract: "H6351",
          parent: "Liberty Medicare Advantage",
          state: "NC",
          enrollment: 846,
          measure2023Rating: 3.75,
          measure2024Rating: 2.67,
          ratingDifference: -1.08,
          stars2024Overall: "-",
        },
        {
          id: "4",
          contract: "H2737",
          parent: "Health New England Medicare Advantage Plans",
          state: "MA",
          enrollment: 1990,
          measure2023Rating: 4.5,
          measure2024Rating: 3.5,
          ratingDifference: -1.0,
          stars2024Overall: "3.5",
        },
        {
          id: "5",
          contract: "H0876",
          parent: "CCA Health Rhode Island",
          state: "RI",
          enrollment: 289,
          measure2023Rating: 4.5,
          measure2024Rating: 3.5,
          ratingDifference: -1.0,
          stars2024Overall: "-",
        },
        {
          id: "6",
          contract: "H2926",
          parent: "PrimeWest Health",
          state: "MN",
          enrollment: 218,
          measure2023Rating: 4.17,
          measure2024Rating: 3.17,
          ratingDifference: -1.0,
          stars2024Overall: "-",
        },
        {
          id: "7",
          contract: "H4739",
          parent: "First Choice VIP Care",
          state: "SC",
          enrollment: 112,
          measure2023Rating: 4.5,
          measure2024Rating: 3.5,
          ratingDifference: -1.0,
          stars2024Overall: "-",
        },
        {
          id: "8",
          contract: "H0978",
          parent: "SCAN Health Plan",
          state: "NV",
          enrollment: 1297,
          measure2023Rating: 5.0,
          measure2024Rating: 4.0,
          ratingDifference: -1.0,
          stars2024Overall: "3",
        },
        {
          id: "9",
          contract: "H9147",
          parent: "Blue Cross and Blue Shield of North Carolina",
          state: "NC",
          enrollment: 1959,
          measure2023Rating: 3.75,
          measure2024Rating: 2.75,
          ratingDifference: -1.0,
          stars2024Overall: "2.5",
        },
        {
          id: "10",
          contract: "H8166",
          parent: "Highmark Blue Cross Blue Shield",
          state: "DE",
          enrollment: 6160,
          measure2023Rating: 5.0,
          measure2024Rating: 4.0,
          ratingDifference: -1.0,
          stars2024Overall: "4",
        },
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full overflow-auto">
      <Table className="w-full">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead>Contract</TableHead>
            <TableHead className="hidden md:table-cell">Parent</TableHead>
            <TableHead className="hidden md:table-cell">State</TableHead>
            <TableHead className="text-right">Enrollment</TableHead>
            <TableHead className="text-center">
              Measure Rating
              <br />
              2023
            </TableHead>
            <TableHead className="text-center">
              Measure Rating
              <br />
              2024
            </TableHead>
            <TableHead className="text-center">Rating Difference</TableHead>
            <TableHead className="text-center">
              Stars 2024
              <br />
              Overall
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index} className="animate-pulse">
                    <TableCell className="text-center">{index + 1}.</TableCell>
                    <TableCell className="font-medium">
                      <div className="h-4 w-16 bg-muted rounded"></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="h-4 w-40 bg-muted rounded"></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="h-4 w-8 bg-muted rounded"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-16 bg-muted rounded ml-auto"></div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-4 w-12 bg-muted rounded mx-auto"></div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-4 w-12 bg-muted rounded mx-auto"></div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-4 w-16 bg-muted rounded mx-auto"></div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-4 w-12 bg-muted rounded mx-auto"></div>
                    </TableCell>
                  </TableRow>
                ))
            : measures.map((measure, index) => (
                <TableRow
                  key={measure.id}
                  className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <TableCell className="text-center font-medium">{index + 1}.</TableCell>
                  <TableCell className="font-medium">{measure.contract}</TableCell>
                  <TableCell className="hidden md:table-cell">{measure.parent}</TableCell>
                  <TableCell className="hidden md:table-cell">{measure.state}</TableCell>
                  <TableCell className="text-right">{measure.enrollment.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{measure.measure2023Rating.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{measure.measure2024Rating.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn("font-medium", measure.ratingDifference < 0 ? "text-red-500" : "text-green-500")}
                    >
                      {measure.ratingDifference.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-md text-sm",
                        measure.stars2024Overall === "-"
                          ? "bg-gray-100"
                          : Number.parseFloat(measure.stars2024Overall) >= 4
                            ? "bg-green-100 text-green-800"
                            : Number.parseFloat(measure.stars2024Overall) >= 3
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800",
                      )}
                    >
                      {measure.stars2024Overall}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}
