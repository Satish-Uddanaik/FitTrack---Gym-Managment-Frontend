import api from "./axios";

// ================= Get Profile =================

export const getProfile = async () => {

    const res = await api.get("/api/profile");

    return res.data;

};

// ================= Update Profile =================

export const updateProfile = async (data) => {

    const res = await api.put("/api/profile", data);

    return res.data;

};

// ================= Change Password =================

export const changePassword = async (data) => {

    const res = await api.put("/api/profile/change-password", data);

    return res.data;

};