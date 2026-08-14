import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Building2, Save, KeyRound } from "lucide-react";
import { getProfile, updateProfile } from "../../api/profileApi";

const Profile = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        gymName: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();

            console.log("Profile Response:", data);

            setForm({
                username: data.username || "",
                email: data.email || "",
                gymName: data.gymName || "",
            });
        } catch (err) {
            console.error(err);
            alert("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const res = await updateProfile(form);

            if (res.token) {
                localStorage.setItem("token", res.token);
            }

            alert("Profile Updated Successfully");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-lg font-semibold text-slate-600">
                    Loading Profile...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200">

                {/* Header */}

                <div className="border-b px-8 py-6">

                    <h2 className="text-2xl font-bold text-slate-800">
                        My Profile
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Manage your account information.
                    </p>

                </div>

                {/* Body */}

                <form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-6"
                >

                    {/* Username */}

                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Username
                        </label>

                        <div className="relative">

                            <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Username"
                            />

                        </div>

                    </div>

                    {/* Email */}

                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email
                        </label>

                        <div className="relative">

                            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Email"
                            />

                        </div>

                    </div>

                    {/* Gym Name */}

                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Gym Name
                        </label>

                        <div className="relative">

                            <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

                            <input
                                type="text"
                                name="gymName"
                                value={form.gymName}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Gym Name"
                            />

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex gap-4 pt-4">

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition disabled:opacity-60"
                        >

                            <Save size={18} />

                            {saving ? "Updating..." : "Update Profile"}

                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/change-password")}
                            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl transition"
                        >

                            <KeyRound size={18} />

                            Change Password

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Profile;