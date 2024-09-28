import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';


const AttendanceChart = ({ dates, percentages, avgPercentages }) => {
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

    useEffect(() => {

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
                    lineTension: 0.4,
                },
                {
                    label: "daily average Percentage",
                    data: avgPercentages,
                    borderColor: "rgb(255, 0, 192)",
                    fill: true,
                    backgroundColor: "rgba(255, 102, 102, 0.9)",
                    lineTension: 0.4,
                },
            ],
            
        });
    },[dates]);

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <div > {/* Set height for the chart */}
                <Line data={lineChartData} height={"45%"} width={"100%"}/>
            </div>
        </div>
    );
};

export default AttendanceChart;
