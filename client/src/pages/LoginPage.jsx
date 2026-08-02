import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
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
    {console.log(loading,"before Return")}
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
      setSuccessMessage("Login Successfull...");
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
      setTimeout(()=>{navigate("/dashboard");},2000)
      // navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-indigo-950/50 relative z-10 transition-all duration-300 hover:border-slate-700/80">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight text-center mb-6">
          Welcome Back!
        </h1>

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-medium text-center animate-fade-in">
            {successMessage}
          </div>
        )}

        {apiError && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-medium text-center">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="name@example.com"
              className={`w-full px-4 py-3 bg-slate-950/60 border ${
                errors.email
                  ? "border-rose-500/80 focus:ring-rose-500/50 focus:border-rose-500"
                  : "border-slate-800 focus:ring-indigo-500/50 focus:border-indigo-500"
              } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-slate-700 text-sm shadow-inner`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-slate-950/60 border ${
                errors.password
                  ? "border-rose-500/80 focus:ring-rose-500/50 focus:border-rose-500"
                  : "border-slate-800 focus:ring-indigo-500/50 focus:border-indigo-500"
              } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-slate-700 text-sm shadow-inner`}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-[0.99] transition-all duration-200 cursor-pointer text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
              {console.log(loading)}
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
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
