import { useEffect, useRef, useState } from "react";
import { Bell, AlertCircle, Clock3, XCircle } from "lucide-react";
import { getNotifications } from "../api/notificationApi";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {

    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const ref = useRef(null);

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

    const loadNotifications = async () => {

        try {

            const data = await getNotifications();

            setNotifications(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleOpen = () => {

        if (!open) {

            loadNotifications();

        }

        setOpen(!open);

    };

    const getIcon = (type) => {

        switch (type) {

            case "DUE":
                return (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                );

            case "UPCOMING":
                return (
                    <Clock3 className="w-5 h-5 text-blue-500" />
                );

            case "EXPIRED":
                return (
                    <XCircle className="w-5 h-5 text-red-500" />
                );

            default:
                return (
                    <Bell className="w-5 h-5 text-gray-500" />
                );

        }

    };

    return (

        <div
            className="relative"
            ref={ref}
        >

            <button
                onClick={handleOpen}
                className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition-all duration-200"
            >

                <Bell className="w-5 h-5" />

            </button>

            {
                open && (

                    <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">

                        {/* Header */}

                        <div className="px-5 py-4 border-b bg-slate-50">

                            <h3 className="font-semibold text-slate-800">

                                Notifications

                            </h3>

                        </div>

                        {/* Body */}

                        <div className="max-h-96 overflow-y-auto">

                            {

                                notifications.length === 0 ?

                                    (

                                        <div className="py-10 text-center text-slate-500">

                                            No Notifications

                                        </div>

                                    )

                                    :

                                    notifications.map((notification, index) => (

                                        <div
                                            key={index}
                                            className="flex items-start gap-3 px-5 py-4 hover:bg-slate-50 border-b last:border-none"
                                        >

                                            {getIcon(notification.type)}

                                            <div>

                                                <p className="font-medium text-slate-800">

                                                    {notification.title}

                                                </p>

                                                <p className="text-sm text-slate-500">

                                                    {notification.message}

                                                </p>

                                            </div>

                                        </div>

                                    ))

                            }

                        </div>

                        <div className="border-t bg-slate-50">

                            <Link
                                to="/notifications"
                                onClick={() => setOpen(false)}
                                className="block text-center py-3 text-sm font-semibold text-blue-600 hover:bg-slate-100 transition"
                            >
                                View All Notifications
                            </Link>

                        </div>

                    </div>

                )

            }

        </div>

    );

};

export default NotificationDropdown;