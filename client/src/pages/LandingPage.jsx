import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Layers,
  Database,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Layout,
  Code,
  Copy,
  Check,
  Cpu,
  Key,
  Link2,
} from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});

  const [activeCodeTab, setActiveCodeTab] = useState("mysql");
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleCodeSnippets = {
    mysql: `CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);`,
    postgresql: `CREATE TABLE "Users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Orders" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "total_amount" DECIMAL(10, 2) NOT NULL,
    CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "Users"("id")
);`,
    mongodb: `const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Order: mongoose.model('Order', OrderSchema)
};`,
  };

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
    <div className="min-h-screen bg-black text-zinc-100 font-sans relative selection:bg-indigo-600 selection:text-white overflow-hidden">
      {/* Background overhead radial ambient light */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none -z-0" />

      {/* Navbar Header */}
      <header className="border-b border-zinc-800/80 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-600/20">
              <Layers className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              SchemaForge
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#generators" className="hover:text-white transition-colors">Generators</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#code" className="hover:text-white transition-colors">Live Code</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl px-4 py-2 text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-zinc-300 hover:text-white font-medium text-xs px-3 py-2 transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl px-4 py-2 text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
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
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 text-center space-y-8">
        {/* Badge Banner */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900/90 text-indigo-300 border border-zinc-800 shadow-xl">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Visual Database Modeling & Multi-Engine Export</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.1]">
          Design Database Schemas Visually.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Export DDL Code Instantly.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
          SchemaForge empowers developers and database architects to model ER diagrams on an interactive infinite canvas and export production-ready SQL scripts for MySQL, PostgreSQL, MongoDB, SQLite, and SQL Server.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl px-8 py-3.5 text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Modeling Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/templates")}
            className="w-full sm:w-auto bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl px-6 py-3.5 text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Layout className="w-4 h-4 text-indigo-400" />
            <span>Explore Starter Templates</span>
          </button>
        </div>

        {/* Engine Pills Showcase */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500 uppercase font-semibold text-[10px] tracking-wider mr-2">Supported Databases:</span>
          {["MySQL", "PostgreSQL", "MongoDB", "SQLite", "SQL Server"].map((db) => (
            <span key={db} className="px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              {db}
            </span>
          ))}
        </div>

        {/* IDE Visual Editor Showcase Card */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-indigo-950/40 relative overflow-hidden group">
            {/* Header bar mock */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-zinc-400 font-mono text-[11px] ml-2">SchemaForge Editor — E-Commerce Core</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>

            {/* Mock Visual Grid Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left font-sans py-2">
              {/* Users Node */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-xs text-white font-mono flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" /> Users
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">4 cols</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between items-center text-white"><span className="flex items-center gap-1"><Key className="w-3 h-3 text-purple-400" /> id</span><span className="text-[10px] text-slate-500">INT (PK)</span></div>
                  <div className="flex justify-between items-center"><span>username</span><span className="text-[10px] text-slate-500">VARCHAR</span></div>
                  <div className="flex justify-between items-center"><span>email</span><span className="text-[10px] text-slate-500">VARCHAR</span></div>
                  <div className="flex justify-between items-center"><span>created_at</span><span className="text-[10px] text-slate-500">TIMESTAMP</span></div>
                </div>
              </div>

              {/* Orders Node */}
              <div className="bg-slate-900 border border-indigo-500/80 ring-1 ring-indigo-500/30 rounded-xl p-3.5 space-y-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-xs text-white font-mono flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" /> Orders
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono">Selected</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between items-center text-white"><span className="flex items-center gap-1"><Key className="w-3 h-3 text-purple-400" /> id</span><span className="text-[10px] text-slate-500">INT (PK)</span></div>
                  <div className="flex justify-between items-center text-sky-300"><span className="flex items-center gap-1"><Link2 className="w-3 h-3 text-sky-400" /> user_id</span><span className="text-[10px] text-sky-400">INT (FK)</span></div>
                  <div className="flex justify-between items-center"><span>total_amount</span><span className="text-[10px] text-slate-500">DECIMAL</span></div>
                  <div className="flex justify-between items-center"><span>status</span><span className="text-[10px] text-slate-500">VARCHAR</span></div>
                </div>
              </div>

              {/* Products Node */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-xs text-white font-mono flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" /> Products
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">4 cols</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between items-center text-white"><span className="flex items-center gap-1"><Key className="w-3 h-3 text-purple-400" /> id</span><span className="text-[10px] text-slate-500">INT (PK)</span></div>
                  <div className="flex justify-between items-center"><span>title</span><span className="text-[10px] text-slate-500">VARCHAR</span></div>
                  <div className="flex justify-between items-center"><span>price</span><span className="text-[10px] text-slate-500">DECIMAL</span></div>
                  <div className="flex justify-between items-center"><span>stock</span><span className="text-[10px] text-slate-500">INT</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-t border-zinc-800/80">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Architectural Features</h2>
          <p className="text-3xl font-extrabold text-white tracking-tight">Everything You Need to Model & Export</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 space-y-3 hover:border-zinc-700 transition-all">
            <div className="p-3 w-fit bg-zinc-900 border border-zinc-800 rounded-xl text-indigo-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">Visual ERD Editor</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Drag-and-drop tables, customize field datatypes, and establish primary/foreign key connections with visual smoothstep edge handles.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 space-y-3 hover:border-zinc-700 transition-all">
            <div className="p-3 w-fit bg-zinc-900 border border-zinc-800 rounded-xl text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">5 Generator Engines</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Automatically translate visual diagrams into MySQL, PostgreSQL, SQLite, SQL Server DDL, or Mongoose JavaScript schemas.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 space-y-3 hover:border-zinc-700 transition-all">
            <div className="p-3 w-fit bg-zinc-900 border border-zinc-800 rounded-xl text-indigo-400">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">Starter Schema Gallery</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Skip setup with industry starter templates for E-Commerce, Blog CMS, Healthcare, Education, and Social Networks.
            </p>
          </div>
        </div>
      </section>

      {/* Generators Section */}
      <section id="generators" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-t border-zinc-800/80">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">DDL Export Engines</h2>
          <p className="text-3xl font-extrabold text-white tracking-tight">5 Production-Ready DDL Generators</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">MySQL Generator</span>
            <p className="text-zinc-400 text-xs">Produces CREATE TABLE statements with AUTO_INCREMENT, primary keys, and foreign key constraints.</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">PostgreSQL Generator</span>
            <p className="text-zinc-400 text-xs">Generates enterprise DDL with double-quoted identifiers, SERIAL primary keys, and constraint checks.</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">MongoDB Generator</span>
            <p className="text-zinc-400 text-xs">Outputs clean Mongoose JavaScript schema files with Schema definitions and ObjectId references.</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">SQLite Generator</span>
            <p className="text-zinc-400 text-xs">Outputs lightweight SQLite DDL with INTEGER PRIMARY KEY AUTOINCREMENT and normalized typings.</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">SQL Server Generator</span>
            <p className="text-zinc-400 text-xs">Generates T-SQL with bracketed [Identifiers], IDENTITY(1,1) columns, and DATETIME2 types.</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">JSON Export</span>
            <p className="text-zinc-400 text-xs">Exports full raw canvas model JSON for version control backup, REST APIs, or migration tools.</p>
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 border-t border-zinc-800/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Starter Schema Gallery</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">Launch Database Models in Seconds</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/templates")}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>Browse Full Template Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 space-y-3 hover:border-zinc-700 transition-all">
            <span className="text-[10px] font-mono uppercase bg-zinc-900 text-indigo-400 px-2.5 py-0.5 rounded-full border border-zinc-800">MySQL Engine</span>
            <h3 className="text-base font-semibold text-white">E-Commerce Core</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Users, Products, Categories, Orders, and OrderItems schemas with FK constraints.</p>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 space-y-3 hover:border-zinc-700 transition-all">
            <span className="text-[10px] font-mono uppercase bg-zinc-900 text-indigo-400 px-2.5 py-0.5 rounded-full border border-zinc-800">PostgreSQL</span>
            <h3 className="text-base font-semibold text-white">Blog & CMS Platform</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Authors, Posts, Comments, Tags, and PostTags junction tables with SERIAL primary keys.</p>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 space-y-3 hover:border-zinc-700 transition-all">
            <span className="text-[10px] font-mono uppercase bg-zinc-900 text-indigo-400 px-2.5 py-0.5 rounded-full border border-zinc-800">MongoDB Store</span>
            <h3 className="text-base font-semibold text-white">Social Network</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Users, Posts, Comments, and Followers Mongoose collections with ObjectId refs.</p>
          </div>
        </div>
      </section>

      {/* Code Generator Live Preview Section */}
      <section id="code" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 border-t border-zinc-800/80">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Multi-Database Code Generator</h2>
          <p className="text-3xl font-extrabold text-white tracking-tight">Production SQL DDL & Schemas Generated Live</p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              {["mysql", "postgresql", "mongodb"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCodeTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                    activeCodeTab === tab
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-800/80 text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-all cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Copied DDL!" : "Copy DDL"}</span>
            </button>
          </div>

          <pre className="font-mono text-xs text-indigo-200 bg-slate-950 p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-800/80">
            <code>{sampleCodeSnippets[activeCodeTab]}</code>
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2 font-mono">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-white">SchemaForge</span>
          <span>© {new Date().getFullYear()} — Visual Database Modeling Engine</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            System Operational
          </span>
          <button onClick={() => navigate("/dashboard")} className="hover:text-white cursor-pointer">Dashboard</button>
          <button onClick={() => navigate("/templates")} className="hover:text-white cursor-pointer">Templates</button>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;