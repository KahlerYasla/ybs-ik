import React from "react"
import { Line, Bar, Pie, Radar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js"

import useApplicationStore from "../../application/hooks/useApplication"

// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    Tooltip,
    Legend
)

const DashboardContainer: React.FC = () => {
    const { applications } = useApplicationStore()

    const crayonColors = {
        yellow: "#003f5c",
        pink: "#58508d",
        blue: "#bc5090",
        green: "#ff6361",
        purple: "#ffa600",
    }

    const statusCounts = applications.reduce(
        (acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1
            return acc
        },
        { approved: 0, pending: 0, rejected: 0 }
    )

    const fieldCounts = applications.reduce((acc, app) => {
        acc[app.field] = (acc[app.field] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const experienceData = applications.map((app) => app.experience)

    const lineData = {
        labels: applications.map((app) => app.name),
        datasets: [
            {
                label: "Experience Over Time",
                data: experienceData,
                fill: true,
                backgroundColor: `${crayonColors.yellow}33`, // Semi-transparent
                borderColor: crayonColors.yellow,
                pointBackgroundColor: crayonColors.pink,
            },
        ],
    }

    const barData = {
        labels: Object.keys(fieldCounts),
        datasets: [
            {
                label: "Applications by Field",
                data: Object.values(fieldCounts),
                backgroundColor: [
                    crayonColors.pink,
                    crayonColors.blue,
                    crayonColors.green,
                    crayonColors.yellow,
                    crayonColors.purple,
                ],
            },
        ],
    }

    const pieData = {
        labels: ["Approved", "Pending", "Rejected"],
        datasets: [
            {
                data: [
                    statusCounts.approved,
                    statusCounts.pending,
                    statusCounts.rejected,
                ],
                backgroundColor: [
                    crayonColors.green,
                    crayonColors.pink,
                    crayonColors.blue,
                ],
            },
        ],
    }

    const ageData = {
        labels: ["Under 25", "25-30", "30-35", "35-40", "40+"],
        datasets: [
            {
                label: "Age Distribution",
                data: [
                    applications.filter((app) => app.age < 25).length,
                    applications.filter((app) => app.age >= 25 && app.age <= 30)
                        .length,
                    applications.filter((app) => app.age > 30 && app.age <= 35)
                        .length,
                    applications.filter((app) => app.age > 35 && app.age <= 40)
                        .length,
                    applications.filter((app) => app.age > 40).length,
                ],
                backgroundColor: [
                    crayonColors.blue,
                    crayonColors.green,
                    crayonColors.pink,
                    crayonColors.yellow,
                    crayonColors.purple,
                ],
            },
        ],
    }

    const radarData = {
        labels: Object.keys(fieldCounts),
        datasets: [
            {
                label: "Experience vs Field",
                data: Object.keys(fieldCounts).map((field) =>
                    applications.reduce((acc, app) => {
                        if (app.field === field) {
                            acc += app.experience
                        }
                        return acc
                    }, 0)
                ),
                backgroundColor: `${crayonColors.yellow}33`, // Semi-transparent
                borderColor: crayonColors.yellow,
            },
        ],
    }

    // Project-based Bar Chart
    const barProjectData = {
        labels: [...new Set(applications.map((app) => app.appliedProject))],
        datasets: [
            {
                label: "Applications by Project",
                data: applications.reduce((acc, app) => {
                    acc[app.appliedProject] = (acc[app.appliedProject] || 0) + 1
                    return acc
                }, {} as Record<string, number>),
                backgroundColor: [
                    crayonColors.pink,
                    crayonColors.blue,
                    crayonColors.green,
                    crayonColors.yellow,
                    crayonColors.purple,
                ],
            },
        ],
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Application Metrics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                <div className="bg-white p-16 border">
                    <Line data={lineData} />
                </div>
                <div className="bg-white p-16 border">
                    <Bar data={barData} />
                </div>
                <div className="bg-white p-16 border">
                    <Pie data={pieData} />
                </div>
                <div className="bg-white p-16 border">
                    <Bar data={ageData} />
                </div>
                <div className="bg-white p-16 border">
                    <Radar data={radarData} />
                </div>
                <div className="bg-white p-16 border">
                    <Bar data={barProjectData} />
                </div>
            </div>
        </div>
    )
}

export default DashboardContainer
