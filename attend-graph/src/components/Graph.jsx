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
                style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                Plot the Attendance
            </button>
            <div > {/* Set height for the chart */}
                <Line data={lineChartData} height={"45%"} width={"100%"}/>
            </div>
        </div>
    );
};

export default AttendanceChart;
