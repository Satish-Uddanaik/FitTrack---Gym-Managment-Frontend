import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getMemberById,
    updateMember,
} from "../../api/memberApi";

import { getAllMemberships } from "../../api/membershipApi";

const UpdateMember = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [memberships, setMemberships] = useState([]);

    const [form, setForm] = useState({
        fullName: "",
        mobile: "",
        email: "",
        age: "",
        gender: "",
        address: "",
        joiningDate: "",
        lastPaymentDate: "",
        nextBillDate: "",
        status: "",
        membershipId: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    // Load Member

    const loadMember = async () => {

        try {

            const data = await getMemberById(id);

            setForm({
                fullName: data.fullName || "",
                mobile: data.mobile || "",
                email: data.email || "",
                age: data.age || "",
                gender: data.gender || "",
                address: data.address || "",
                joiningDate: data.joiningDate || "",
                lastPaymentDate: data.lastPaymentDate || "",
                nextBillDate: data.nextBillDate || "",
                status: data.status || "",
                membershipId: data.membershipId || "",
            });

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to load member."
            );

        }

    };


    // Load Membership Plans

    const loadMemberships = async () => {

        try {

            const data = await getAllMemberships();

            setMemberships(data);

        } catch (err) {

            console.log(err);

        }

    };


    useEffect(() => {

        const loadData = async () => {

            setLoading(true);

            await Promise.all([
                loadMember(),
                loadMemberships(),
            ]);

            setLoading(false);

        };

        loadData();

    }, [id]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setSaving(true);

            await updateMember(id, {
                ...form,
                age: Number(form.age),
                membershipId: Number(form.membershipId),
            });

            navigate("/members");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to update member."
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (

            <div className="min-h-[60vh] flex items-center justify-center">

                <div className="w-10 h-10 border-4
                                border-blue-200
                                border-t-blue-600
                                rounded-full animate-spin">
                </div>

            </div>

        );

    }

        return (

        <div className="max-w-5xl mx-auto">

            {/* Header */}

            <div className="flex items-center gap-4 mb-8">

                <button
                    onClick={() => navigate("/members")}
                    className="p-2 border rounded-lg hover:bg-gray-100"
                >
                    <ArrowLeft size={20} />
                </button>

                <div>

                    <h1 className="text-2xl font-bold">
                        Update Member
                    </h1>

                    <p className="text-gray-500">
                        Update member information
                    </p>

                </div>

            </div>


            {error &&

                <div className="bg-red-100 text-red-600 p-3 rounded mb-5">

                    {error}

                </div>

            }


            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow p-8"
            >

                <div className="grid grid-cols-2 gap-5">

                    {/* Full Name */}

                    <div>

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        />

                    </div>


                    {/* Mobile */}

                    <div>

                        <label>Mobile</label>

                        <input
                            type="text"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        />

                    </div>


                    {/* Email */}

                    <div>

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                        />

                    </div>


                    {/* Age */}

                    <div>

                        <label>Age</label>

                        <input
                            type="number"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                        />

                    </div>


                    {/* Gender */}

                    <div>

                        <label>Gender</label>

                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        >

                            <option value="">Select Gender</option>

                            <option value="MALE">
                                Male
                            </option>

                            <option value="FEMALE">
                                Female
                            </option>

                            <option value="OTHER">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* Status */}

                    <div>

                        <label>Status</label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        >

                            <option value="ACTIVE">
                                ACTIVE
                            </option>

                            <option value="INACTIVE">
                                INACTIVE
                            </option>

                            <option value="EXPIRED">
                                EXPIRED
                            </option>

                        </select>

                    </div>


                    {/* Address */}

                    <div className="col-span-2">

                        <label>Address</label>

                        <textarea
                            rows="3"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                        />

                    </div>


                    {/* Joining Date */}

                    <div>

                        <label>Joining Date</label>

                        <input
                            type="date"
                            name="joiningDate"
                            value={form.joiningDate}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        />

                    </div>


                    {/* Last Payment */}

                    <div>

                        <label>Last Payment Date</label>

                        <input
                            type="date"
                            name="lastPaymentDate"
                            value={form.lastPaymentDate}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        />

                    </div>


                    {/* Next Bill */}

                    <div>

                        <label>Next Bill Date</label>

                        <input
                            type="date"
                            name="nextBillDate"
                            value={form.nextBillDate}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        />

                    </div>


                    {/* Membership */}

                    <div>

                        <label>Membership Plan</label>

                        <select
                            name="membershipId"
                            value={form.membershipId}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        >

                            <option value="">
                                Select Membership
                            </option>

                            {

                                memberships.map(plan => (

                                    <option
                                        key={plan.id}
                                        value={plan.id}
                                    >

                                        {plan.planName}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>


                {/* Buttons */}

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        type="button"
                        onClick={() => navigate("/members")}
                        className="border px-5 py-3 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 text-white
                                   px-6 py-3 rounded-lg
                                   flex items-center gap-2"
                    >

                        <Save size={18} />

                        {

                            saving
                                ? "Updating..."
                                : "Save Changes"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

};

export default UpdateMember;