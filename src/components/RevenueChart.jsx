import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const RevenueChart = ({ revenue }) => {

    const chartData = {

        labels: ["Monthly Revenue", "Total Revenue"],

        datasets: [

            {

                label: "Revenue (₹)",

                data: [

                    revenue?.monthlyRevenue || 0,

                    revenue?.totalRevenue || 0

                ],

                backgroundColor: [

                    "#10b981",

                    "#2563eb"

                ],

                borderRadius: 8

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                beginAtZero: true

            }

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">

            <h2 className="text-xl font-semibold text-slate-800 mb-6">

                Revenue Analytics

            </h2>

            <Bar

                data={chartData}

                options={options}

            />

        </div>

    );

};

export default RevenueChart;