import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import { clearError } from "../features/auth/authSlice";
import { Loader2 } from "lucide-react";
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

    if (!validate()) return;

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      setSuccessMessage("Login successful...");
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-indigo-600 selection:text-white">
      {/* Overhead radial ambient light sources */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[250px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none -z-0" />

      <div className="max-w-md w-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl shadow-indigo-950/40 relative z-10 hover:border-zinc-700/80 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight text-center mb-6">
          Welcome Back!
        </h1>

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-medium text-center animate-fade-in font-mono">
            {successMessage}
          </div>
        )}

        {apiError && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-medium text-center font-mono">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="name@example.com"
              className={`w-full px-4 py-3 bg-black/60 border ${
                errors.email
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-zinc-800/80 focus:border-zinc-700"
              } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all duration-200 text-sm`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium font-mono">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-black/60 border ${
                errors.password
                  ? "border-rose-500/80 focus:border-rose-500"
                  : "border-zinc-800/80 focus:border-zinc-700"
              } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all duration-200 text-sm`}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium font-mono">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-400 font-mono">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
