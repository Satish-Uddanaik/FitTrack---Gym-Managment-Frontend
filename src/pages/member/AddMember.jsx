import { useEffect, useState } from "react";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import { addMember } from "../api/memberApi";
// import { getAllMemberships } from "../api/membershipApi";

import { addMember } from "../../api/memberApi";
import { getAllMemberships } from "../../api/membershipApi";

const AddMember = () => {

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
        status: "ACTIVE",
        membershipId: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        loadMemberships();

    }, []);

    const loadMemberships = async () => {

        try {

            const data = await getAllMemberships();

            setMemberships(data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            await addMember({
                ...form,
                age: Number(form.age),
                membershipId: Number(form.membershipId)
            });

            navigate("/members");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to add member."
            );

        } finally {

            setLoading(false);

        }

    };

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
                        Add Member
                    </h1>

                    <p className="text-gray-500">
                        Register a new gym member
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

                    <div>

                        <label>Gender</label>

                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                            required
                        >

                            <option value="">Select</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>

                        </select>

                    </div>

                    <div>

                        <label>Status</label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-1"
                        >

                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="EXPIRED">EXPIRED</option>

                        </select>

                    </div>

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
                        disabled={loading}
                        className="bg-blue-600 text-white
                                   px-6 py-3 rounded-lg
                                   flex items-center gap-2"
                    >

                        <UserPlus size={18} />

                        {loading
                            ? "Saving..."
                            : "Add Member"}

                    </button>

                </div>

            </form>

        </div>

    );

};

export default AddMember;