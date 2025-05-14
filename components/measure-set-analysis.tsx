"use client"

import { useEffect, useRef, useState } from "react"

export function MeasureSetAnalysis() {
  const [isLoading, setIsLoading] = useState(true)
  const chartRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)

      if (typeof window !== "undefined") {
        import("chart.js").then(({ Chart, registerables }) => {
          Chart.register(...registerables)

          const chartConfigs = [
            {
              title: "Stars 2023 5-Star",
              avgScoreChange: -0.37,
              data: [-0.22, -0.05, -0.14, -0.37, -0.05],
            },
            {
              title: "Stars 2023 4.5-Star",
              avgScoreChange: -0.24,
              data: [-0.11, -0.07, -0.11, -0.23, -0.01],
            },
            {
              title: "Stars 2023 4-Star",
              avgScoreChange: -0.15,
              data: [-0.07, -0.04, -0.05, -0.21, -0.08],
            },
            {
              title: "Stars 2023 3.5-Star",
              avgScoreChange: -0,
              data: [0, -0.05, -0.11, -0.21, -0.06],
            },
          ]

          chartRefs.current.forEach((ref, index) => {
            if (ref && index < chartConfigs.length) {
              const config = chartConfigs[index]
              const ctx = document.createElement("canvas")
              ref.appendChild(ctx)

              new Chart(ctx, {
                type: "bar",
                data: {
                  labels: ["CAHPS", "HEDIS", "HOS", "Operations", "Pharmacy"],
                  datasets: [
                    {
                      data: config.data,
                      backgroundColor: "#3b82f6",
                      borderColor: "#2563eb",
                      borderWidth: 1,
                    },
                  ],
                },
                options: {
                  responsive: true,
                  animation: {
                    duration: 800,
                    delay: index * 200,
                    easing: "easeOutQuart",
                  },
                  plugins: {
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
                      suggestedMin: -0.5,
                      suggestedMax: 0.1,
                    },
                  },
                },
              })
            }
          })
        })
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      chartRefs.current.forEach((ref) => {
        if (ref) ref.innerHTML = ""
      })
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-blue-700">
                {isLoading ? (
                  <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                ) : (
                  ["Stars 2023 5-Star", "Stars 2023 4.5-Star", "Stars 2023 4-Star", "Stars 2023 3.5-Star"][index]
                )}
              </h3>
              <div className="text-sm">
                Avg Score Change:{" "}
                {isLoading ? (
                  <div className="inline-block h-4 w-12 bg-muted rounded animate-pulse"></div>
                ) : (
                  <span className="text-red-500 font-medium">{[-0.37, -0.24, -0.15, 0][index]}</span>
                )}
              </div>
            </div>
            <div ref={(el) => (chartRefs.current[index] = el)} className="w-full h-48">
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}
