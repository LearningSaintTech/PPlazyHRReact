import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { showCharts, fetchPieData } from "../../commonComponent/Api";
import { TbGraph } from "react-icons/tb";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import AdminHeader from "../component/AdminHeader";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

const TaskPerformance = ({ onClose }) => {
    const [lineData, setLineData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch Line Chart Data
        const fetchLineData = async () => {
            try {
                const data = await showCharts();
                const allDates = new Set([
                    ...data.HIGH.dates,
                    ...data.MEDIUM.dates,
                    ...data.LOW.dates,
                ]);
                const unifiedDates = Array.from(allDates).sort();

                const mapToUnifiedDates = (dates, completed) => {
                    const dateCompletionMap = {};
                    dates.forEach((date, index) => {
                        dateCompletionMap[date] = completed[index];
                    });

                    return unifiedDates.map((date) => dateCompletionMap[date] || 0);
                };

                const highData = mapToUnifiedDates(
                    data.HIGH.dates,
                    data.HIGH.completed
                );
                const mediumData = mapToUnifiedDates(
                    data.MEDIUM.dates,
                    data.MEDIUM.completed
                );
                const lowData = mapToUnifiedDates(data.LOW.dates, data.LOW.completed);

                setLineData({
                    labels: unifiedDates,
                    datasets: [
                        {
                            label: "High Priority",
                            data: highData,
                            borderColor: "rgba(255, 99, 132, 1)",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(255, 99, 132, 1)",
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            tension: 0.4,
                            fill: false,
                        },
                        {
                            label: "Medium Priority",
                            data: mediumData,
                            borderColor: "rgba(54, 162, 235, 1)",
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(54, 162, 235, 1)",
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            tension: 0.4,
                            fill: false,
                        },
                        {
                            label: "Low Priority",
                            data: lowData,
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(75, 192, 192, 1)",
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            tension: 0.4,
                            fill: false,
                        },
                    ],
                });
            } catch (err) {
                console.error("Error fetching line chart data:", err);
                setError(err.message);
            }
        };

        // Fetch Pie Chart Data
        const fetchPieDataHandler = async () => {
            try {
                const response = await fetchPieData();
                setPieData({
                    labels: ["Completed", "In-Progress", "Pending"],
                    datasets: [
                        {
                            label: "Task Status",
                            data: [response.COMPLETED, response.IN_PROGRESS, response.PENDING],
                            backgroundColor: [
                                "rgba(75, 192, 192, 0.7)", // Completed: Green
                                "rgba(255, 206, 86, 0.7)", // In-Progress: Yellow
                                "rgba(255, 99, 132, 0.7)", // Pending: Red
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching task status counts:", error);
                setError(error.message);
            }
        };

        fetchLineData();
        fetchPieDataHandler();
    }, []);

    return (
        <div className="bg-gray-100 p-[1.25vw] overflow-y-auto max-h-[100vh] rounded-[0.417vw] shadow-lg">
            <AdminHeader />
            <button
                className="flex items-center gap-[0.417vw] text-[#534feb] font-medium mt-[0.417vw]"
                onClick={onClose}
            >
                <TbGraph className="w-[1.042vw] h-[1.042vw]" />
                <span>Back</span>
            </button>
            <h1 className="text-[1.563vw] font-bold text-center mb-[1.25vw]">Dashboard Charts</h1>
            <div className="grid grid-rows-1 gap-[1.667vw]">
                <div className="bg-white shadow-lg rounded-[0.417vw] p-[0.833vw]">
                    <h2 className="text-[0.833vw] font-semibold text-gray-700 mb-[0.833vw]">
                        Line Chart
                    </h2>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : lineData ? (
                        <div className="h-[15vw]">
                            <Line
                                data={lineData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: (tooltipItem) => {
                                                    return ` ${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                                                },
                                            },
                                        },
                                    },
                                    scales: {
                                        x: {
                                            title: {
                                                display: true,
                                                text: "Task Timeline",
                                                font: {
                                                    size: 14,
                                                    weight: "bold",
                                                },
                                            },
                                        },
                                        y: {
                                            title: {
                                                display: true,
                                                text: "Number of Tasks",
                                                font: {
                                                    size: 14,
                                                    weight: "bold",
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="bg-white shadow-lg rounded-[0.417vw] p-[0.833vw]">
                    <h2 className="text-[1.042vw] font-semibold text-gray-700 mb-[0.833vw]">
                        Pie Chart
                    </h2>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : pieData ? (
                        <div className="h-[13.333vw]">
                            <Pie
                                data={pieData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
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

export default TaskPerformance;
