import React, { useState, useEffect, useRef } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
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

// Register Chart.js components
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

const TaskGraph = () => {
    const [barData, setBarData] = useState(null);
    const [lineData, setLineData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const [doughnutData, setDoughnutData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date().toISOString().split("T")[0];
        return today;
    });
    const [taskChart, setTaskChart] = useState(null);
    const chartRef = useRef(null);

    const taskCountApi = "http://192.168.0.132:8082/user/tasks/count-by-date/2"; // Date-based chart API
    const performanceApi = "http://192.168.0.132:8082/user/tasks/performance/2"; // Bar Chart
    const completionApi =
        "http://192.168.0.132:8082/user/tasks/completionData/all"; // Line Chart
    const statusCountsApi =
        "http://192.168.0.132:8082/user/tasks/statusCounts/2"; // Doughnut Chart
    const pieApi = "http://192.168.0.132:8082/user/tasks/statusCounts"; // Pie Chart

    useEffect(() => {
        // Fetch Bar Chart Data
        fetch(performanceApi)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch bar chart data");
                return response.json();
            })
            .then((data) => {
                const labels = data.map(
                    (task) => `${task.completedAtDate} - ${task.taskName}`
                );
                const scores = data.map((task) => task.performanceScore);
                setBarData({
                    labels,
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
            .catch((err) => setError(err.message));

        // Fetch Line Chart Data
        fetch(completionApi)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch line chart data");
                return response.json();
            })
            .then((data) => {
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

                setLineData({
                    labels: unifiedDates,
                    datasets: [
                        {
                            label: "High Priority",
                            data: mapToUnifiedDates(data.HIGH.dates, data.HIGH.completed),
                            borderColor: "rgba(255, 99, 132, 1)",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            tension: 0.4,
                            fill: false,
                        },
                        {
                            label: "Medium Priority",
                            data: mapToUnifiedDates(
                                data.MEDIUM.dates,
                                data.MEDIUM.completed
                            ),
                            borderColor: "rgba(54, 162, 235, 1)",
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            tension: 0.4,
                            fill: false,
                        },
                        {
                            label: "Low Priority",
                            data: mapToUnifiedDates(data.LOW.dates, data.LOW.completed),
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            tension: 0.4,
                            fill: false,
                        },
                    ],
                });
            })
            .catch((err) => setError(err.message));

        // Fetch Doughnut Chart Data
        fetch(statusCountsApi)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch doughnut chart data");
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
                                "rgba(75, 192, 192, 0.7)",
                                "rgba(255, 206, 86, 0.7)",
                                "rgba(255, 99, 132, 0.7)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((err) => setError(err.message));

        // Fetch Pie Chart Data
        fetch(pieApi)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch pie chart data");
                return response.json();
            })
            .then((data) => {
                setPieData({
                    labels: ["Completed", "In-Progress", "Pending"],
                    datasets: [
                        {
                            label: "Task Status",
                            data: [data.COMPLETED, data.IN_PROGRESS, data.PENDING],
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
            .catch((err) => setError(err.message));
    }, []);

    // Fetch Task Data for Date-Based Chart
    const fetchTaskData = async (date) => {
        try {
            const url = new URL(taskCountApi);
            if (date) url.searchParams.append("date", date);

            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch task data");
            return await response.json();
        } catch (error) {
            console.error("Error fetching task data:", error);
            return null;
        }
    };

    const renderChart = async (date) => {
        const taskData = await fetchTaskData(date);
        if (!taskData) {
            alert("Error fetching task data.");
            return;
        }

        const labels = Object.keys(taskData);
        const data = Object.values(taskData);

        if (taskChart) {
            taskChart.data.labels = labels;
            taskChart.data.datasets[0].data = data;
            taskChart.update();
        } else {
            const ctx = chartRef.current.getContext("2d");
            const newChart = new ChartJS(ctx, {
                type: "bar",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Task Status",
                            data,
                            backgroundColor: "rgba(54, 162, 235, 0.5)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: "Task Name" } },
                        y: { title: { display: true, text: "Task Count" } },
                    },
                },
            });
            setTaskChart(newChart);
        }
    };

    const handleFetchTasks = () => {
        if (!selectedDate) {
            alert("Please select a date.");
            return;
        }
        renderChart(selectedDate);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Dashboard Charts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Bar Chart</h2>
                    {error ? <p className="text-red-500">{error}</p> : barData ? <Bar data={barData} /> : <p>Loading...</p>}
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Line Chart</h2>
                    {error ? <p className="text-red-500">{error}</p> : lineData ? <Line data={lineData} /> : <p>Loading...</p>}
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Pie Chart</h2>
                    {error ? <p className="text-red-500">{error}</p> : pieData ? <Pie data={pieData} /> : <p>Loading...</p>}
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Doughnut Chart</h2>
                    {error ? <p className="text-red-500">{error}</p> : doughnutData ? <Doughnut data={doughnutData} /> : <p>Loading...</p>}
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 mt-8">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                    <label htmlFor="date" className="font-semibold text-gray-700">
                        Select Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        className="border border-gray-300 rounded-md px-2 py-1"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button
                        id="filterButton"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleFetchTasks}
                    >
                        Fetch Tasks
                    </button>
                </div>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default TaskGraph;
