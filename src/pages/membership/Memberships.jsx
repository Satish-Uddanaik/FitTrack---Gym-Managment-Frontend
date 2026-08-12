import { useEffect, useState } from "react";
import {
    CreditCard,
    Plus,
    Pencil,
    Trash2,
    RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllMemberships, deleteMembership } from "../../api/membershipApi";


const Memberships = () => {

    const navigate = useNavigate();

    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);


    const loadMemberships = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllMemberships();

            setMemberships(data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to load memberships."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadMemberships();

    }, []);


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this membership?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setDeletingId(id);

            await deleteMembership(id);

            setMemberships((prev) =>
                prev.filter((membership) => membership.id !== id)
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to delete membership."
            );

        } finally {

            setDeletingId(null);

        }
    };


    if (loading) {

        return (
            <div className="min-h-[60vh] flex items-center justify-center">

                <div className="text-center">

                    <div className="w-10 h-10 border-4
                                    border-blue-200 border-t-blue-600
                                    rounded-full animate-spin mx-auto">
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        Loading memberships...
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row
                            sm:items-center sm:justify-between
                            gap-4 mb-8">

                <div>

                    <h1 className="text-2xl font-bold text-slate-800">
                        Membership Plans
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Manage your gym membership plans
                    </p>

                </div>


                <div className="flex gap-3">

                    <button
                        onClick={loadMemberships}
                        className="flex items-center gap-2
                                   px-4 py-2.5 bg-white
                                   border border-slate-200
                                   rounded-lg text-sm font-medium
                                   text-slate-600
                                   hover:bg-slate-50 transition"
                    >
                        <RefreshCw className="w-4 h-4" />

                        Refresh
                    </button>


                    <button
                        onClick={() => navigate("/memberships/add")}
                        className="flex items-center gap-2
                                   px-4 py-2.5 bg-blue-600
                                   text-white rounded-lg
                                   text-sm font-semibold
                                   hover:bg-blue-700 transition"
                    >
                        <Plus className="w-4 h-4" />

                        Add Membership
                    </button>

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


            {/* Empty State */}
            {memberships.length === 0 ? (

                <div className="bg-white border border-slate-200
                                rounded-xl p-12 text-center">

                    <div className="w-16 h-16 bg-blue-50
                                    rounded-full flex items-center
                                    justify-center mx-auto">

                        <CreditCard className="w-8 h-8 text-blue-600" />

                    </div>

                    <h2 className="text-lg font-semibold
                                   text-slate-800 mt-5">
                        No Membership Plans
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                        Create your first membership plan to get started.
                    </p>

                    <button
                        onClick={() => navigate("/memberships/add")}
                        className="mt-5 inline-flex items-center gap-2
                                   px-4 py-2.5 bg-blue-600
                                   text-white rounded-lg
                                   text-sm font-semibold
                                   hover:bg-blue-700 transition"
                    >
                        <Plus className="w-4 h-4" />

                        Add Membership
                    </button>

                </div>

            ) : (

                /* Membership Cards */
                <div className="grid grid-cols-1 md:grid-cols-2
                                xl:grid-cols-3 gap-6">

                    {memberships.map((membership) => (

                        <div
                            key={membership.id}
                            className="bg-white rounded-xl
                                       border border-slate-200
                                       overflow-hidden
                                       hover:shadow-md transition"
                        >

                            {/* Card Header */}
                            <div className="p-6 border-b border-slate-100">

                                <div className="flex items-start
                                                justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="w-11 h-11
                                                        rounded-lg
                                                        bg-blue-50
                                                        flex items-center
                                                        justify-center">

                                            <CreditCard
                                                className="w-5 h-5
                                                           text-blue-600"
                                            />

                                        </div>

                                        <div>

                                            <h2 className="font-semibold
                                                           text-slate-800">
                                                {membership.planName}
                                            </h2>

                                            <p className="text-xs
                                                          text-slate-400">
                                                Membership Plan
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Card Body */}
                            <div className="p-6">

                                <div className="flex items-end
                                                justify-between mb-5">

                                    <div>

                                        <p className="text-xs
                                                      text-slate-400">
                                            Price
                                        </p>

                                        <p className="text-3xl
                                                      font-bold
                                                      text-slate-800 mt-1">
                                            ₹{membership.price}
                                        </p>

                                    </div>

                                    <span className="text-sm
                                                     text-slate-500">
                                        / {membership.durationInMonths}
                                        {" "}
                                        {membership.durationInMonths === 1
                                            ? "month"
                                            : "months"}
                                    </span>

                                </div>


                                {/* Description */}
                                {membership.description && (

                                    <div className="mb-6">

                                        <p className="text-xs
                                                      text-slate-400 mb-1">
                                            Description
                                        </p>

                                        <p className="text-sm
                                                      text-slate-600
                                                      line-clamp-2">
                                            {membership.description}
                                        </p>

                                    </div>

                                )}


                                {/* Actions */}
                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/memberships/edit/${membership.id}`
                                            )
                                        }
                                        className="flex-1 flex
                                                   items-center
                                                   justify-center gap-2
                                                   px-4 py-2.5
                                                   border border-slate-200
                                                   rounded-lg
                                                   text-sm font-medium
                                                   text-slate-600
                                                   hover:bg-slate-50
                                                   transition"
                                    >
                                        <Pencil className="w-4 h-4" />

                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(membership.id)
                                        }
                                        disabled={
                                            deletingId === membership.id
                                        }
                                        className="flex-1 flex
                                                   items-center
                                                   justify-center gap-2
                                                   px-4 py-2.5
                                                   border border-red-200
                                                   rounded-lg
                                                   text-sm font-medium
                                                   text-red-600
                                                   hover:bg-red-50
                                                   transition
                                                   disabled:opacity-50"
                                    >
                                        <Trash2 className="w-4 h-4" />

                                        {deletingId === membership.id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Memberships;

