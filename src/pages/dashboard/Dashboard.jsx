import { useEffect, useState } from "react";

import { getDashboard } from "../../api/dashboardApi";

import DashboardCard from "../../components/DashboardCard";

import { toast } from "react-hot-toast";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [recentMembers, setRecentMembers] = useState([]);

    const [dueBills, setDueBills] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const dashboard = await getDashboard();

            const recent = await getRecentMembers();

            const bills = await getUpcomingBills();

            setDashboard(dashboard);

            setRecentMembers(recent);

            setDueBills(bills);

        }

        catch (error) {

            toast.error("Failed to load dashboard");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <h2 className="text-center mt-20">

                Loading Dashboard...

            </h2>

        );

    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">

                Dashboard

            </h1>

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                "
            >

                <DashboardCard

                    title="Total Members"

                    value={dashboard.totalMembers}

                    color="border-blue-600"

                />

                <DashboardCard

                    title="Active Members"

                    value={dashboard.activeMembers}

                    color="border-green-600"

                />

                <DashboardCard

                    title="Inactive Members"

                    value={dashboard.inactiveMembers}

                    color="border-yellow-500"

                />

                <DashboardCard

                    title="Expired Members"

                    value={dashboard.expiredMembers}

                    color="border-red-600"

                />

                <DashboardCard

                    title="Membership Plans"

                    value={dashboard.totalMembershipPlans}

                    color="border-purple-600"

                />

                <DashboardCard

                    title="Due Bills Today"

                    value={dashboard.dueBillsToday}

                    color="border-pink-600"

                />

            </div>

        </div>

    );

};

export default Dashboard;