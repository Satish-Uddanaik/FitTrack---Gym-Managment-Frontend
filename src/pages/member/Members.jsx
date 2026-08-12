import { useEffect, useState } from "react";
import {
    Users,
    Plus,
    Pencil,
    Trash2,
    Search,
    RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    getAllMembers,
    deleteMember
    // searchMembers
} from "../../api/memberApi";

const Members = () => {

    const navigate = useNavigate();

    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [deletingId, setDeletingId] = useState(null);


    const loadMembers = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllMembers();

            setMembers(data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to load members."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadMembers();

    }, []);


    const handleSearch = async (e) => {

        const value = e.target.value;

        setSearch(value);

        try {

            if (value.trim() === "") {

                loadMembers();

                return;

            }

            const data = await searchMembers(value);

            setMembers(data);

        } catch (err) {

            console.log(err);

        }

    };


    const handleDelete = async (id) => {

        if (!window.confirm("Delete this member?")) {
            return;
        }

        try {

            setDeletingId(id);

            await deleteMember(id);

            setMembers((prev) =>
                prev.filter((m) => m.id !== id)
            );

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Delete failed."
            );

        } finally {

            setDeletingId(null);

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

        <div>

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-2xl font-bold">
                        Members
                    </h1>

                    <p className="text-gray-500">
                        Manage gym members
                    </p>

                </div>

                <button
                    onClick={() => navigate("/members/add")}
                    className="bg-blue-600 text-white
                               px-4 py-2 rounded-lg
                               flex items-center gap-2"
                >

                    <Plus size={18} />

                    Add Member

                </button>

            </div>


            {/* Search */}

            <div className="bg-white rounded-lg p-4 mb-5 shadow">

                <div className="relative">

                    <Search
                        className="absolute left-3 top-3.5
                                   text-gray-400"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search by member name..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-3
                                   border rounded-lg"
                    />

                </div>

            </div>


            {error &&

                <div className="bg-red-100 text-red-600
                                p-3 rounded mb-4">

                    {error}

                </div>

            }


            {/* Table */}

            <div className="bg-white rounded-lg shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th>
                                Mobile
                            </th>

                            <th>
                                Membership
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Next Bill
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            members.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center p-10"
                                        >

                                            <Users
                                                className="mx-auto
                                                           text-gray-300 mb-3"
                                                size={40}
                                            />

                                            No Members Found

                                        </td>

                                    </tr>

                                )

                                :

                                members.map(member => (

                                    <tr
                                        key={member.id}
                                        className="border-t"
                                    >

                                        <td className="p-4">

                                            <div>

                                                <p className="font-semibold">

                                                    {member.fullName}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    {member.email}

                                                </p>

                                            </div>

                                        </td>

                                        <td>

                                            {member.mobile}

                                        </td>

                                        <td>

                                            {member.membershipName}

                                        </td>

                                        <td>

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${
                                                    member.status === "ACTIVE"
                                                        ? "bg-green-100 text-green-600"
                                                        : member.status === "EXPIRED"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >

                                                {member.status}

                                            </span>

                                        </td>

                                        <td>

                                            {member.nextBillDate}

                                        </td>

                                        <td>

                                            <div className="flex gap-3">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/members/edit/${member.id}`)
                                                    }
                                                >

                                                    <Pencil
                                                        size={18}
                                                        className="text-blue-600"
                                                    />

                                                </button>

                                                <button
                                                    disabled={deletingId === member.id}
                                                    onClick={() =>
                                                        handleDelete(member.id)
                                                    }
                                                >

                                                    <Trash2
                                                        size={18}
                                                        className="text-red-600"
                                                    />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Members;