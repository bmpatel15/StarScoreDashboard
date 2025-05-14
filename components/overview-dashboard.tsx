"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Filter, SlidersHorizontal, SortAsc } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContractScoreTable } from "@/components/contract-score-table"
import { ScoreChangeChart } from "@/components/score-change-chart"
import { QbpSummaryCards } from "@/components/qbp-summary-cards"
import { MeasureSetAnalysis } from "@/components/measure-set-analysis"
import { toast } from "sonner"
import { MeasurePerformanceTable } from "@/components/measure-performance-table"
import { RuleImpactAnalysis } from "@/components/rule-impact-analysis"
import { YearOverYearAnalysis } from "@/components/year-over-year-analysis"

export default function OverviewDashboard() {
  const [activeTab, setActiveTab] = useState("overall-score")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = () => {
    toast("Filters applied", {
      description: "The dashboard has been updated with your filter selections.",
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-blue-700">Contract Analysis</h1>
          <p className="text-sm text-muted-foreground">
            Analyze contract performance and star rating changes from 2023 to 2024
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-blue-700">Overall Score Changes by Contract</CardTitle>
            <CardDescription>
              This analysis calculates the actual Stars SCORES for both Stars 2023 and Stars 2024 and compares the two.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="text-sm font-medium">Tailor the Output Using the Filters Below</div>
                <div className="grid grid-cols-2 md:flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Parent Org" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Parents</SelectItem>
                      <SelectItem value="kaiser">Kaiser Foundation</SelectItem>
                      <SelectItem value="uhc">UnitedHealth Group</SelectItem>
                      <SelectItem value="humana">Humana Inc.</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Contract" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Contracts</SelectItem>
                      <SelectItem value="h5549">H5549</SelectItem>
                      <SelectItem value="h1170">H1170</SelectItem>
                      <SelectItem value="h2172">H2172</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="2023 Overall" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4.5">4.5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3.5">3.5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={handleFilterChange}>
                    <Filter className="mr-2 h-4 w-4" />
                    Apply
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QbpSummaryCards />
              </div>

              <div className="rounded-md border">
                <ContractScoreTable />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="score-changes" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="overflow-auto">
              <TabsTrigger value="score-changes">Score Changes</TabsTrigger>
              <TabsTrigger value="measure-analysis">Measure Analysis</TabsTrigger>
              <TabsTrigger value="qbp-analysis">QBP Analysis</TabsTrigger>
              <TabsTrigger value="measure-performance">Measure Performance</TabsTrigger>
              <TabsTrigger value="rule-impact">Rule Impact</TabsTrigger>
              <TabsTrigger value="year-over-year">Year-Over-Year</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <SortAsc className="mr-2 h-4 w-4" />
                Sort
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </div>
          </div>

          <TabsContent value="score-changes" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">Parent/Contract Performance Analysis</CardTitle>
                <CardDescription>
                  Analyze star rating changes and measure performance across different weights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScoreChangeChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measure-analysis" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">
                  Measure Set Score Changes from Stars 2023 to Stars 2024
                </CardTitle>
                <CardDescription>
                  This page breaks down the score changes from Stars 2023 to 2024 by measure set (domain) to show which
                  groups of measures drove the overall rating changes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MeasureSetAnalysis />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qbp-analysis" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">Quality Bonus Payment (QBP) Analyses</CardTitle>
                <CardDescription>
                  Health plans that receive 4+ Stars receive an extra 5% of revenue in the form of Quality Bonus
                  Payments (QBP). The QBP enables plans to offer more competitive and attractive offers in their
                  benefits to attract additional members.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Contracts that Lost QBP</CardTitle>
                      <CardDescription className="text-xs">
                        This analysis shows the contracts that received QBP in Stars 2023 but have dropped out of it in
                        Stars 2024.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="text-center py-4">
                        <div className="text-4xl font-bold text-red-500">61</div>
                        <div className="text-xs text-muted-foreground mt-1">Contracts</div>
                      </div>
                      <div className="text-center py-2">
                        <div className="text-2xl font-semibold text-red-500">3,114,754</div>
                        <div className="text-xs text-muted-foreground mt-1">Enrollment</div>
                      </div>
                      <div className="text-center py-2">
                        <div className="text-xl font-medium text-red-500">$1,868,852,400</div>
                        <div className="text-xs text-muted-foreground mt-1">Approximate QBP Loss</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Contracts that Gained QBP</CardTitle>
                      <CardDescription className="text-xs">
                        This shows the contracts that achieved QBP in Stars 2024 but hadn't in Stars 2023.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="text-center py-4">
                        <div className="text-4xl font-bold text-green-500">38</div>
                        <div className="text-xs text-muted-foreground mt-1">Contracts</div>
                      </div>
                      <div className="text-center py-2">
                        <div className="text-2xl font-semibold text-green-500">4,013,048</div>
                        <div className="text-xs text-muted-foreground mt-1">Enrollment</div>
                      </div>
                      <div className="text-center py-2">
                        <div className="text-xl font-medium text-green-500">$2,407,828,800</div>
                        <div className="text-xs text-muted-foreground mt-1">Approximate QBP Gain</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measure-performance" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">Measure Performance Analysis by Contract</CardTitle>
                <CardDescription>
                  Which contracts dropped the most this year in the measures that you support? This analysis allows you
                  to focus on specific measure (or groups of measures) performance from Stars 2023 to Stars 2024.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MeasurePerformanceTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rule-impact" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">
                  Final Rule Impact - Member Experience Weight Change
                </CardTitle>
                <CardDescription>
                  This analysis looks at the overall impact of the Member Experience weight change that happens in Stars
                  2026 and shows the impact it would have made to each parent organization if the change was applied to
                  Stars 2024.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RuleImpactAnalysis />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="year-over-year" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">Year-Over-Year Measure Performance Analysis</CardTitle>
                <CardDescription>
                  This analysis identifies the measure score change from Stars 2023 to Stars 2024.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <YearOverYearAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
