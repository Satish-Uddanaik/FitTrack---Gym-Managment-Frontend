import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Members from "../pages/member/Members";
import AddMember from "../pages/member/AddMember";
import UpdateMember from "../pages/member/UpdateMember";

import Memberships from "../pages/membership/Memberships";
import AddMembership from "../pages/membership/AddMembership";
import UpdateMembership from "../pages/membership/UpdateMembership";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Profile from "../pages/profile/Profile";
import ChangePassword from "../pages/profile/ChangePassword";

import Notifications from "../pages/notification/Notifications"

import Reports from "../pages/reports/Reports";

import Revenue from "../pages/reports/Revenue";

import Home from "../components/Home";

const AppRoutes = () => {

    return (

        <Routes>

            {/* Public */}

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />


            {/* Protected */}

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
                        path="/members/add"
                        element={<AddMember />}
                    />

                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    />

                    <Route
                        path="/members/edit/:id"
                        element={<UpdateMember />}
                    />

                    <Route
                        path="/memberships"
                        element={<Memberships />}
                    />

                    <Route
                        path="/memberships/add"
                        element={<AddMembership />}
                    />

                    <Route
                        path="/memberships/edit/:id"
                        element={<UpdateMembership />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />

                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                    <Route

                        path="/revenue"

                        element={<Revenue />}

                    />

                </Route>

            </Route>


            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>

    );

};

export default AppRoutes;