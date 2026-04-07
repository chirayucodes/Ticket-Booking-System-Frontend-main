import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../queries";
import TextBox from "../../../shared/components/forms/TextBox";

interface RegisterFormValues {
  name: string;
  userId: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    defaultValues: { name: "", userId: "", password: "" },
  });

  async function handleRegister(values: RegisterFormValues) {
    await mutateAsync(values);
    navigate("/home");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117] relative overflow-hidden px-4">
      <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-15"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#F84464] rounded-full blur-[120px] opacity-15"></div>

      <div className="max-w-md w-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl z-10 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Join the club for exclusive movie deals
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleRegister)}>
          <TextBox<RegisterFormValues>
            label="Full Name"
            name="name"
            control={form.control}
            placeholder="Enter Full Name"
            rules={{ required: "Full Name is required" }}
          />

          <TextBox<RegisterFormValues>
            label="User ID"
            name="userId"
            control={form.control}
            placeholder="Enter User ID"
            rules={{ required: "User ID is required" }}
          />

          <TextBox<RegisterFormValues>
            label="Password"
            name="password"
            type="password"
            control={form.control}
            placeholder="Enter Password"
            rules={{ required: "Password is required" }}
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 bg-[#F84464] hover:bg-[#e03a58] text-white font-bold py-3.5 rounded-xl transition-all duration-300"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-gray-400 text-sm">
            Already a member?{" "}
            <Link
              to="/auth/login"
              className="text-[#F84464] font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
