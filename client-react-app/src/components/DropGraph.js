import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Chart } from "react-chartjs-2";


const DropGraph = ({
    count,
    average,
    standardDeviation,
    curValue,
}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip
    );

    const xmin = 5;
    const xmax = 64;
    const xValues = [];
    for(let i=xmin; i<=xmax; i++){
        xValues.push(i);
    }
    const dataNDLine = {
        type: "line",
        label: "正規分布",
        data: xValues.map((x) => ({x, y:getNormalDistributionVal(x, average, standardDeviation)})),
        borderColor: "#999",
        borderWidth: 3,
        pointRadius: 0,
        fill: false,
        order: 1,
    };
    const dataCurPoint = {
        type: "scatter",
        label: "今の値",
        data: [{x: curValue, y: getNormalDistributionVal(curValue, average, standardDeviation)}],
        borderColor: "rgb(220, 26, 26)",
        backgroundColor: "rgba(200, 26, 26, 0.75)",
        borderWidth: 2,
        pointRadius: 7,
    };
    
    const data = {
        labels: xValues,
        datasets: [
            dataCurPoint,
           dataNDLine,
        ],
        order: 2,
    };

    return (
        <Chart data={data} style={{ backgroundColor : "#eee" }}/>
    );
};

// 正規分布
function getNormalDistributionVal(x, mu, sigma) {
    return (
            1.0 / Math.sqrt(2.0 * Math.PI * (sigma **2))
        )
        * Math.exp(
            -1.0
            * (
                (x - mu) ** 2) / (2.0 * (sigma ** 2)
            )
        );
}


export default DropGraph;
