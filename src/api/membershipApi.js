import api from "./axios";

export const getAllMemberships = async () => {
    const response = await api.get("/memberships");
    return response.data;
};

export const getMembershipById = async (id) => {
    const response = await api.get(`/memberships/${id}`);
    return response.data;
};

export const addMembership = async (data) => {
    const response = await api.post("/memberships", data);
    return response.data;
};

export const updateMembership = async (id, data) => {
    const response = await api.put(`/memberships/${id}`, data);
    return response.data;
};

export const deleteMembership = async (id) => {
    const response = await api.delete(`/memberships/${id}`);
    return response.data;
};