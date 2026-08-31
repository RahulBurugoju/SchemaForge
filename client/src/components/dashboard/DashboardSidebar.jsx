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
      label: "Workspace",
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
      label: "Export DDL",
      path: "/export",
      icon: Download,
      badge: null
    },
    {
      label: "Account Settings",
      path: "/profile",
      icon: User,
      badge: null
    }
  ];

  return (
    <aside className="w-60 shrink-0 bg-[#141416] border-r border-[#2C2C2E] flex flex-col justify-between p-3.5 h-full select-none font-sans">
      <div className="space-y-5">
        {/* Brand Header */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 px-2 py-1.5 cursor-pointer rounded-lg hover:bg-[#1C1C1F] transition-colors"
          title="Return to Home Landing Page"
        >
          <div className="w-7 h-7 rounded-md bg-[#1C1C1F] border border-[#2C2C2E] flex items-center justify-center text-indigo-400">
            <Layers className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-[#F5F5F7] block leading-none">
              SchemaForge
            </span>
            <span className="text-[10px] font-mono text-[#6E6E73] block mt-0.5">
              Studio
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <p className="px-2.5 text-[10px] font-mono font-medium uppercase text-[#6E6E73] tracking-wider mb-1.5">
            Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#1C1C1F] text-[#F5F5F7] border border-[#2C2C2E]"
                      : "text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#1C1C1F]/60 border border-transparent"
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#A1A1A6] shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0B0B0D] text-[#A1A1A6] border border-[#2C2C2E]">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-3 h-3 text-[#6E6E73]" />
                )}
              </NavLink>
            );
          })}

          <NavLink
            to="/"
            className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#1C1C1F]/60 border border-transparent transition-colors"
          >
            <Home className="w-4 h-4 text-[#A1A1A6] shrink-0" />
            <span>Landing Page</span>
          </NavLink>
        </nav>
      </div>

      {/* User Profile & Logout */}
      <div className="space-y-2 pt-3 border-t border-[#2C2C2E]">
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2.5 p-2 rounded-lg bg-[#1C1C1F] border border-[#2C2C2E] hover:border-[#3A3A3C] transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-md bg-[#242428] border border-[#2C2C2E] flex items-center justify-center font-medium text-[#F5F5F7] text-xs">
            {user?.userName?.slice(0, 2).toUpperCase() || "SF"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#F5F5F7] truncate leading-tight">
              {user?.fullName || user?.userName || "Developer"}
            </p>
            <p className="text-[10px] text-[#6E6E73] font-mono truncate">
              {user?.email || "architect@schemaforge.dev"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#1C1C1F] border border-transparent transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
