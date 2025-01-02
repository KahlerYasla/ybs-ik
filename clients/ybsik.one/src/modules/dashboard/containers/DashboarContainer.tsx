import React from "react"
import { Line, Bar, Pie, Doughnut, Radar } from "react-chartjs-2"
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
    const primaryColor = "#4A90E2"

    const lineData = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "Applications Over Time",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: primaryColor,
                borderColor: primaryColor,
            },
        ],
    }

    const barData = {
        labels: ["HR", "Engineering", "Sales", "Marketing", "Finance"],
        datasets: [
            {
                label: "Applications by Department",
                data: [12, 19, 3, 5, 2],
                backgroundColor: primaryColor,
            },
        ],
    }

    const pieData = {
        labels: ["Accepted", "Rejected", "Pending"],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [primaryColor, "#FF6384", "#FFCE56"],
            },
        ],
    }

    const doughnutData = {
        labels: ["Full-time", "Part-time", "Internship"],
        datasets: [
            {
                data: [200, 150, 50],
                backgroundColor: [primaryColor, "#36A2EB", "#FFCE56"],
            },
        ],
    }

    const radarData = {
        labels: [
            "Communication",
            "Technical Skills",
            "Experience",
            "Education",
            "Cultural Fit",
        ],
        datasets: [
            {
                label: "Candidate Skills",
                data: [2, 3, 4, 5, 3],
                backgroundColor: "rgba(74, 144, 226, 0.2)",
                borderColor: primaryColor,
                pointBackgroundColor: primaryColor,
            },
        ],
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <Line data={lineData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <Bar data={barData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <Pie data={pieData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <Doughnut data={doughnutData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <Radar data={radarData} />
                </div>
            </div>
        </div>
    )
}

export default DashboardContainer
