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
                if (!response) {
                    throw new Error("Failed to fetch bar chart data");
                }
                const labels = response.map(
                    (task) => `${task.completedAtDate} - ${task.taskName}`
                );
                const scores = response.map((task) => task.performanceScore);

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
                if (!response) {
                    throw new Error("Failed to fetch doughnut chart data");
                }
                setDoughnutData({
                    labels: ["Completed", "In-Progress", "Pending"],
                    datasets: [
                        {
                            label: "Task Status",
                            data: [response.COMPLETED, response.IN_PROGRESS, response.PENDING],
                            backgroundColor: [
                                "rgba(75, 192, 192, 0.7)",
                                "rgba(255, 206, 86, 0.7)",
                                "rgba(255, 99, 132, 0.7)",
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
        <div className="bg-gray-100 p-[0.833vw]">
            <h1 className="text-[1.042vw] font-bold text-center mb-[0.833vw]">Dashboard Charts</h1>
            <div className="grid grid-rows-2 gap-[0.833vw] max-w-[46.667vw] mx-auto">
                <div className="bg-white shadow-lg rounded-[0.417vw] p-[0.833vw]">
                    <h2 className="text-[0.729vw] font-semibold text-gray-700 mb-[0.417vw]">Bar Chart</h2>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : barData ? (
                        <div className="h-[10vw]">
                            <Bar
                                data={barData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false
                                        }
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <div className="bg-white shadow-lg rounded-[0.417vw] p-[0.833vw]">
                    <h2 className="text-[0.729vw] font-semibold text-gray-700 mb-[0.417vw]">
                        Doughnut Chart
                    </h2>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : doughnutData ? (
                        <div className="h-[10vw]">
                            <Doughnut
                                data={doughnutData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false
                                }}
                            />
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