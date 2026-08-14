import { useEffect, useState } from "react";

import { getRevenue } from "../../api/reportApi";

import RevenueChart from "../../components/RevenueChart";

const Revenue = () => {

    const [revenue, setRevenue] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadRevenue();

    }, []);

    const loadRevenue = async () => {

        try {

            const data = await getRevenue();

            setRevenue(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-96">

                <h2 className="text-xl font-semibold">

                    Loading Revenue...

                </h2>

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Revenue Analytics

                </h1>

                <p className="text-slate-500 mt-2">

                    Revenue summary of your gym.

                </p>

            </div>

            {/* Revenue Cards */}

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl shadow border border-slate-200 p-6">

                    <p className="text-slate-500">

                        Total Revenue

                    </p>

                    <h2 className="text-4xl font-bold text-emerald-600 mt-3">

                        ₹ {revenue.totalRevenue}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow border border-slate-200 p-6">

                    <p className="text-slate-500">

                        Monthly Revenue

                    </p>

                    <h2 className="text-4xl font-bold text-blue-600 mt-3">

                        ₹ {revenue.monthlyRevenue}

                    </h2>

                </div>

            </div>

            <RevenueChart

                revenue={revenue}

            />

        </div>

    );

};

export default Revenue;