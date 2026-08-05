import { useNavigate } from "react-router-dom";

const QuickActions = () => {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">

                Quick Actions

            </h2>

            <div className="grid grid-cols-2 gap-4">

                <button
                    onClick={() => navigate("/members")}
                    className="bg-blue-600 text-white rounded p-3"
                >
                    Add Member
                </button>

                <button
                    onClick={() => navigate("/memberships")}
                    className="bg-green-600 text-white rounded p-3"
                >
                    Add Plan
                </button>

            </div>

        </div>

    );

};

export default QuickActions;