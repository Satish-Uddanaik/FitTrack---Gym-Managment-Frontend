import { useEffect, useState } from "react";
import { Bell, UserCircle } from "lucide-react";
import useAuth from "../hooks/useAuth";

import ProfileDropdown from "./ProfileDropdown";
import { getNotificationCount } from "../api/notificationApi";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {

    const { user } = useAuth();

    const [count, setCount] = useState(0);

    useEffect(() => {

        loadNotificationCount();

    }, []);

    const loadNotificationCount = async () => {

        try {

            const data = await getNotificationCount();

            setCount(data);

        } catch (error) {

            console.error("Failed to load notification count", error);

        }

    };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-8 transition-all">

            {/* Page Title */}

            <div>

                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    Dashboard
                </h2>

                <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Welcome back,
                    <span className="text-slate-700 font-semibold">
                        {" "}
                        {user?.username || "Admin"}
                    </span>
                </p>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-4">

                <ProfileDropdown />

                {/* Notification */}

                <NotificationDropdown count={count} />

                {/* <button className="relative">
                   
                    <NotificationDropdown count={count} />

                </button> */}

                {/* Divider */}

                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                {/* User */}

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">

                        <UserCircle className="w-6 h-6" />

                    </div>

                    <div className="hidden sm:block text-left">

                        <p className="text-sm font-semibold text-slate-800 leading-none">
                            {user?.username || "Admin"}
                        </p>

                        <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-slate-200/60">
                            {user?.role || "ADMIN"}
                        </span>

                    </div>

                </div>

            </div>

        </header>
    );

};

export default Navbar;

