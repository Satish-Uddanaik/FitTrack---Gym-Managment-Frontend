import api from "./axios";

export const getAllMembers = async () => {
    const response = await api.get("/members");
    return response.data;
};

export const getMemberById = async (id) => {
    const response = await api.get(`/members/${id}`);
    return response.data;
};

export const addMember = async (data) => {
    const response = await api.post("/members", data);
    return response.data;
};

export const updateMember = async (id, data) => {
    const response = await api.put(`/members/${id}`, data);
    return response.data;
};

export const deleteMember = async (id) => {
    const response = await api.delete(`/members/${id}`);
    return response.data;
};

export const searchMember = async (keyword) => {
    const response = await api.get(`/members/search?keyword=${keyword}`);
    return response.data;
};

export const getMembersByStatus = async (status) => {
    const response = await api.get(`/members/status/${status}`);
    return response.data;
};

export const getDueBills = async () => {
    const response = await api.get("/members/due-bills");
    return response.data;
};

export const getActiveMembers = async () => {
    const response = await api.get("/members/active");
    return response.data;
};

export const getExpiredMembers = async () => {
    const response = await api.get("/members/expired");
    return response.data;
};

export const getExpiringMembers = async (days = 7) => {
    const response = await api.get(`/members/expiring?days=${days}`);
    return response.data;
};

export const getTotalMembers = async () => {
    const response = await api.get("/members/count");
    return response.data;
};

export const getActiveCount = async () => {
    const response = await api.get("/members/count/active");
    return response.data;
};

export const getExpiredCount = async () => {
    const response = await api.get("/members/count/expired");
    return response.data;
};

export const getRecentMembers = async () => {

    const response = await api.get("/members/recent");

    return response.data;

};

export const getUpcomingBills = async () => {

    const response = await api.get("/members/upcoming-bills");

    return response.data;

};