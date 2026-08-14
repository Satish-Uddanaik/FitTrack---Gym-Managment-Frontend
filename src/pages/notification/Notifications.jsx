import { useEffect, useState } from "react";
import {
    AlertCircle,
    Clock3,
    XCircle,
    Bell
} from "lucide-react";

import { getNotifications } from "../../api/notificationApi";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const data = await getNotifications();

            setNotifications(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const getIcon = (type) => {

        switch (type) {

            case "DUE":

                return (
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                );

            case "UPCOMING":

                return (
                    <Clock3 className="w-6 h-6 text-blue-500" />
                );

            case "EXPIRED":

                return (
                    <XCircle className="w-6 h-6 text-red-500" />
                );

            default:

                return (
                    <Bell className="w-6 h-6 text-gray-500" />
                );

        }

    };

    return (

        <div className="p-8">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">

                    Notifications

                </h1>

                <p className="text-slate-500 mt-1">

                    View all membership and payment alerts.

                </p>

            </div>

            {/* Loading */}

            {

                loading ?

                    (

                        <div className="text-center py-20">

                            Loading...

                        </div>

                    )

                    :

                    notifications.length === 0 ?

                        (

                            <div className="bg-white rounded-xl shadow p-10 text-center">

                                <Bell className="w-14 h-14 mx-auto text-slate-400 mb-4" />

                                <h2 className="text-xl font-semibold">

                                    No Notifications

                                </h2>

                                <p className="text-slate-500 mt-2">

                                    You're all caught up.

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="space-y-4">

                                {

                                    notifications.map((notification, index) => (

                                        <div
                                            key={index}
                                            className="bg-white rounded-xl shadow border hover:shadow-md transition p-5 flex gap-4 items-start"
                                        >

                                            <div>

                                                {getIcon(notification.type)}

                                            </div>

                                            <div>

                                                <h3 className="font-semibold text-slate-800">

                                                    {notification.title}

                                                </h3>

                                                <p className="text-slate-600 mt-1">

                                                    {notification.message}

                                                </p>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

            }

        </div>

    );

};

export default Notifications;