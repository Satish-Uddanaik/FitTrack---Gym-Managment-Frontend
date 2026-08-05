import { useForm } from "react-hook-form";
import { register as registerApi } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {

    const {

        register,

        handleSubmit,

        formState: { errors }

    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            await registerApi(data);

            toast.success("Registration Successful");

            navigate("/login");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-lg w-[420px]">

                <h2 className="text-3xl font-bold text-center mb-6">

                    Register

                </h2>

                <form

                    onSubmit={handleSubmit(onSubmit)}

                    className="space-y-4"

                >

                    <input

                        type="text"

                        placeholder="Gym Name"

                        {...register("gymName", {

                            required: "Gym Name is required"

                        })}

                        className="w-full border rounded p-3"

                    />

                    <p className="text-red-500 text-sm">

                        {errors.gymName?.message}

                    </p>

                    <input

                        type="text"

                        placeholder="Username"

                        {...register("username", {

                            required: "Username is required"

                        })}

                        className="w-full border rounded p-3"

                    />

                    <p className="text-red-500 text-sm">

                        {errors.username?.message}

                    </p>

                    <input

                        type="email"

                        placeholder="Email"

                        {...register("email", {

                            required: "Email is required"

                        })}

                        className="w-full border rounded p-3"

                    />

                    <p className="text-red-500 text-sm">

                        {errors.email?.message}

                    </p>

                    <input

                        type="password"

                        placeholder="Password"

                        {...register("password", {

                            required: "Password is required"

                        })}

                        className="w-full border rounded p-3"

                    />

                    <p className="text-red-500 text-sm">

                        {errors.password?.message}

                    </p>

                    <button

                        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"

                    >

                        Register

                    </button>

                </form>

                <p className="mt-5 text-center">

                    Already have an account?

                    <Link

                        to="/login"

                        className="text-blue-600 ml-2"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;