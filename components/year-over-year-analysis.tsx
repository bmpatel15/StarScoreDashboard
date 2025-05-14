"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface YearOverYearData {
  id: string
  contract: string
  organization: string
  measure: string
  set: string
  enrollment: number
  s23Score: number
  s24Score: number
  scoreDifference: number
}

export function YearOverYearAnalysis() {
  const [data, setData] = useState<YearOverYearData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setData([
        {
          id: "1",
          contract: "H1170",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part D)",
          set: "Operations",
          enrollment: 38077,
          s23Score: 98,
          s24Score: 25,
          scoreDifference: -73,
        },
        {
          id: "2",
          contract: "H2172",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part D)",
          set: "Operations",
          enrollment: 111616,
          s23Score: 98,
          s24Score: 25,
          scoreDifference: -73,
        },
        {
          id: "3",
          contract: "H0630",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part D)",
          set: "Operations",
          enrollment: 112856,
          s23Score: 98,
          s24Score: 27,
          scoreDifference: -71,
        },
        {
          id: "4",
          contract: "H0524",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part D)",
          set: "Operations",
          enrollment: 1374891,
          s23Score: 98,
          s24Score: 29,
          scoreDifference: -69,
        },
        {
          id: "5",
          contract: "H1230",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part D)",
          set: "Operations",
          enrollment: 35777,
          s23Score: 98,
          s24Score: 29,
          scoreDifference: -69,
        },
        {
          id: "6",
          contract: "H5050",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part D)",
          set: "Operations",
          enrollment: 98891,
          s23Score: 98,
          s24Score: 29,
          scoreDifference: -69,
        },
        {
          id: "7",
          contract: "H9003",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part D)",
          set: "Operations",
          enrollment: 103409,
          s23Score: 98,
          s24Score: 29,
          scoreDifference: -69,
        },
        {
          id: "8",
          contract: "H1170",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part C)",
          set: "Operations",
          enrollment: 38077,
          s23Score: 98,
          s24Score: 39,
          scoreDifference: -59,
        },
        {
          id: "9",
          contract: "H2172",
          organization: "Kaiser Permanente",
          measure: "Call Center - FFI / TTY (Part C)",
          set: "Operations",
          enrollment: 111616,
          s23Score: 98,
          s24Score: 39,
          scoreDifference: -59,
        },
        {
          id: "10",
          contract: "H5117",
          organization: "Wellcare by Allwell",
          measure: "Med Rec Post-Discharge",
          set: "HEDIS",
          enrollment: 271,
          s23Score: 83,
          s24Score: 25,
          scoreDifference: -58,
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
            <TableHead>Contract</TableHead>
            <TableHead className="hidden md:table-cell">Organization</TableHead>
            <TableHead>Measure</TableHead>
            <TableHead className="hidden md:table-cell">Set</TableHead>
            <TableHead className="text-right">Enrollment</TableHead>
            <TableHead className="text-center">S23 Score</TableHead>
            <TableHead className="text-center">S24 Score</TableHead>
            <TableHead className="text-center">Score Difference</TableHead>
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
                    <TableCell className="hidden md:table-cell">
                      <div className="h-4 w-40 bg-muted rounded"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-40 bg-muted rounded"></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-20 bg-muted rounded ml-auto"></div>
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
                  </TableRow>
                ))
            : data.map((item) => (
                <TableRow key={item.id} className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <TableCell className="font-medium">{item.contract}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.organization}</TableCell>
                  <TableCell>{item.measure}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.set}</TableCell>
                  <TableCell className="text-right">{item.enrollment.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.s23Score}</TableCell>
                  <TableCell className="text-center">{item.s24Score}</TableCell>
                  <TableCell className="text-center">
                    <span className={cn("font-medium", item.scoreDifference < 0 ? "text-red-500" : "text-green-500")}>
                      {item.scoreDifference}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}
