// 2. Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    User,
    LogOut,
    Dumbbell,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const links = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Members",
            path: "/members",
            icon: Users,
        },
        {
            name: "Memberships",
            path: "/memberships",
            icon: CreditCard,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: User,
        }
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shadow-xl">
            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-slate-800/80 bg-slate-950/40">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center">
                        <Dumbbell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white">
                            FitTrack
                        </h1>
                        <p className="text-[11px] font-medium text-slate-400">
                            Gym Management
                        </p>
                    </div>
                </div>
            </div>

            {/* User Profile Card */}
            <div className="mx-4 my-5 p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Logged in as
                </p>
                <p className="font-semibold text-white text-sm truncate">
                    {user?.username || "Admin"}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                        {user?.role || "ADMIN"}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-2 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
                    Main Menu
                </p>

                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold"
                                        : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                                    <span>{link.name}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/20">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/20 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

// import { NavLink, useNavigate } from "react-router-dom";
// import {
//     LayoutDashboard,
//     Users,
//     CreditCard,
//     LogOut,
//     Dumbbell,
// } from "lucide-react";
// import useAuth from "../hooks/useAuth";

// const Sidebar = () => {

//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate("/login");
//     };

//     const links = [
//         {
//             name: "Dashboard",
//             path: "/dashboard",
//             icon: LayoutDashboard,
//         },
//         {
//             name: "Members",
//             path: "/members",
//             icon: Users,
//         },
//         {
//             name: "Memberships",
//             path: "/memberships",
//             icon: CreditCard,
//         },
//     ];

//     return (
//         <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col">

//             {/* Logo */}
//             <div className="h-20 flex items-center px-6 border-b border-slate-200">

//                 <div className="flex items-center gap-3">

//                     <div className="w-10 h-10 bg-blue-600 rounded-xl
//                                     flex items-center justify-center">

//                         <Dumbbell className="w-5 h-5 text-white" />

//                     </div>

//                     <div>
//                         <h1 className="text-xl font-bold text-slate-800">
//                             FitTrack
//                         </h1>

//                         <p className="text-xs text-slate-400">
//                             Gym Management
//                         </p>
//                     </div>

//                 </div>

//             </div>

//             {/* User */}
//             <div className="px-5 py-5 border-b border-slate-200">

//                 <p className="text-xs text-slate-400 mb-1">
//                     Logged in as
//                 </p>

//                 <p className="font-semibold text-slate-700 truncate">
//                     {user?.username || "Admin"}
//                 </p>

//                 <p className="text-xs text-slate-400 mt-1">
//                     {user?.role || "ADMIN"}
//                 </p>

//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 px-4 py-6">

//                 <p className="text-xs font-semibold text-slate-400
//                               uppercase tracking-wider px-3 mb-3">
//                     Menu
//                 </p>

//                 <div className="space-y-1">

//                     {links.map((link) => {

//                         const Icon = link.icon;

//                         return (
//                             <NavLink
//                                 key={link.path}
//                                 to={link.path}
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-3 py-3 rounded-lg
//                                      text-sm font-medium transition
//                                      ${
//                                          isActive
//                                              ? "bg-blue-50 text-blue-600"
//                                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                                      }`
//                                 }
//                             >
//                                 <Icon className="w-5 h-5" />

//                                 <span>
//                                     {link.name}
//                                 </span>

//                             </NavLink>
//                         );

//                     })}

//                 </div>

//             </nav>

//             {/* Logout */}
//             <div className="p-4 border-t border-slate-200">

//                 <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-3 px-3 py-3
//                                rounded-lg text-sm font-medium
//                                text-red-500 hover:bg-red-50
//                                transition"
//                 >
//                     <LogOut className="w-5 h-5" />

//                     <span>
//                         Logout
//                     </span>
//                 </button>

//             </div>

//         </aside>
//     );
// };

// export default Sidebar;