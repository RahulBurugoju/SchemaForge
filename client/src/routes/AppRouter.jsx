import {createBrowserRouter,RouterProvider} from "react-router-dom"
import LandingPage from '../pages/LandingPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import DashboardPage from '../pages/DashboardPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import WorkspacePage from '../pages/WorkspacePage.jsx'
import ExportPage from '../pages/ExportPage.jsx'
import SettingsPage from '../pages/SettingsPage.jsx'
import RootLayout from '../layouts/RootLayout.jsx'




function AppRouter() {

 const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "workspace",
        element: <WorkspacePage />,
      },
      {
        path: "export",
        element: <ExportPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRouter