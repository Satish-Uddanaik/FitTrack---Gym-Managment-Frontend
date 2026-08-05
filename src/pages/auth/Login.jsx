import { useForm } from "react-hook-form";
import { login as loginApi } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { login } = useAuth();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            const response = await loginApi(data);

            login(response);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-lg w-96">

                <h2 className="text-3xl font-bold text-center mb-6">

                    Login

                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>

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

                    </div>

                    <div>

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

                    </div>

                    <button

                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"

                    >

                        Login

                    </button>

                </form>

                <p className="mt-5 text-center">

                    Don't have an account?

                    <Link

                        to="/register"

                        className="text-blue-600 ml-2"

                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;