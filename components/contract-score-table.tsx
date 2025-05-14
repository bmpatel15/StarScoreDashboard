"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface Contract {
  id: string
  contract: string
  parent: string
  enrollment: number
  stars2023Score: number
  stars2024Score: number
  scoreDifference: number
}
export function ContractScoreTable() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setContracts([
        {
          id: "1",
          contract: "H5549",
          parent: "Visiting Nurse Service of New York",
          enrollment: 6719,
          stars2023Score: 4.66,
          stars2024Score: 3.36,
          scoreDifference: -1.43,
        },
        {
          id: "2",
          contract: "H1170",
          parent: "Kaiser Foundation Health Plan, Inc.",
          enrollment: 38077,
          stars2023Score: 4.78,
          stars2024Score: 3.47,
          scoreDifference: -1.39,
        },
        {
          id: "3",
          contract: "H2172",
          parent: "Kaiser Foundation Health Plan, Inc.",
          enrollment: 111616,
          stars2023Score: 4.76,
          stars2024Score: 3.56,
          scoreDifference: -1.2,
        },
        {
          id: "4",
          contract: "H2032",
          parent: "Baylor Scott & White Holdings",
          enrollment: 2559,
          stars2023Score: 4.66,
          stars2024Score: 3.82,
          scoreDifference: -1.11,
        },
        {
          id: "5",
          contract: "H1230",
          parent: "Kaiser Foundation Health Plan, Inc.",
          enrollment: 35777,
          stars2023Score: 4.83,
          stars2024Score: 3.87,
          scoreDifference: -1.02,
        },
        {
          id: "6",
          contract: "H3800",
          parent: "Rifkin Managed Care Holding, LLC",
          enrollment: 1375,
          stars2023Score: 3.77,
          stars2024Score: 2.98,
          scoreDifference: -1.01,
        },
        {
          id: "7",
          contract: "H5050",
          parent: "Kaiser Foundation Health Plan, Inc.",
          enrollment: 98891,
          stars2023Score: 4.38,
          stars2024Score: 3.42,
          scoreDifference: -1.01,
        },
        {
          id: "8",
          contract: "H9808",
          parent: "HTA Holdings, LLC",
          enrollment: 14788,
          stars2023Score: 4.83,
          stars2024Score: 3.92,
          scoreDifference: -0.99,
        },
        {
          id: "9",
          contract: "H0524",
          parent: "Kaiser Foundation Health Plan, Inc.",
          enrollment: 1374891,
          stars2023Score: 4.76,
          stars2024Score: 3.78,
          scoreDifference: -0.98,
        },
        {
          id: "10",
          contract: "H7115",
          parent: "Memorial Hermann Health System",
          enrollment: 6641,
          stars2023Score: 3.99,
          stars2024Score: 3.25,
          scoreDifference: -0.91,
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
            <TableHead className="text-right">Enrollment</TableHead>
            <TableHead className="text-right">Stars 2023 Score</TableHead>
            <TableHead className="text-right">Stars 2024 Score</TableHead>
            <TableHead className="text-right">Score Difference</TableHead>
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
                    <TableCell className="text-right">
                      <div className="h-4 w-16 bg-muted rounded ml-auto"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-12 bg-muted rounded ml-auto"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-12 bg-muted rounded ml-auto"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-16 bg-muted rounded ml-auto"></div>
                    </TableCell>
                  </TableRow>
                ))
            : contracts.map((contract, index) => (
                <TableRow
                  key={contract.id}
                  className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <TableCell className="text-center font-medium">{index + 1}.</TableCell>
                  <TableCell className="font-medium">{contract.contract}</TableCell>
                  <TableCell className="hidden md:table-cell">{contract.parent}</TableCell>
                  <TableCell className="text-right">{contract.enrollment.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{contract.stars2023Score.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{contract.stars2024Score.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn("font-medium", contract.scoreDifference < 0 ? "text-red-500" : "text-green-500")}
                    >
                      {contract.scoreDifference.toFixed(2)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}
