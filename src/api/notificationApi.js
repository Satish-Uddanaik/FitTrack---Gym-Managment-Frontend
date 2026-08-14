import api from "./axios";

// ================= Get All Notifications =================

export const getNotifications = async () => {

    const response = await api.get("/api/notifications");

    return response.data;

};


// ================= Get Notification Count =================

export const getNotificationCount = async () => {

    const response = await api.get("/api/notifications/count");

    return response.data;

};