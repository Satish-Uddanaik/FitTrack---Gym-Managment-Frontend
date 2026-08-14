import {
    Users,
    UserCheck,
    UserX,
    UserMinus,
    CreditCard,
    Wallet,
    CalendarClock,
    IndianRupee
} from "lucide-react";

const DashboardCard = ({ report }) => {

    const cards = [

        {
            title: "Total Members",
            value: report?.totalMembers || 0,
            icon: Users,
            color: "bg-blue-100 text-blue-600"
        },

        {
            title: "Active Members",
            value: report?.activeMembers || 0,
            icon: UserCheck,
            color: "bg-green-100 text-green-600"
        },

        {
            title: "Expired Members",
            value: report?.expiredMembers || 0,
            icon: UserX,
            color: "bg-red-100 text-red-600"
        },

        {
            title: "Inactive Members",
            value: report?.inactiveMembers || 0,
            icon: UserMinus,
            color: "bg-yellow-100 text-yellow-600"
        },

        {
            title: "Membership Plans",
            value: report?.totalMembershipPlans || 0,
            icon: CreditCard,
            color: "bg-indigo-100 text-indigo-600"
        },

        {
            title: "Today's Due Bills",
            value: report?.todayDueBills || 0,
            icon: CalendarClock,
            color: "bg-orange-100 text-orange-600"
        },

        {
            title: "Total Revenue",
            value: `₹${report?.totalRevenue || 0}`,
            icon: Wallet,
            color: "bg-emerald-100 text-emerald-600"
        },

        {
            title: "Monthly Revenue",
            value: `₹${report?.monthlyRevenue || 0}`,
            icon: IndianRupee,
            color: "bg-purple-100 text-purple-600"
        }

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition"
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-sm text-slate-500 font-medium">

                                        {card.title}

                                    </p>

                                    <h2 className="mt-3 text-3xl font-bold text-slate-800">

                                        {card.value}

                                    </h2>

                                </div>

                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}>

                                    <Icon className="w-7 h-7"/>

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

};

export default DashboardCard;