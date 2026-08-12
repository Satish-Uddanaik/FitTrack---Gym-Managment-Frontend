// 3. ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
                    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-sm font-medium text-slate-600">
                        Authenticating session...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;

// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const ProtectedRoute = () => {

//     const { isAuthenticated, loading } = useAuth();
//     const location = useLocation();

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-slate-100">

//                 <div className="text-center">

//                     <div className="w-10 h-10 border-4 border-blue-200
//                                     border-t-blue-600 rounded-full
//                                     animate-spin mx-auto">
//                     </div>

//                     <p className="mt-3 text-sm text-slate-500">
//                         Loading...
//                     </p>

//                 </div>

//             </div>
//         );
//     }

//     if (!isAuthenticated) {
//         return (
//             <Navigate
//                 to="/login"
//                 state={{ from: location }}
//                 replace
//             />
//         );
//     }

//     return <Outlet />;
// };

// export default ProtectedRoute;