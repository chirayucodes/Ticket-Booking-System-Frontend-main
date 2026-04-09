import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../queries";
import TextBox from "../../../shared/components/forms/TextBox";
import { toast } from "sonner";

interface LoginFormValues {
  userId: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLoginMutation();

  const form = useForm<LoginFormValues>();

  async function handleLogin(values: LoginFormValues) {
    const response = await mutateAsync(values);
    const user = localStorage.setItem("user", JSON.stringify(response));
    console.log(user);
    navigate("/home");
    toast.success(" Welcome Back");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117] relative overflow-hidden px-4">
      <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-[#F84464] rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>

      <div className="max-w-md w-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl z-10 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to book your favorite shows
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleLogin)}>
          <TextBox<LoginFormValues>
            label="User ID"
            name="userId"
            control={form.control}
            placeholder="Enter your user ID"
            rules={{ required: "User ID is required" }}
          />

          <TextBox<LoginFormValues>
            label="Password"
            name="password"
            type="password"
            control={form.control}
            placeholder="••••••••"
            rules={{ required: "Password is required" }}
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 bg-[#F84464] hover:bg-[#e03a58] text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_8px_30px_rgb(248,68,100,0.2)]"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-[#F84464] font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
