import { Outlet, Link } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <nav className="flex gap-4 p-4 border-b">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/workspace">Workspace</Link>
        <Link to="/export">Export</Link>
      </nav>

      <Outlet />
    </>
  );
}

export default RootLayout;
