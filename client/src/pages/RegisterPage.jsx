import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunk.js";
import { clearError } from "../features/auth/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Layers } from "lucide-react";

function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: apiError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function validate(data) {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!data.userName?.trim()) {
      newErrors.userName = "Username is required";
    } else if (data.userName.length < 4) {
      newErrors.userName = "Username must be at least 4 characters";
    }

    if (!data.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (data.fullName.length < 4) {
      newErrors.fullName = "Full name must be at least 4 characters";
    }

    if (!data.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must be at least 8 characters with upper, lower, number, & special character";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (validate(formData)) {
      const resultAction = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(resultAction)) {
        setFormData({
          userName: "",
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setSuccessMessage(
          "Account created successfully. Redirecting to sign in..."
        );
        setTimeout(() => {
          setErrors({});
          navigate("/login");
        }, 1500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F7] flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Brand Header */}
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

      <div className="max-w-md w-full bg-[#141416] border border-[#2C2C2E] rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-1 mb-6 text-center">
          <h1 className="text-xl font-semibold text-[#F5F5F7] tracking-tight">
            Create Account
          </h1>
          <p className="text-xs text-[#A1A1A6]">
            Start designing database models and exporting DDL scripts.
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

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1">
                Username
              </label>
              <input
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                type="text"
                placeholder="johndoe"
                className={`w-full px-3.5 py-2 bg-[#0B0B0D] border ${
                  errors.userName
                    ? "border-rose-500/80 focus:border-rose-500"
                    : "border-[#2C2C2E] focus:border-[#3A3A3C]"
                } rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none transition-colors text-xs`}
              />
              {errors.userName && (
                <p className="mt-1 text-[10px] text-rose-400 font-medium">
                  {errors.userName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className={`w-full px-3.5 py-2 bg-[#0B0B0D] border ${
                  errors.fullName
                    ? "border-rose-500/80 focus:border-rose-500"
                    : "border-[#2C2C2E] focus:border-[#3A3A3C]"
                } rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none transition-colors text-xs`}
              />
              {errors.fullName && (
                <p className="mt-1 text-[10px] text-rose-400 font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1">
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
              <p className="mt-1 text-[10px] text-rose-400 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1">
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
                <p className="mt-1 text-[10px] text-rose-400 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1">
                Confirm
              </label>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                className={`w-full px-3.5 py-2 bg-[#0B0B0D] border ${
                  errors.confirmPassword
                    ? "border-rose-500/80 focus:border-rose-500"
                    : "border-[#2C2C2E] focus:border-[#3A3A3C]"
                } rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none transition-colors text-xs`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-[10px] text-rose-400 font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-2 px-4 bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg shadow-sm active:scale-[0.98] transition-all cursor-pointer text-xs disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#6E6E73]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#F5F5F7] hover:underline transition-colors font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
