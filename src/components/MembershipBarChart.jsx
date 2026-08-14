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

const MembershipBarChart = ({ data }) => {

    const chartData = {

        labels: data.map(item => item.planName),

        datasets: [

            {

                label: "Members",

                data: data.map(item => item.memberCount),

                backgroundColor: "#2563eb",

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

                Membership Distribution

            </h2>

            <Bar
                data={chartData}
                options={options}
            />

        </div>

    );

};

export default MembershipBarChart;