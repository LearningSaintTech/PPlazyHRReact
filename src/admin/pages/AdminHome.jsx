import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, setYear } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Search, Download, User, Users, UserCheck, UserX } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Sector } from "recharts";
import AdminSideBar from "../component/AdminSidebar";
import AdminHeader from "../component/AdminHeader";
import { Card, CardHeader, CardTitle, CardContent } from '../component/ui/Card';
import { getTotalEmployee, getTotalAbsentEmployee } from "../../commonComponent/Api"; // Adjust path as needed

const AdminPage = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    day: "Sunday",
    time: "00:00:00",
    period: "AM",
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [absentEmployees, setAbsentEmployees] = useState(0);
  const [onLeave, setOnLeave] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  // Add available years for selection (you can modify the range as needed)
  const years = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const time = format(now, "HH:mm:ss");
      const period = format(now, "a");
      const day = format(now, "EEEE");
      setCurrentDateTime({ day, time, period });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 

        const totalRes = await getTotalEmployee();
        const absentRes = await getTotalAbsentEmployee();

        const total = totalRes;
        const absent = absentRes;

        setTotalEmployees(total);
        setAbsentEmployees(absent);
        
        if(total==absent)
        {
          setPresentEmployees(0); 

        }
        else
        setPresentEmployees(total - absent - onLeave); 

        setOnLeave(absent);

      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, [onLeave]);
  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600",
    },
    {
      title: "Employees Present",
      value: presentEmployees,
      icon: UserCheck,
      color: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600",
    },
    {
      title: "Employees Absent",
      value: absentEmployees,
      icon: UserX,
      color: "bg-gradient-to-br from-red-50 to-red-100 text-red-600",
    },
    {
      title: "On Leave",
      value: onLeave,
      icon: User,
      color: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600",
    },
  ];

  const chartData = [
    { name: "Total Employees", value: totalEmployees, color: "#818cf8" },
    { name: "Employees Present", value: presentEmployees, color: "#34d399" },
    { name: "Employees Absent", value: absentEmployees, color: "#f87171" },
    { name: "On Leave", value: onLeave, color: "#fbbf24" },
  ];


  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fill="#333"
          className="text-sm font-medium"
        >
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill="#666"
          className="text-sm"
        >
          {`${value} employees`}
        </text>
      </g>
    );
  };

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Add handler for year change
  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    const newDate = setYear(currentDate, newYear);
    setCurrentDate(newDate);
    setSelectedDate(newDate);
  };

  const generateCalendarDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
    const startWeek = start.getDay();

    const prefix = Array.from({ length: (startWeek + 6) % 7 }, (_, i) => (
      <td key={`empty-start-${i}`} className="p-4 text-center text-gray-400"></td>
    ));

    const monthDays = days.map((day) => {
      const isSelected = isSameDay(day, selectedDate);
      const isToday = isSameDay(day, new Date());

      return (
        <td
          key={day.toString()}
          className={`relative p-4 text-center transition-all duration-200 rounded-lg
            ${isSelected ? "bg-indigo-500 text-white shadow-lg scale-105" : ""}
            ${isToday && !isSelected ? "bg-indigo-50" : ""}
            hover:bg-indigo-50 hover:scale-105 cursor-pointer`}
          onClick={() => setSelectedDate(day)}
        >
          {format(day, "d")}
        </td>
      );
    });

    return [...prefix, ...monthDays];
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <AdminSideBar />
      <div className="flex-1 p-[1.667vw] ml-[15.104vw]">
        <AdminHeader
          title="Admin Dashboard"
          avatarSrc="/api/placeholder/35/35"
          showNotification={true}
          showChevron={true}
        />

        <div className="">
          <div className="bg-white rounded-[0.833vw] p-[1.25vw] mb-[1.667vw] transition-all duration-300">
            <div className="flex justify-between items-center p-[1.25vw] border-b border-gray-100">
              <p className="text-gray-600 font-medium">
                Welcome back, <span className="text-indigo-600 font-semibold">Admin</span>
              </p>
              <p className="text-indigo-600 font-medium px-[0.833vw] py-[0.417vw] rounded-full">
                {currentDateTime.day}, {currentDateTime.time} {currentDateTime.period}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-[1.25vw] my-[1.667vw]">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className={`${stat.color} border-none transition-all duration-300 `}>
                    <CardContent className="p-[1.25vw] flex items-center gap-[0.833vw]">
                      <div className="p-[0.625vw] bg-white rounded-[0.417vw] shadow-sm">
                        <Icon className="w-[1.25vw] h-[1.25vw]" />
                      </div>
                      <div>
                        <div className="text-[0.729vw] font-medium mb-[0.208vw]">{stat.title}</div>
                        <div className="text-[1.563vw] font-bold">{stat.value}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-[1.667vw]">
              <Card className="h-[31.25vw] shadow-lg transition-all duration-300 ">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-700">Employee Attendance Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[20.833vw] flex justify-center items-center">
                    <PieChart width={500} height={600}>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="none"
                          />
                        ))}
                      </Pie>
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: "1.042vw" }}
                      />
                    </PieChart>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-[31.25vw] shadow-lg transition-all duration-300">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-700">Employee Calendar</CardTitle>
                </CardHeader>
                <CardContent className="p-[1.25vw]">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-[1.25vw]">
                      <div className="flex items-center gap-[0.833vw]">
                        <h2 className="text-[0.938vw] font-semibold text-gray-700">
                          {format(currentDate, "MMMM")}
                        </h2>
                        <select
                          value={currentDate.getFullYear()}
                          onChange={handleYearChange}
                          className="p-[0.417vw] border rounded-[0.417vw] text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-[0.417vw]">
                        <button
                          className="p-[0.417vw] hover:bg-gray-100 rounded-full transition-colors"
                          onClick={previousMonth}
                        >
                          <ChevronLeft className="w-[0.26vw] h-[0.26vw]" />
                        </button>
                        <button
                          className="p-[0.417vw] hover:bg-gray-100 rounded-full transition-colors"
                          onClick={nextMonth}
                        >
                          <ChevronRight className="w-[0.26vw] h-[0.26vw]" />
                        </button>
                      </div>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr>
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <th
                              key={day}
                              className="p-[0.833vw] text-[0.729vw] font-medium text-gray-600"
                            >
                              {day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 6 }).map((_, weekIndex) => (
                          <tr key={weekIndex}>
                            {generateCalendarDays().slice(weekIndex * 7, (weekIndex + 1) * 7)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;