import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Loading from './Loading';
import OverlayLoading from './OvellayLoading';


const AttendanceChart = ({ dates, percentages, avgPercentages, loading }) => {
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
                    fill: false,
                    backgroundColor: "rgba(62, 149, 205, 0.1)",
                    lineTension: 0.4,
                    borderColor: 'rgba(75, 192, 192, 1)'
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
    }, [dates]);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };


    return (
        <>
            
            <div className="p-4 bg-white shadow-lg rounded-lg relative">
            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                    {loading && <OverlayLoading />}

                    <Line data={lineChartData} options={options} />
                </div>
            </div>
        </>
    );
};

export default AttendanceChart;
