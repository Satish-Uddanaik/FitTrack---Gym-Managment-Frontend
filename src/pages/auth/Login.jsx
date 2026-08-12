import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await loginApi(form);

            // Store JWT and user information
            login(response);

            // Go to dashboard
            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid username or password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Logo */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-blue-600">
                        FitTrack
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back to your gym
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 border border-red-200
                                    text-red-600 px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Username */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                            autoComplete="username"
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                            autoComplete="current-password"
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg
                                   font-semibold hover:bg-blue-700
                                   transition disabled:opacity-60
                                   disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-500 mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Login;
