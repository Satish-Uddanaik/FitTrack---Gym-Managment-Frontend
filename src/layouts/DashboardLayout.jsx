// 4. DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
            <Sidebar />
            <main className="ml-64 min-h-screen flex flex-col">
                <Navbar />
                <div className="p-8 flex-1 max-w-7xl w-full mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;

// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// const DashboardLayout = () => {
//     return (
//         <div className="min-h-screen bg-slate-100">

//             <Sidebar />

//             <main className="ml-64 min-h-screen">

//                 <Navbar />

//                 <div className="p-8">
//                     <Outlet />
//                 </div>

//             </main>

//         </div>
//     );
// };

// export default DashboardLayout;