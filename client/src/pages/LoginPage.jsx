import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import { clearError } from "../features/auth/authSlice";
import { Loader2, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: apiError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (validate()) {
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        setFormData({
          email: "",
          password: "",
        });
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          setErrors({});
          navigate("/dashboard");
        }, 1200);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F7] flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Brand Icon Header */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2.5 mb-8 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-lg bg-[#141416] border border-[#2C2C2E] flex items-center justify-center text-indigo-400">
          <Layers className="w-4 h-4 stroke-[2.2]" />
        </div>
        <span className="font-semibold text-base tracking-tight text-[#F5F5F7]">
          SchemaForge
        </span>
      </div>

      <div className="max-w-sm w-full bg-[#141416] border border-[#2C2C2E] rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-1 mb-6 text-center">
          <h1 className="text-xl font-semibold text-[#F5F5F7] tracking-tight">
            Sign In
          </h1>
          <p className="text-xs text-[#A1A1A6]">
            Enter your credentials to access your schema models.
          </p>
        </div>

        {successMessage && (
          <div className="mb-4 p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-medium text-center">
            {successMessage}
          </div>
        )}

        {apiError && (
          <div className="mb-4 p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs font-medium text-center">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="name@example.com"
              className={`w-full px-3.5 py-2 bg-[#0B0B0D] border ${
                errors.email
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-[#2C2C2E] focus:border-[#3A3A3C]"
              } rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none transition-colors text-xs`}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-rose-400 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className={`w-full px-3.5 py-2 bg-[#0B0B0D] border ${
                errors.password
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-[#2C2C2E] focus:border-[#3A3A3C]"
              } rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none transition-colors text-xs`}
            />
            {errors.password && (
              <p className="mt-1 text-[11px] text-rose-400 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 px-4 bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg shadow-sm active:scale-[0.98] transition-all cursor-pointer text-xs disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#6E6E73]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#F5F5F7] hover:underline transition-colors font-medium"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
