import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Layers,
  Database,
  ArrowRight,
  Code,
  Copy,
  Check,
  Cpu,
  Key,
  Link2,
  Table,
  CheckCircle2,
  Terminal
} from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});

  const [activeCodeTab, setActiveCodeTab] = useState("mysql");
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleCodeSnippets = {
    mysql: `-- SchemaForge Generated MySQL DDL
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;`,
    postgresql: `-- SchemaForge Generated PostgreSQL DDL
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(64) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "orders" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "total_amount" NUMERIC(10, 2) NOT NULL,
    "status" VARCHAR(32) DEFAULT 'pending',
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT "fk_orders_user" FOREIGN KEY ("user_id") 
        REFERENCES "users"("id") ON DELETE CASCADE
);`,
    mongodb: `// SchemaForge Generated Mongoose ODM Schema
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  createdAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Order: mongoose.model('Order', OrderSchema)
};`,
    sqlite: `-- SchemaForge Generated SQLite DDL
CREATE TABLE "users" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "orders" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "total_amount" NUMERIC NOT NULL,
    "status" TEXT DEFAULT 'pending',
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);`,
    sqlserver: `-- SchemaForge Generated SQL Server (T-SQL) DDL
CREATE TABLE [dbo].[users] (
    [id] INT IDENTITY(1,1) PRIMARY KEY,
    [username] NVARCHAR(64) NOT NULL UNIQUE,
    [email] NVARCHAR(255) NOT NULL UNIQUE,
    [created_at] DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE [dbo].[orders] (
    [id] INT IDENTITY(1,1) PRIMARY KEY,
    [user_id] INT NOT NULL,
    [total_amount] DECIMAL(10, 2) NOT NULL,
    [status] NVARCHAR(32) DEFAULT 'pending',
    [created_at] DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT [FK_orders_users] FOREIGN KEY ([user_id]) 
        REFERENCES [dbo].[users] ([id]) ON DELETE CASCADE
);`,
  };

  const enginesList = [
    {
      id: "postgresql",
      name: "PostgreSQL",
      badge: "Relational SQL",
      format: ".sql output",
      description: "Generates production-grade PostgreSQL DDL with typed columns, SERIAL / BIGSERIAL primary keys, and foreign keys.",
      features: ["SERIAL / UUID", "TIMESTAMPTZ", "ON DELETE CASCADE", "Check Constraints"]
    },
    {
      id: "mysql",
      name: "MySQL",
      badge: "Relational SQL",
      format: ".sql output",
      description: "Outputs clean MySQL DDL configured with the InnoDB storage engine, AUTO_INCREMENT IDs, and strict foreign keys.",
      features: ["ENGINE=InnoDB", "AUTO_INCREMENT", "ENUM types", "Foreign Keys"]
    },
    {
      id: "mongodb",
      name: "MongoDB",
      badge: "NoSQL ODM",
      format: ".js Mongoose",
      description: "Transpiles entity schemas into production-ready Mongoose ODM schema definitions with validations and model exports.",
      features: ["Mongoose.Schema", "ObjectId Refs", "Timestamps", "Validation Rules"]
    },
    {
      id: "sqlite",
      name: "SQLite",
      badge: "Embedded SQL",
      format: ".sql output",
      description: "Exports lightweight, standalone SQLite schema scripts perfect for local development, edge apps, and mobile testing.",
      features: ["AUTOINCREMENT", "Inline Primary Keys", "Foreign Keys", "Zero-config"]
    },
    {
      id: "sqlserver",
      name: "SQL Server",
      badge: "Enterprise T-SQL",
      format: ".sql output",
      description: "Generates Microsoft SQL Server scripts with bracketed identifiers, IDENTITY column definitions, and DATETIME2 types.",
      features: ["[Bracketed] Names", "IDENTITY(1,1)", "DATETIME2", "FK Constraints"]
    },
    {
      id: "json",
      name: "JSON AST Graph",
      badge: "Portable AST",
      format: ".json schema",
      description: "Full raw schema node graph export for version control backups, REST API consumption, CI/CD, or custom code generation.",
      features: ["Portable Nodes", "Position Coordinates", "Full Field Metadata", "Relations"]
    }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCodeSnippets[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleStart = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F7] font-sans selection:bg-indigo-600 selection:text-white">
      {/* Editorial Navigation Header */}
      <header className="border-b border-[#2C2C2E] bg-[#0B0B0D]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-7 h-7 rounded-lg bg-[#141416] border border-[#2C2C2E] flex items-center justify-center text-indigo-400">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#F5F5F7]">
              SchemaForge
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-[#A1A1A6]">
            <a href="#editor" className="hover:text-[#F5F5F7] transition-colors">Workspace</a>
            <a href="#features" className="hover:text-[#F5F5F7] transition-colors">Capabilities</a>
            <a href="#engines" className="hover:text-[#F5F5F7] transition-colors">Engines</a>
            <a href="#code" className="hover:text-[#F5F5F7] transition-colors">Live Output</a>
          </nav>

          <div className="flex items-center gap-2.5">
            {user ? (
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg px-3.5 py-1.5 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[#A1A1A6] hover:text-[#F5F5F7] font-medium text-xs px-3 py-1.5 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg px-3.5 py-1.5 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 max-w-4xl mx-auto text-center space-y-6">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#A1A1A6] bg-[#141416] border border-[#2C2C2E]">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span>Visual Database Engineering</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#F5F5F7] leading-[1.12]">
          Design database schemas visually. Export production DDL code.
        </h1>

        {/* Subtitle */}
        <p className="text-[#A1A1A6] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          SchemaForge provides an intuitive visual modeling canvas to build entity-relationship diagrams and instantly generate optimized DDL scripts for SQL and NoSQL engines.
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg px-5 py-2.5 text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/templates")}
            className="w-full sm:w-auto bg-[#141416] hover:bg-[#1C1C1F] text-[#F5F5F7] border border-[#2C2C2E] rounded-lg px-4 py-2.5 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Explore Starter Templates</span>
          </button>
        </div>

        {/* Engine Tags */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#A1A1A6]">
          <span className="text-[#6E6E73] text-[11px] mr-1">Engines:</span>
          {["MySQL", "PostgreSQL", "MongoDB", "SQLite", "SQL Server"].map((db) => (
            <span key={db} className="px-2.5 py-0.5 rounded-md bg-[#141416] border border-[#2C2C2E] text-xs">
              {db}
            </span>
          ))}
        </div>
      </section>

      {/* Product Hero: IDE Workspace Preview */}
      <section id="editor" className="px-6 max-w-5xl mx-auto pb-24 scroll-mt-16">
        <div className="bg-[#141416] border border-[#2C2C2E] rounded-xl overflow-hidden shadow-2xl">
          {/* macOS Titlebar */}
          <div className="bg-[#0B0B0D] border-b border-[#2C2C2E] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C2C2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C2C2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2C2C2E]" />
              <span className="text-[#A1A1A6] font-mono text-[11px] ml-2">ecommerce-core.sf</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#A1A1A6]">
              <span className="text-emerald-400 flex items-center gap-1.5 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Valid Schema
              </span>
            </div>
          </div>

          {/* Workspace Body Simulation */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0B0B0D]">
            {/* Table 1: Users */}
            <div className="bg-[#141416] border border-[#2C2C2E] rounded-lg overflow-hidden font-mono text-xs">
              <div className="bg-[#1C1C1F] px-3.5 py-2.5 border-b border-[#2C2C2E] flex items-center justify-between">
                <span className="font-semibold text-[#F5F5F7] flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-indigo-400" /> users
                </span>
                <span className="text-[10px] text-[#6E6E73]">4 columns</span>
              </div>
              <div className="p-2.5 space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center text-[#F5F5F7]">
                  <span className="flex items-center gap-1.5"><Key className="w-3 h-3 text-indigo-400" /> id</span>
                  <span className="text-[#6E6E73]">INT (PK)</span>
                </div>
                <div className="flex justify-between items-center text-[#A1A1A6]">
                  <span>username</span>
                  <span className="text-[#6E6E73]">VARCHAR(64)</span>
                </div>
                <div className="flex justify-between items-center text-[#A1A1A6]">
                  <span>email</span>
                  <span className="text-[#6E6E73]">VARCHAR(255)</span>
                </div>
                <div className="flex justify-between items-center text-[#A1A1A6]">
                  <span>created_at</span>
                  <span className="text-[#6E6E73]">TIMESTAMP</span>
                </div>
              </div>
            </div>

            {/* Table 2: Orders */}
            <div className="bg-[#141416] border border-indigo-500/50 rounded-lg overflow-hidden font-mono text-xs">
              <div className="bg-[#1C1C1F] px-3.5 py-2.5 border-b border-[#2C2C2E] flex items-center justify-between">
                <span className="font-semibold text-[#F5F5F7] flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-indigo-400" /> orders
                </span>
                <span className="text-[10px] text-indigo-400">Selected</span>
              </div>
              <div className="p-2.5 space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center text-[#F5F5F7]">
                  <span className="flex items-center gap-1.5"><Key className="w-3 h-3 text-indigo-400" /> id</span>
                  <span className="text-[#6E6E73]">INT (PK)</span>
                </div>
                <div className="flex justify-between items-center text-indigo-300">
                  <span className="flex items-center gap-1.5"><Link2 className="w-3 h-3 text-indigo-400" /> user_id</span>
                  <span className="text-indigo-400/80">INT (FK)</span>
                </div>
                <div className="flex justify-between items-center text-[#A1A1A6]">
                  <span>total_amount</span>
                  <span className="text-[#6E6E73]">DECIMAL(10,2)</span>
                </div>
                <div className="flex justify-between items-center text-[#A1A1A6]">
                  <span>status</span>
                  <span className="text-[#6E6E73]">VARCHAR(32)</span>
                </div>
              </div>
            </div>

            {/* Table 3: Order Items */}
            <div className="bg-[#141416] border border-[#2C2C2E] rounded-lg overflow-hidden font-mono text-xs">
              <div className="bg-[#1C1C1F] px-3.5 py-2.5 border-b border-[#2C2C2E] flex items-center justify-between">
                <span className="font-semibold text-[#F5F5F7] flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-indigo-400" /> order_items
                </span>
                <span className="text-[10px] text-[#6E6E73]">4 columns</span>
              </div>
              <div className="p-2.5 space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center text-[#F5F5F7]">
                  <span className="flex items-center gap-1.5"><Key className="w-3 h-3 text-indigo-400" /> id</span>
                  <span className="text-[#6E6E73]">INT (PK)</span>
                </div>
                <div className="flex justify-between items-center text-indigo-300">
                  <span className="flex items-center gap-1.5"><Link2 className="w-3 h-3 text-indigo-400" /> order_id</span>
                  <span className="text-indigo-400/80">INT (FK)</span>
                </div>
                <div className="flex justify-between items-center text-[#A1A1A6]">
                  <span>product_id</span>
                  <span className="text-[#6E6E73]">INT (FK)</span>
                </div>
                <div className="flex justify-between items-center text-[#A1A1A6]">
                  <span>quantity</span>
                  <span className="text-[#6E6E73]">INT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities / Structure Section */}
      <section id="features" className="border-t border-[#2C2C2E] py-20 px-6 max-w-5xl mx-auto space-y-12 scroll-mt-16">
        <div className="space-y-2">
          <h2 className="text-xs font-mono uppercase text-[#A1A1A6] tracking-wider">Architecture</h2>
          <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
            Engineered for developers who care about precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[#F5F5F7]">Visual ER Modeling</h3>
            <p className="text-xs text-[#A1A1A6] leading-relaxed">
              Design tables, define data types, configure default values, and create primary or foreign key connections on an infinite canvas.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[#F5F5F7]">5 Native Generator Engines</h3>
            <p className="text-xs text-[#A1A1A6] leading-relaxed">
              Output dialect-accurate SQL statements for MySQL, PostgreSQL, SQLite, SQL Server, or Mongoose schema definitions.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[#F5F5F7]">Starter Schema Library</h3>
            <p className="text-xs text-[#A1A1A6] leading-relaxed">
              Instant access to production-ready database schemas for E-Commerce, Blog CMS, Authentication, Healthcare, and Social systems.
            </p>
          </div>
        </div>
      </section>

      {/* Database Engines Section */}
      <section id="engines" className="border-t border-[#2C2C2E] py-20 px-6 max-w-5xl mx-auto space-y-10 scroll-mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase text-[#A1A1A6] tracking-wider">Dialects & Targets</h2>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
              Supported Database Engines
            </p>
            <p className="text-xs sm:text-sm text-[#A1A1A6] max-w-2xl leading-relaxed">
              Design once on the visual canvas. SchemaForge transpiles your entities, foreign keys, indexes, and constraints into dialect-accurate DDL code for your target stack.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#A1A1A6] bg-[#141416] border border-[#2C2C2E] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side Transpilation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enginesList.map((engine) => (
            <div
              key={engine.id}
              onClick={() => {
                if (sampleCodeSnippets[engine.id]) {
                  setActiveCodeTab(engine.id);
                  document.getElementById("code")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group bg-[#141416] hover:bg-[#18181B] border border-[#2C2C2E] hover:border-[#3A3A3C] p-5 rounded-xl transition-all duration-200 flex flex-col justify-between cursor-pointer space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wide font-semibold text-[#F5F5F7] flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-indigo-400" />
                    {engine.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#A1A1A6] bg-[#1C1C1F] border border-[#2C2C2E] px-2 py-0.5 rounded">
                    {engine.badge}
                  </span>
                </div>
                <p className="text-xs text-[#A1A1A6] leading-relaxed">
                  {engine.description}
                </p>
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {engine.features.map((feat, idx) => (
                    <span key={idx} className="text-[10px] font-mono text-[#6E6E73] group-hover:text-[#A1A1A6] bg-[#0B0B0D] px-2 py-0.5 rounded border border-[#2C2C2E] transition-colors">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#2C2C2E]/60 flex items-center justify-between text-[11px] font-mono text-indigo-400 group-hover:text-indigo-300">
                <span>{engine.format}</span>
                {sampleCodeSnippets[engine.id] ? (
                  <span className="flex items-center gap-1">
                    View Output <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                ) : (
                  <span className="text-[#6E6E73]">Standard AST</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Code Preview Section */}
      <section id="code" className="border-t border-[#2C2C2E] py-20 px-6 max-w-5xl mx-auto space-y-8 scroll-mt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase text-[#A1A1A6] tracking-wider">Generation</h2>
            <p className="text-2xl font-semibold tracking-tight text-[#F5F5F7]">Production DDL in real-time</p>
          </div>

          <div className="flex items-center gap-1 bg-[#141416] p-1 rounded-lg border border-[#2C2C2E]">
            {["mysql", "postgresql", "mongodb", "sqlite", "sqlserver"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCodeTab(tab)}
                className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition-all cursor-pointer ${
                  activeCodeTab === tab
                    ? "bg-[#1C1C1F] text-[#F5F5F7] border border-[#2C2C2E]"
                    : "text-[#6E6E73] hover:text-[#A1A1A6]"
                }`}
              >
                {tab === "sqlserver" ? "SQL Server" : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#141416] border border-[#2C2C2E] rounded-xl overflow-hidden">
          <div className="bg-[#1C1C1F] px-4 py-2.5 border-b border-[#2C2C2E] flex items-center justify-between">
            <span className="font-mono text-xs text-[#A1A1A6]">
              schema-export.{activeCodeTab === "mongodb" ? "js" : "sql"}
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#141416] hover:bg-[#242428] text-xs font-mono text-[#F5F5F7] border border-[#2C2C2E] transition-all cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <pre className="p-4 font-mono text-xs text-[#A1A1A6] bg-[#0B0B0D] overflow-x-auto leading-relaxed">
            <code>{sampleCodeSnippets[activeCodeTab]}</code>
          </pre>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="border-t border-[#2C2C2E] py-10 px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6E73]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="font-medium text-[#F5F5F7]">SchemaForge</span>
          <span>— Visual Database Studio</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <button onClick={() => navigate("/dashboard")} className="hover:text-[#F5F5F7] cursor-pointer">Workspace</button>
          <button onClick={() => navigate("/templates")} className="hover:text-[#F5F5F7] cursor-pointer">Templates</button>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;