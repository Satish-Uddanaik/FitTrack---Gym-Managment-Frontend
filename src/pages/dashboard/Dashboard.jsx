import { useEffect, useState } from "react";

import DashboardCards from "../../components/DashboardCard";

import { getDashboardReport } from "../../api/reportApi";

import MemberStatusChart from "../../components/MemberStatusChart";

import { getMemberStatus } from "../../api/reportApi";

const Dashboard = () => {

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    const [statusData, setStatusData] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardReport();

            setReport(data);

            const report = await getDashboardReport();

            setReport(report);

            const status = await getMemberStatus();

            setStatusData(status);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-96">

                <h2 className="text-xl font-semibold">

                    Loading Dashboard...

                </h2>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <DashboardCards report={report} />

         <MemberStatusChart data={statusData} />
        </div>

    );

};

export default Dashboard;

