import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfileThunk } from "../features/auth/authThunk";
import { clearError } from "../features/auth/authSlice";
import { User, Mail, ShieldCheck, Check, Loader2, ArrowLeft, Save, Sparkles } from "lucide-react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, initializing, error: apiError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(clearError());
    if (user) {
      setFormData({
        userName: user.userName || "",
        fullName: user.fullName || "",
        email: user.email || "",
      });
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.userName?.trim()) {
      newErrors.userName = "Username is required";
    } else if (formData.userName.length < 4) {
      newErrors.userName = "Username must be at least 4 characters";
    }

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isDirty = useMemo(() => {
    return (
      formData.userName !== (user?.userName || "") ||
      formData.fullName !== (user?.fullName || "") ||
      formData.email !== (user?.email || "")
    );
  }, [formData, user]);

  const handleReset = () => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        fullName: user.fullName || "",
        email: user.email || "",
      });
      setFormErrors({});
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (validate()) {
      setIsSaving(true);
      try {
        const resultAction = await dispatch(updateUserProfileThunk(formData));
        if (updateUserProfileThunk.fulfilled.match(resultAction)) {
          setSuccessMessage("Profile updated successfully!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        }
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Full-page loader during initial user fetch
  if ((loading || initializing) && !user) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative font-sans">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="flex flex-col items-center gap-3 p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-2xl">
          <Loader2 className="w-8 h-8 text-white animate-spin stroke-[1.8]" />
          <p className="text-xs font-mono text-zinc-400 tracking-wide">Loading user profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black text-zinc-100 flex overflow-hidden font-sans select-none">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none -z-0" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
                User Profile Settings
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Manage your account credentials and personal preferences.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* Profile Overview Card */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 shadow-2xl flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-indigo-600/20 shrink-0">
              {user?.userName?.slice(0, 2).toUpperCase() || "US"}
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight truncate">
                  {user?.fullName || user?.userName || "Architect User"}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono truncate">@{user?.userName || "username"}</p>
              <p className="text-xs text-zinc-500 font-mono truncate">{user?.email || "email@example.com"}</p>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">Edit Profile Information</h3>
              </div>

              {isDirty ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Unsaved Changes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-400 border border-zinc-700/80">
                  <Check className="w-3 h-3 text-emerald-400" />
                  Up to date
                </span>
              )}
            </div>

            {successMessage && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-medium font-mono text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>{successMessage}</span>
              </div>
            )}

            {apiError && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-medium font-mono text-center">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter username"
                      className={`w-full pl-10 pr-4 py-3 bg-black/60 border ${
                        formErrors.userName
                          ? "border-rose-500/80 focus:border-rose-500"
                          : "border-zinc-800/80 focus:border-zinc-700"
                      } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all duration-200 text-sm`}
                    />
                  </div>
                  {formErrors.userName && (
                    <p className="mt-1.5 text-xs text-rose-400 font-medium font-mono">
                      {formErrors.userName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter full name"
                    className={`w-full px-4 py-3 bg-black/60 border ${
                      formErrors.fullName
                        ? "border-rose-500/80 focus:border-rose-500"
                        : "border-zinc-800/80 focus:border-zinc-700"
                    } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all duration-200 text-sm`}
                  />
                  {formErrors.fullName && (
                    <p className="mt-1.5 text-xs text-rose-400 font-medium font-mono">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-3 bg-black/60 border ${
                      formErrors.email
                        ? "border-rose-500/80 focus:border-rose-500"
                        : "border-zinc-800/80 focus:border-zinc-700"
                    } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all duration-200 text-sm`}
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1.5 text-xs text-rose-400 font-medium font-mono">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                {isDirty && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium rounded-xl border border-zinc-800 text-sm transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSaving || !isDirty}
                  className="py-3 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Profile Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
