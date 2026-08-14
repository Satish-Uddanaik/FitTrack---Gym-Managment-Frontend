import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const MemberStatusChart = ({ data }) => {

    const labels = data.map(item => item.status);

    const counts = data.map(item => item.count);

    const chartData = {

        labels,

        datasets: [

            {

                label: "Members",

                data: counts,

                backgroundColor: [

                    "#22c55e",
                    "#ef4444",
                    "#facc15"

                ],

                borderWidth: 1

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                position: "bottom"

            }

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <h2 className="text-xl font-semibold text-slate-800 mb-6">

                Member Status

            </h2>

            <div className="h-[350px] flex justify-center">

                <Pie
                    data={chartData}
                    options={options}
                />

            </div>

        </div>

    );

};

export default MemberStatusChart;