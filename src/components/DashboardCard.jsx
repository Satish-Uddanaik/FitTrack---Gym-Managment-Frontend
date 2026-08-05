import React from "react";

const DashboardCard = ({ title, value, color }) => {

    return (

        <div
            className={`bg-white rounded-xl shadow-md border-l-4 ${color}
                        p-6 hover:shadow-lg transition`}
        >

            <h3 className="text-gray-500 text-sm">

                {title}

            </h3>

            <h1 className="text-4xl font-bold mt-3">

                {value}

            </h1>

        </div>

    );

};

export default DashboardCard;