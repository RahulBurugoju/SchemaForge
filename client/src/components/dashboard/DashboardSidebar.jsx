import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  LayoutGrid,
  Download,
  User,
  Home,
  LogOut,
  Layers,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { logoutUser } from "../../features/auth/authThunk";

function DashboardSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      label: "Templates",
      path: "/templates",
      icon: LayoutGrid,
      badge: "6 Starter"
    },
    {
      label: "Export Center",
      path: "/export",
      icon: Download,
      badge: "DDL"
    },
    {
      label: "User Profile",
      path: "/profile",
      icon: User,
      badge: null
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-zinc-950/90 border-r border-zinc-800/80 flex flex-col justify-between p-4 h-full select-none font-sans">
      <div className="space-y-6">
        {/* Brand Header */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-2 py-1.5 cursor-pointer group"
          title="Return to Home Landing Page"
        >
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">
              SchemaForge
            </span>
            <span className="text-[10px] font-mono text-zinc-500 block uppercase">
              DDL & ER Architect
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <p className="px-3 text-[10px] font-mono font-semibold uppercase text-zinc-500 tracking-wider mb-2">
            Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent"
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:translate-x-0.5 transition-transform" />
                )}
              </NavLink>
            );
          })}

          <NavLink
            to="/"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent transition-all"
          >
            <Home className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Landing Page</span>
          </NavLink>
        </nav>
      </div>

      {/* User Quick Profile & Logout */}
      <div className="space-y-3 pt-4 border-t border-zinc-800/80">
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-inner">
            {user?.userName?.slice(0, 2).toUpperCase() || "US"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-200 truncate">
              {user?.fullName || user?.userName || "User"}
            </p>
            <p className="text-[10px] text-zinc-400 font-mono truncate">
              {user?.email || "user@schemaforge.com"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-rose-500/10 border border-zinc-800 hover:border-rose-500/30 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
