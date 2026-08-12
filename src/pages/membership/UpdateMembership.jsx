import { useEffect, useState } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getMembershipById,
    updateMembership,
} from "../../api/membershipApi";


const UpdateMembership = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        planName: "",
        durationInMonths: "",
        price: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    // Load membership
    const loadMembership = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getMembershipById(id);

            setForm({
                planName: data.planName || "",
                durationInMonths: data.durationInMonths || "",
                price: data.price || "",
                description: data.description || "",
            });

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to load membership."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadMembership();

    }, [id]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!form.planName.trim()) {
            setError("Plan name is required.");
            return;
        }

        if (
            !form.durationInMonths ||
            Number(form.durationInMonths) < 1
        ) {
            setError("Duration must be at least 1 month.");
            return;
        }

        if (!form.price || Number(form.price) <= 0) {
            setError("Price must be greater than 0.");
            return;
        }

        try {

            setSaving(true);

            const data = {
                planName: form.planName.trim(),
                durationInMonths: Number(form.durationInMonths),
                price: Number(form.price),
                description: form.description.trim(),
            };

            await updateMembership(id, data);

            navigate("/memberships");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to update membership."
            );

        } finally {

            setSaving(false);

        }
    };


    // Loading membership
    if (loading) {

        return (
            <div className="min-h-[60vh] flex items-center justify-center">

                <div className="text-center">

                    <div className="w-10 h-10 border-4
                                    border-blue-200 border-t-blue-600
                                    rounded-full animate-spin mx-auto">
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        Loading membership...
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div className="max-w-3xl mx-auto">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">

                <button
                    onClick={() => navigate("/memberships")}
                    className="p-2 rounded-lg border border-slate-200
                               bg-white text-slate-600
                               hover:bg-slate-50 transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div>

                    <h1 className="text-2xl font-bold text-slate-800">
                        Update Membership
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Update your membership plan details
                    </p>

                </div>

            </div>


            {/* Error */}
            {error && (

                <div className="mb-6 px-4 py-3 rounded-lg
                                bg-red-50 border border-red-200
                                text-red-600 text-sm">
                    {error}
                </div>

            )}


            {/* Form Card */}
            <div className="bg-white rounded-xl border
                            border-slate-200 shadow-sm">

                {/* Card Header */}
                <div className="p-6 border-b border-slate-200">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 bg-blue-50
                                        rounded-lg flex items-center
                                        justify-center">

                            <CreditCard className="w-5 h-5 text-blue-600" />

                        </div>

                        <div>

                            <h2 className="font-semibold text-slate-800">
                                Membership Details
                            </h2>

                            <p className="text-sm text-slate-400">
                                Modify the plan information below
                            </p>

                        </div>

                    </div>

                </div>


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >

                    {/* Plan Name */}
                    <div>

                        <label className="block text-sm font-medium
                                          text-slate-700 mb-2">
                            Plan Name
                        </label>

                        <input
                            type="text"
                            name="planName"
                            value={form.planName}
                            onChange={handleChange}
                            placeholder="e.g. Premium"
                            required
                            className="w-full px-4 py-3
                                       border border-slate-200
                                       rounded-lg outline-none
                                       focus:ring-2
                                       focus:ring-blue-500
                                       focus:border-blue-500"
                        />

                    </div>


                    {/* Duration + Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Duration */}
                        <div>

                            <label className="block text-sm font-medium
                                              text-slate-700 mb-2">
                                Duration
                            </label>

                            <div className="relative">

                                <input
                                    type="number"
                                    name="durationInMonths"
                                    value={form.durationInMonths}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                    className="w-full px-4 py-3 pr-20
                                               border border-slate-200
                                               rounded-lg outline-none
                                               focus:ring-2
                                               focus:ring-blue-500
                                               focus:border-blue-500"
                                />

                                <span className="absolute right-4 top-1/2
                                                 -translate-y-1/2
                                                 text-sm text-slate-400">
                                    months
                                </span>

                            </div>

                        </div>


                        {/* Price */}
                        <div>

                            <label className="block text-sm font-medium
                                              text-slate-700 mb-2">
                                Price
                            </label>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2
                                                 -translate-y-1/2
                                                 text-slate-500">
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    min="0.01"
                                    step="0.01"
                                    required
                                    className="w-full px-4 py-3 pl-9
                                               border border-slate-200
                                               rounded-lg outline-none
                                               focus:ring-2
                                               focus:ring-blue-500
                                               focus:border-blue-500"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Description */}
                    <div>

                        <label className="block text-sm font-medium
                                          text-slate-700 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe this membership plan..."
                            className="w-full px-4 py-3
                                       border border-slate-200
                                       rounded-lg outline-none resize-none
                                       focus:ring-2
                                       focus:ring-blue-500
                                       focus:border-blue-500"
                        />

                    </div>


                    {/* Buttons */}
                    <div className="flex justify-end gap-3
                                    pt-4 border-t border-slate-100">

                        <button
                            type="button"
                            onClick={() => navigate("/memberships")}
                            className="px-5 py-2.5 rounded-lg
                                       border border-slate-200
                                       text-sm font-medium
                                       text-slate-600
                                       hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-5 py-2.5 rounded-lg
                                       bg-blue-600 text-white
                                       text-sm font-semibold
                                       hover:bg-blue-700 transition
                                       disabled:opacity-60
                                       disabled:cursor-not-allowed"
                        >
                            {saving
                                ? "Updating..."
                                : "Update Membership"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UpdateMembership;

