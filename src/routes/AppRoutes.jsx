import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Members from "../pages/member/Members";
import Memberships from "../pages/membership/Memberships";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddMembership from "../pages/membership/AddMembership";
import UpdateMembership from "../pages/membership/UpdateMembership";


const AppRoutes = () => {

    return (
        <Routes>

            {/* ================= PUBLIC ROUTES ================= */}

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* ================= PROTECTED ROUTES ================= */}

            <Route element={<ProtectedRoute />}>

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/members"
                        element={<Members />}
                    />

                    <Route
                        path="/memberships"
                        element={<Memberships />}
                    />

                    <Route path="/memberships/add"
                        element={<AddMembership />}
                    />

                    <Route
                        path="/memberships/edit/:id"
                        element={<UpdateMembership />}
                    />
                </Route>

            </Route>


            {/* ================= INVALID URL ================= */}

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>
    );
};

export default AppRoutes;