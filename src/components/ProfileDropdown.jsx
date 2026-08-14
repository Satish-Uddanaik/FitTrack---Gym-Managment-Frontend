import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    UserCircle,
    User,
    KeyRound,
    LogOut,
    ChevronDown,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

const ProfileDropdown = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {

        const handleClickOutside = (e) => {

            if (ref.current && !ref.current.contains(e.target)) {

                setOpen(false);

            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {

            document.removeEventListener("mousedown", handleClickOutside);

        };

    }, []);

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <div
            className="relative"
            ref={ref}
        >

            {/* Button */}

            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50 transition"
            >

                <UserCircle className="w-9 h-9 text-blue-600" />

                <div className="hidden sm:block text-left">

                    <p className="text-sm font-semibold text-slate-800">

                        {user?.username || "Admin"}

                    </p>

                    <p className="text-xs text-slate-500">

                        {user?.role || "ADMIN"}

                    </p>

                </div>

                <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />

            </button>

            {/* Dropdown */}

            {open && (

                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden z-50">

                    {/* Header */}

                    <div className="px-5 py-4 bg-slate-50 border-b">

                        <p className="font-semibold text-slate-800">

                            {user?.username}

                        </p>

                        <p className="text-sm text-slate-500">

                            {user?.email}

                        </p>

                    </div>

                    {/* Menu */}

                    <div className="py-2">

                        <Link
                            to="/profile"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-slate-100 transition"
                        >

                            <User className="w-5 h-5 text-blue-600" />

                            My Profile

                        </Link>

                        <Link
                            to="/change-password"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-slate-100 transition"
                        >

                            <KeyRound className="w-5 h-5 text-amber-600" />

                            Change Password

                        </Link>

                    </div>

                    {/* Logout */}

                    <div className="border-t">

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                        >

                            <LogOut className="w-5 h-5" />

                            Logout

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

};

export default ProfileDropdown;