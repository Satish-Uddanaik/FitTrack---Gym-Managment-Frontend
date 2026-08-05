import useAuth from "../hooks/useAuth";

const Navbar = () => {

    const { user } = useAuth();

    return (

        <div className="h-16 bg-white shadow flex justify-between items-center px-8">

            <h1 className="text-2xl font-semibold">

                Gym Management System

            </h1>

            <div className="text-right">

                <p className="font-semibold">

                    {user?.username}

                </p>

                <p className="text-sm text-gray-500">

                    {user?.email}

                </p>

            </div>

        </div>

    );

};

export default Navbar;