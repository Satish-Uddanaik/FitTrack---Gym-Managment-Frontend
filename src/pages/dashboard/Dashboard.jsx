// 5. Dashboard.jsx
import { useEffect, useState } from "react";
import {
    Users,
    UserCheck,
    UserX,
    CreditCard,
    Receipt,
    RefreshCw
} from "lucide-react";
import { getDashboard } from "../../api/dashboardApi";

const Dashboard = () => {
    const [data, setData] = useState({
        totalMembers: 0,
        activeMembers: 0,
        inactiveMembers: 0,
        expiredMembers: 0,
        totalMembershipPlans: 0,
        dueBillsToday: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await getDashboard();
            setData(response);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const cards = [
        {
            title: "Total Members",
            value: data.totalMembers,
            icon: Users,
            iconBg: "bg-blue-50 border border-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Active Members",
            value: data.activeMembers,
            icon: UserCheck,
            iconBg: "bg-emerald-50 border border-emerald-100",
            iconColor: "text-emerald-600",
        },
        {
            title: "Expired Members",
            value: data.expiredMembers,
            icon: UserX,
            iconBg: "bg-rose-50 border border-rose-100",
            iconColor: "text-rose-600",
        },
        {
            title: "Due Bills Today",
            value: data.dueBillsToday,
            icon: Receipt,
            iconBg: "bg-amber-50 border border-amber-100",
            iconColor: "text-amber-600",
        },
        {
            title: "Inactive Members",
            value: data.inactiveMembers,
            icon: UserX,
            iconBg: "bg-slate-100 border border-slate-200",
            iconColor: "text-slate-600",
        },
        {
            title: "Membership Plans",
            value: data.totalMembershipPlans,
            icon: CreditCard,
            iconBg: "bg-violet-50 border border-violet-100",
            iconColor: "text-violet-600",
        },
    ];

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading dashboard analytics...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Real-time metrics and operational status for your gym.
                    </p>
                </div>

                <button
                    onClick={loadDashboard}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-xs transition-all active:scale-95"
                >
                    <RefreshCw className="w-4 h-4 text-slate-500" />
                    <span>Refresh Data</span>
                </button>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="px-5 py-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    {error}
                </div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.title}
                            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 group flex flex-col justify-between"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {card.title}
                                    </p>
                                    <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight group-hover:text-blue-600 transition-colors">
                                        {card.value}
                                    </h2>
                                </div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}>
                                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Member Overview */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900">
                        Member Overview
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Proportional distribution of active vs inactive members
                    </p>

                    <div className="mt-6 space-y-6">
                        {/* Active */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-700">
                                    Active Members
                                </span>
                                <span className="text-sm font-bold text-emerald-600">
                                    {data.activeMembers}
                                </span>
                            </div>
                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                    style={{
                                        width:
                                            data.totalMembers > 0
                                                ? `${(data.activeMembers / data.totalMembers) * 100}%`
                                                : "0%"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Inactive */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-700">
                                    Inactive Members
                                </span>
                                <span className="text-sm font-bold text-slate-600">
                                    {data.inactiveMembers}
                                </span>
                            </div>
                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                                <div
                                    className="h-full bg-slate-400 rounded-full transition-all duration-500"
                                    style={{
                                        width:
                                            data.totalMembers > 0
                                                ? `${(data.inactiveMembers / data.totalMembers) * 100}%`
                                                : "0%"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Expired */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-700">
                                    Expired Members
                                </span>
                                <span className="text-sm font-bold text-rose-600">
                                    {data.expiredMembers}
                                </span>
                            </div>
                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                                <div
                                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                                    style={{
                                        width:
                                            data.totalMembers > 0
                                                ? `${(data.expiredMembers / data.totalMembers) * 100}%`
                                                : "0%"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Summary */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900">
                        Quick Summary
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Key action items requiring attention today
                    </p>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50/60 border border-blue-100 rounded-xl transition-all hover:bg-blue-50">
                            <div className="flex items-center gap-3.5">
                                <div className="p-2 bg-blue-100/80 rounded-lg text-blue-600">
                                    <Users className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">
                                    Total Registered Members
                                </span>
                            </div>
                            <span className="font-extrabold text-blue-600 text-base">
                                {data.totalMembers}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-amber-50/60 border border-amber-100 rounded-xl transition-all hover:bg-amber-50">
                            <div className="flex items-center gap-3.5">
                                <div className="p-2 bg-amber-100/80 rounded-lg text-amber-600">
                                    <Receipt className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">
                                    Bills Due Today
                                </span>
                            </div>
                            <span className="font-extrabold text-amber-600 text-base">
                                {data.dueBillsToday}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-violet-50/60 border border-violet-100 rounded-xl transition-all hover:bg-violet-50">
                            <div className="flex items-center gap-3.5">
                                <div className="p-2 bg-violet-100/80 rounded-lg text-violet-600">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">
                                    Active Membership Plans
                                </span>
                            </div>
                            <span className="font-extrabold text-violet-600 text-base">
                                {data.totalMembershipPlans}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

// import { useEffect, useState } from "react";
// import {
//     Users,
//     UserCheck,
//     UserX,
//     CreditCard,
//     Receipt,
//     RefreshCw
// } from "lucide-react";

// import { getDashboard } from "../../api/dashboardApi";


// const Dashboard = () => {

//     const [data, setData] = useState({
//         totalMembers: 0,
//         activeMembers: 0,
//         inactiveMembers: 0,
//         expiredMembers: 0,
//         totalMembershipPlans: 0,
//         dueBillsToday: 0,
//     });

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");


//     const loadDashboard = async () => {

//         try {

//             setLoading(true);
//             setError("");

//             const response = await getDashboard();

//             setData(response);

//         } catch (err) {

//             setError(
//                 err.response?.data?.message ||
//                 "Failed to load dashboard data."
//             );

//         } finally {

//             setLoading(false);

//         }
//     };


//     useEffect(() => {

//         loadDashboard();

//     }, []);


//     const cards = [
//         {
//             title: "Total Members",
//             value: data.totalMembers,
//             icon: Users,
//             iconBg: "bg-blue-50",
//             iconColor: "text-blue-600",
//         },
//         {
//             title: "Active Members",
//             value: data.activeMembers,
//             icon: UserCheck,
//             iconBg: "bg-green-50",
//             iconColor: "text-green-600",
//         },
//         {
//             title: "Expired Members",
//             value: data.expiredMembers,
//             icon: UserX,
//             iconBg: "bg-red-50",
//             iconColor: "text-red-600",
//         },
//         {
//             title: "Due Bills Today",
//             value: data.dueBillsToday,
//             icon: Receipt,
//             iconBg: "bg-orange-50",
//             iconColor: "text-orange-600",
//         },
//         {
//             title: "Inactive Members",
//             value: data.inactiveMembers,
//             icon: UserX,
//             iconBg: "bg-slate-100",
//             iconColor: "text-slate-600",
//         },
//         {
//             title: "Membership Plans",
//             value: data.totalMembershipPlans,
//             icon: CreditCard,
//             iconBg: "bg-purple-50",
//             iconColor: "text-purple-600",
//         },
//     ];


//     if (loading) {

//         return (
//             <div className="min-h-[70vh] flex items-center justify-center">

//                 <div className="text-center">

//                     <div className="w-10 h-10 border-4
//                                     border-blue-200 border-t-blue-600
//                                     rounded-full animate-spin mx-auto">
//                     </div>

//                     <p className="mt-4 text-sm text-slate-500">
//                         Loading dashboard...
//                     </p>

//                 </div>

//             </div>
//         );
//     }


//     return (
//         <div>

//             {/* Header */}
//             <div className="flex items-center justify-between mb-8">

//                 <div>

//                     <h1 className="text-2xl font-bold text-slate-800">
//                         Dashboard
//                     </h1>

//                     <p className="text-sm text-slate-500 mt-1">
//                         Overview of your gym
//                     </p>

//                 </div>


//                 <button
//                     onClick={loadDashboard}
//                     className="flex items-center gap-2 px-4 py-2
//                                bg-white border border-slate-200
//                                rounded-lg text-sm font-medium
//                                text-slate-600 hover:bg-slate-50
//                                transition"
//                 >
//                     <RefreshCw className="w-4 h-4" />

//                     Refresh
//                 </button>

//             </div>


//             {/* Error */}
//             {error && (

//                 <div className="mb-6 px-4 py-3 rounded-lg
//                                 bg-red-50 border border-red-200
//                                 text-red-600 text-sm">
//                     {error}
//                 </div>

//             )}


//             {/* Statistics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2
//                             lg:grid-cols-3 xl:grid-cols-6
//                             gap-5">

//                 {cards.map((card) => {

//                     const Icon = card.icon;

//                     return (
//                         <div
//                             key={card.title}
//                             className="bg-white rounded-xl border
//                                        border-slate-200 p-5
//                                        hover:shadow-md transition"
//                         >

//                             <div className="flex items-start justify-between">

//                                 <div>

//                                     <p className="text-sm text-slate-500">
//                                         {card.title}
//                                     </p>

//                                     <h2 className="text-3xl font-bold
//                                                    text-slate-800 mt-2">
//                                         {card.value}
//                                     </h2>

//                                 </div>


//                                 <div
//                                     className={`w-11 h-11 rounded-lg
//                                                 flex items-center justify-center
//                                                 ${card.iconBg}`}
//                                 >

//                                     <Icon
//                                         className={`w-5 h-5 ${card.iconColor}`}
//                                     />

//                                 </div>

//                             </div>

//                         </div>
//                     );

//                 })}

//             </div>


//             {/* Bottom Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2
//                             gap-6 mt-8">

//                 {/* Member Overview */}
//                 <div className="bg-white rounded-xl border
//                                 border-slate-200 p-6">

//                     <h2 className="text-lg font-semibold text-slate-800">
//                         Member Overview
//                     </h2>

//                     <p className="text-sm text-slate-500 mt-1">
//                         Current membership status
//                     </p>


//                     <div className="mt-6 space-y-5">

//                         {/* Active */}
//                         <div>

//                             <div className="flex justify-between mb-2">

//                                 <span className="text-sm text-slate-600">
//                                     Active Members
//                                 </span>

//                                 <span className="text-sm font-semibold
//                                                  text-green-600">
//                                     {data.activeMembers}
//                                 </span>

//                             </div>

//                             <div className="h-2 bg-slate-100 rounded-full">

//                                 <div
//                                     className="h-2 bg-green-500 rounded-full"
//                                     style={{
//                                         width:
//                                             data.totalMembers > 0
//                                                 ? `${(data.activeMembers /
//                                                     data.totalMembers) * 100}%`
//                                                 : "0%"
//                                     }}
//                                 />

//                             </div>

//                         </div>


//                         {/* Inactive */}
//                         <div>

//                             <div className="flex justify-between mb-2">

//                                 <span className="text-sm text-slate-600">
//                                     Inactive Members
//                                 </span>

//                                 <span className="text-sm font-semibold
//                                                  text-slate-600">
//                                     {data.inactiveMembers}
//                                 </span>

//                             </div>

//                             <div className="h-2 bg-slate-100 rounded-full">

//                                 <div
//                                     className="h-2 bg-slate-400 rounded-full"
//                                     style={{
//                                         width:
//                                             data.totalMembers > 0
//                                                 ? `${(data.inactiveMembers /
//                                                     data.totalMembers) * 100}%`
//                                                 : "0%"
//                                     }}
//                                 />

//                             </div>

//                         </div>


//                         {/* Expired */}
//                         <div>

//                             <div className="flex justify-between mb-2">

//                                 <span className="text-sm text-slate-600">
//                                     Expired Members
//                                 </span>

//                                 <span className="text-sm font-semibold
//                                                  text-red-600">
//                                     {data.expiredMembers}
//                                 </span>

//                             </div>

//                             <div className="h-2 bg-slate-100 rounded-full">

//                                 <div
//                                     className="h-2 bg-red-500 rounded-full"
//                                     style={{
//                                         width:
//                                             data.totalMembers > 0
//                                                 ? `${(data.expiredMembers /
//                                                     data.totalMembers) * 100}%`
//                                                 : "0%"
//                                     }}
//                                 />

//                             </div>

//                         </div>

//                     </div>

//                 </div>


//                 {/* Quick Summary */}
//                 <div className="bg-white rounded-xl border
//                                 border-slate-200 p-6">

//                     <h2 className="text-lg font-semibold text-slate-800">
//                         Quick Summary
//                     </h2>

//                     <p className="text-sm text-slate-500 mt-1">
//                         Important information
//                     </p>


//                     <div className="mt-6 space-y-4">

//                         <div className="flex items-center
//                                         justify-between p-4
//                                         bg-blue-50 rounded-lg">

//                             <div className="flex items-center gap-3">

//                                 <Users className="w-5 h-5 text-blue-600" />

//                                 <span className="text-sm font-medium
//                                                  text-slate-700">
//                                     Total Members
//                                 </span>

//                             </div>

//                             <span className="font-bold text-blue-600">
//                                 {data.totalMembers}
//                             </span>

//                         </div>


//                         <div className="flex items-center
//                                         justify-between p-4
//                                         bg-orange-50 rounded-lg">

//                             <div className="flex items-center gap-3">

//                                 <Receipt className="w-5 h-5 text-orange-600" />

//                                 <span className="text-sm font-medium
//                                                  text-slate-700">
//                                     Bills Due Today
//                                 </span>

//                             </div>

//                             <span className="font-bold text-orange-600">
//                                 {data.dueBillsToday}
//                             </span>

//                         </div>


//                         <div className="flex items-center
//                                         justify-between p-4
//                                         bg-purple-50 rounded-lg">

//                             <div className="flex items-center gap-3">

//                                 <CreditCard className="w-5 h-5 text-purple-600" />

//                                 <span className="text-sm font-medium
//                                                  text-slate-700">
//                                     Membership Plans
//                                 </span>

//                             </div>

//                             <span className="font-bold text-purple-600">
//                                 {data.totalMembershipPlans}
//                             </span>

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default Dashboard;

