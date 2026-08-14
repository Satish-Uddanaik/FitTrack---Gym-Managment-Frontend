import api from "./axios";

// ================= Get All Notifications =================

export const getNotifications = async () => {

    const response = await api.get("/notifications");

    return response.data;

};


// ================= Get Notification Count =================

export const getNotificationCount = async () => {

    const response = await api.get("/notifications/count");

    return response.data;

};