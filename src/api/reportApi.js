import api from "./axios";

// ================= Dashboard Report =================

export const getDashboardReport = async () => {

    const response = await api.get("/api/reports/dashboard");

    return response.data;

};


// ================= Member Status =================

export const getMemberStatus = async () => {

    const response = await api.get("/api/reports/member-status");

    return response.data;

};


// ================= Membership Statistics =================

export const getMembershipStats = async () => {

    const response = await api.get("/api/reports/membership-stats");

    return response.data;

};


// ================= Revenue Report =================

export const getRevenue = async () => {

    const response = await api.get("/api/reports/revenue");

    return response.data;

};