RootLayout
│
├── Landing
├── About
└── Pricing

AuthLayout
│
├── Login
└── Register

DashboardLayout
│
├── Dashboard
├── Projects
├── Export
└── Settings

WorkspaceLayout
│
└── Workspace

+--------------------------------------+
| Navbar                               |
+--------------------------------------+
|                                      |
| Landing Page                         |
|                                      |
+--------------------------------------+
| Footer                               |
+--------------------------------------+

->auth
+----------------------+
|      SchemaForge     |
|                      |
|   Login Form         |
|                      |
| Register Form        |
+----------------------+
->dashboard
+------------------------------------------+
| Top Navigation                           |
+---------+--------------------------------+
| Sidebar |                                |
|         | Dashboard Content              |
|         |                                |
+---------+--------------------------------+
->workspace
+------------------------------------------------------+
| Toolbar                                              |
+------------------------------------------------------+
| Left Panel | Canvas | Right Properties Panel         |
|            |        |                                |
|            |        |                                |
+------------------------------------------------------+
| Bottom Status Bar                                    |
+------------------------------------------------------+