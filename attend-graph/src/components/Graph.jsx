import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const AttendanceChart = ({ dates, percentages }) => {
    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Percentage",
                data: [],
                borderColor: "rgb(75, 192, 192)",
                fill: true,
                backgroundColor: "rgba(62, 149, 205, 0.1)",
            }
        ]
    });

    const handleScrape = async () => {

        // const { dates, percentages } = await scrapeClassAttendance(userName, password);
        setLineChartData({
            labels: dates,
            datasets: [
                {
                    label: "Percentage",
                    data: percentages,
                    borderColor: "rgb(75, 192, 192)",
                    fill: true,
                    backgroundColor: "rgba(62, 149, 205, 0.1)",
                }
            ]
        });
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <button 
                onClick={handleScrape} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Scrape Attendance Data
            </button>
            <div > {/* Set height for the chart */}
                <Line data={lineChartData} height={"45%"} width={"100%"}/>
            </div>
        </div>
    );
};

export default AttendanceChart;
