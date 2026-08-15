import { Link } from "react-router-dom";
import {
    Dumbbell,
    Users,
    CreditCard,
    BarChart3,
    ArrowRight,
} from "lucide-react";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white">

            {/* Navbar */}

            <nav className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">

                <div className="flex items-center gap-3">

                    <div className="bg-blue-600 p-3 rounded-xl">
                        <Dumbbell className="w-6 h-6" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">
                            FitTrack
                        </h1>

                        <p className="text-xs text-slate-400">
                            Gym Management System
                        </p>
                    </div>

                </div>

                <div className="flex gap-4">

                    <Link
                        to="/login"
                        className="px-5 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Get Started
                    </Link>

                </div>

            </nav>

            {/* Hero */}

            <section className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

                <div>

                    <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm">
                        Modern Gym Management
                    </span>

                    <h2 className="mt-8 text-6xl font-extrabold leading-tight">
                        Manage Your
                        <span className="text-blue-500">
                            {" "}Fitness Business
                        </span>
                        <br />
                        In One Place
                    </h2>

                    <p className="mt-8 text-lg text-slate-300 leading-8">
                        Track members, manage memberships,
                        monitor revenue, generate reports,
                        receive notifications and run your gym
                        efficiently using FitTrack.
                    </p>

                    <div className="flex gap-5 mt-10">

                        <Link
                            to="/register"
                            className="flex items-center gap-2 px-7 py-4 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Get Started

                            <ArrowRight className="w-5 h-5" />

                        </Link>

                        <Link
                            to="/login"
                            className="px-7 py-4 border border-slate-600 rounded-xl hover:bg-slate-800 transition"
                        >
                            Login
                        </Link>

                    </div>

                </div>

                {/* Right Side */}

                <div className="grid grid-cols-2 gap-6">

                    <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">

                        <Users className="w-10 h-10 text-blue-500" />

                        <h3 className="mt-5 text-xl font-semibold">
                            Member Management
                        </h3>

                        <p className="text-slate-400 mt-2">
                            Add, update and manage gym members.
                        </p>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">

                        <CreditCard className="w-10 h-10 text-green-500" />

                        <h3 className="mt-5 text-xl font-semibold">
                            Membership Plans
                        </h3>

                        <p className="text-slate-400 mt-2">
                            Flexible plans with pricing and duration.
                        </p>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">

                        <BarChart3 className="w-10 h-10 text-yellow-500" />

                        <h3 className="mt-5 text-xl font-semibold">
                            Analytics
                        </h3>

                        <p className="text-slate-400 mt-2">
                            Revenue, reports and growth statistics.
                        </p>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">

                        <Dumbbell className="w-10 h-10 text-red-500" />

                        <h3 className="mt-5 text-xl font-semibold">
                            Smart Dashboard
                        </h3>

                        <p className="text-slate-400 mt-2">
                            Everything you need in one dashboard.
                        </p>

                    </div>

                </div>

            </section>

            {/* Footer */}

            <footer className="border-t border-slate-800 py-8 text-center text-slate-400">

                © 2026 FitTrack • Gym Management System

            </footer>

        </div>
    );
};

export default Home;