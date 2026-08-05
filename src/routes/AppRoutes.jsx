import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Members from "../pages/member/Members";
import Memberships from "../pages/membership/Memberships";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {

    return (

        <Routes>

            {/* Public Routes */}

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />


            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>

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

    </Route>

</Route>


            {/* Invalid URL */}

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>

    );

};

export default AppRoutes;