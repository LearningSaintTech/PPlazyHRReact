import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { fetchBarData, fetchDoughnutData } from "../../commonComponent/Api";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
);

const TaskGraph = () => {
    const [barData, setBarData] = useState(null);
    const [doughnutData, setDoughnutData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data for the Bar Chart
        fetchBarData(2)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch bar chart data");
                }
                return response.json();
            })
            .then((data) => {
                const labels = data.map(
                    (task) => `${task.completedAtDate} - ${task.taskName}`
                );
                const scores = data.map((task) => task.performanceScore);

                setBarData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Performance Score",
                            data: scores,
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4CAF50",
                                "#FF9800",
                                "#2b0c9c",
                                "#09e310",
                                "#fafa0a",
                                "#fa0a86",
                                "#6906ba",
                            ],
                            borderColor: "#ffffff",
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((err) => {
                console.error("Error fetching bar chart data:", err);
                setError(err.message);
            });

        // Fetch data for the Doughnut Chart
        fetchDoughnutData(2)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch doughnut chart data");
                }
                return response.json();
            })
            .then((data) => {
                setDoughnutData({
                    labels: ["Completed", "In-Progress", "Pending"],
                    datasets: [
                        {
                            label: "Task Status",
                            data: [data.COMPLETED, data.IN_PROGRESS, data.PENDING],
                            backgroundColor: [
                                "rgba(75, 192, 192, 0.7)", // Completed: Green
                                "rgba(255, 206, 86, 0.7)", // In-Progress: Yellow
                                "rgba(255, 99, 132, 0.7)", // Pending: Red
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((err) => {
                console.error("Error fetching doughnut chart data:", err);
                setError(err.message);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Dashboard Charts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Bar Chart</h2>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : barData ? (
                        <div className="chart-container">
                            <Bar data={barData} />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Doughnut Chart
                    </h2>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : doughnutData ? (
                        <div className="chart-container">
                            <Doughnut data={doughnutData} />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskGraph;
