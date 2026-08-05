import {
    LayoutDashboard,
    Users,
    BadgeDollarSign,
    LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {

    const { logout } = useAuth();

    return (

        <div className="w-64 bg-gray-900 text-white flex flex-col">

            <div className="p-6 text-2xl font-bold border-b border-gray-700">

                FitTrack

            </div>

            <nav className="flex-1 mt-5">

                <NavLink

                    to="/dashboard"

                    className={({ isActive }) =>

                        `flex items-center gap-3 px-6 py-4 hover:bg-gray-800

                        ${isActive ? "bg-blue-600" : ""}`

                    }

                >

                    <LayoutDashboard size={20} />

                    Dashboard

                </NavLink>

                <NavLink

                    to="/members"

                    className={({ isActive }) =>

                        `flex items-center gap-3 px-6 py-4 hover:bg-gray-800

                        ${isActive ? "bg-blue-600" : ""}`

                    }

                >

                    <Users size={20} />

                    Members

                </NavLink>

                <NavLink

                    to="/memberships"

                    className={({ isActive }) =>

                        `flex items-center gap-3 px-6 py-4 hover:bg-gray-800

                        ${isActive ? "bg-blue-600" : ""}`

                    }

                >

                    <BadgeDollarSign size={20} />

                    Memberships

                </NavLink>

            </nav>

            <button

                onClick={logout}

                className="flex items-center gap-3 p-5 bg-red-600 hover:bg-red-700"

            >

                <LogOut size={20} />

                Logout

            </button>

        </div>

    );

};

export default Sidebar;