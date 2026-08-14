import { useEffect, useState } from "react";
import { getMembershipStats } from "../../api/reportApi";
import MembershipBarChart from "../../components/MembershipBarChart";

const Reports = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const res = await getMembershipStats();

            setData(res);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="flex justify-center items-center h-96">
                <h2 className="text-xl font-semibold">
                    Loading Reports...
                </h2>
            </div>
        );

    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">
                    Reports & Analytics
                </h1>

                <p className="text-slate-500 mt-2">
                    Membership statistics and analytics.
                </p>

            </div>

            <MembershipBarChart data={data} />

        </div>

    );

};

export default Reports;