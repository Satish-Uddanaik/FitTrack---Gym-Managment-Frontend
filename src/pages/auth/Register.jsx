import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerApi } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";

const Register = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        gymName: "",
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

            const response = await registerApi(form);

            // Backend returns JWT after registration
            login(response);

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Logo / Heading */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-blue-600">
                        FitTrack
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your gym account
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
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Gym Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gym Name
                        </label>

                        <input
                            type="text"
                            name="gymName"
                            value={form.gymName}
                            onChange={handleChange}
                            placeholder="Enter gym name"
                            required
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2 focus:ring-blue-500"
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
                            className="w-full px-4 py-3 border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg
                                   font-semibold hover:bg-blue-700
                                   transition disabled:opacity-60"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Register;

