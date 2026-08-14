import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, KeyRound, Save, ArrowLeft } from "lucide-react";
import { changePassword } from "../../api/profileApi";

const ChangePassword = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (form.newPassword.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {

            setLoading(true);

            const res = await changePassword({
                oldPassword: form.oldPassword,
                newPassword: form.newPassword
            });

            alert(res.message);

            setForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

            navigate("/profile");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Failed to change password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-3xl mx-auto">

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200">

                <div className="border-b px-8 py-6">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Change Password
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Update your account password.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-6"
                >

                    <div>

                        <label className="block text-sm font-semibold mb-2">
                            Old Password
                        </label>

                        <div className="relative">

                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400"/>

                            <input
                                type="password"
                                name="oldPassword"
                                value={form.oldPassword}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter old password"
                                required
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">
                            New Password
                        </label>

                        <div className="relative">

                            <KeyRound className="absolute left-3 top-3 w-5 h-5 text-slate-400"/>

                            <input
                                type="password"
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                                required
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <KeyRound className="absolute left-3 top-3 w-5 h-5 text-slate-400"/>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm password"
                                required
                            />

                        </div>

                    </div>

                    <div className="flex gap-4 pt-2">

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-60"
                        >

                            <Save size={18}/>

                            {loading ? "Updating..." : "Update Password"}

                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="flex items-center gap-2 bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-xl"
                        >

                            <ArrowLeft size={18}/>

                            Back

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default ChangePassword;