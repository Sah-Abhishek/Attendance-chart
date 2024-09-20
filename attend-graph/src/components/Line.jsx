import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip } from 'chart.js'
// import { lineChartData } from "../assets/FAKE_DATA.js"

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Legend, Title, Tooltip
)


export const LineGraph = () => {
    const options = {};

    
    const data = {};
    
    
    
    
    return<div>
    <Line options={options} data={lineChartData} />
        </div>
}