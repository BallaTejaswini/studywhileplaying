
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FireBaseConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePop {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes modeCardPop {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .nav-link:hover { color: #7B2FBE !important; }
        .start-btn:hover { transform: scale(1.04); }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(123,47,190,0.15) !important;
        }
        .feature-card { transition: all 0.2s; }
        .signout-btn-top:hover { background: #fee2e2 !important; color: #dc2626 !important; }
        .toggle-btn:hover { transform: scale(1.05); }

        /* ── MODE BUTTONS ── */
        .mode-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0 0 40px;
          animation: modeCardPop 0.55s ease both;
          animation-delay: 0.15s;
        }
        .mode-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          border-radius: 16px;
          padding: 20px 28px;
          min-width: 150px;
          cursor: pointer;
          font-weight: 700;
          font-size: 15px;
          border: 2px solid transparent;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
          position: relative;
          overflow: hidden;
        }
        .mode-card::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.18s;
          border-radius: 14px;
        }
        .mode-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.18);
        }
        .mode-card:active { transform: scale(0.97); }
        .mode-card .mode-icon { font-size: 30px; line-height: 1; }
        .mode-card .mode-label { font-size: 14px; font-weight: 800; letter-spacing: 0.02em; }
        .mode-card .mode-sub  { font-size: 11px; font-weight: 500; opacity: 0.75; }

        .mode-card-pnp {
          background: linear-gradient(135deg, #7B2FBE 0%, #a855f7 100%);
          color: #fff;
          box-shadow: 0 4px 18px rgba(123,47,190,0.35);
        }
        .mode-card-pnp:hover { border-color: #c084fc; box-shadow: 0 10px 32px rgba(123,47,190,0.45); }

        .mode-card-cpu {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
          color: #fff;
          box-shadow: 0 4px 18px rgba(15,23,42,0.35);
        }
        .mode-card-cpu:hover { border-color: #38bdf8; box-shadow: 0 10px 32px rgba(56,189,248,0.3); }

        .mode-card-pnp.dark-card {
          background: linear-gradient(135deg, #581c87 0%, #7e22ce 100%);
        }
        .mode-card-cpu.dark-card {
          background: linear-gradient(135deg, #0c1527 0%, #0f2d4a 100%);
        }

        .mode-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #FF4D8D;
          color: #fff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.05em;
          border-radius: 99px;
          padding: 2px 7px;
          text-transform: uppercase;
        }

        /* ── NAVBAR ── */
        .home-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 60px;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: background 0.3s, border 0.3s;
        }

        .nav-brand-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .nav-brand-text {
          font-weight: 800;
          font-size: 16px;
          white-space: nowrap;
        }
        .nav-center {
          display: flex;
          gap: 28px;
        }
        .nav-right-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .user-email-nav {
          font-size: 12px;
          max-width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s;
        }
        .signout-btn-top {
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .hamburger-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px;
          flex-shrink: 0;
        }
        .hamburger-btn span {
          display: block;
          width: 22px;
          height: 2px;
          border-radius: 99px;
          transition: background 0.3s;
        }

        .mobile-dropdown {
          display: none;
          position: sticky;
          top: 60px;
          z-index: 99;
          flex-direction: column;
          padding: 12px 20px;
          gap: 4px;
          transition: background 0.3s;
        }
        .mobile-dropdown.open { display: flex; }
        .mobile-menu-item {
          padding: 12px 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          border-radius: 8px;
        }
        .mobile-menu-item:last-child { border-bottom: none; }
        .mobile-menu-item:hover { background: rgba(123,47,190,0.08); color: #7B2FBE !important; }

        /* ── HERO ── */
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 72px 24px 60px;
          animation: fadeInUp 0.6s ease both;
        }
        .btn-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 32px;
        }
        .stats-row {
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .mode-section-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        /* ── FEATURES ── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 960px;
          margin: 0 auto;
        }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .home-nav { padding: 0 20px; }
          .nav-center { display: none; }
          .user-email-nav { display: none; }
          .hamburger-btn { display: flex; }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── MOBILE ── */
        @media (max-width: 600px) {
          .home-nav { padding: 0 16px; height: 56px; }
          .nav-brand-text { font-size: 14px; }
          .hero-section { padding: 40px 16px 36px; }
          .btn-row { flex-direction: column; align-items: center; }
          .btn-row button { width: 100% !important; max-width: 300px; }
          .mode-row { flex-direction: column; align-items: center; }
          .mode-card { width: 100%; max-width: 300px; flex-direction: row; justify-content: center; gap: 12px; padding: 16px 24px; }
          .mode-card .mode-icon { font-size: 24px; }
          .features-grid { grid-template-columns: 1fr; }
          .stats-row { gap: 16px; }
          .stat-divider { display: none !important; }
          .features-section-inner { padding: 40px 16px !important; }
          .toggle-text { display: none; }
          .toggle-btn { padding: 6px 8px; }
          .signout-btn-top { padding: 6px 10px; font-size: 11px; }
        }

        /* ── LARGE DESKTOP ── */
        @media (min-width: 1200px) {
          .home-nav { padding: 0 80px; }
          .features-grid { max-width: 1100px; grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: dark ? "#0f0f0f" : "#f5f0eb",
        fontFamily: "'Segoe UI', sans-serif",
        color: dark ? "#fff" : "#111",
        transition: "background 0.3s, color 0.3s",
      }}>

        {/* ── NAVBAR ── */}
        <nav
          className="home-nav"
          style={{
            background: dark ? "#1a1a1a" : "#ffffff",
            borderBottom: dark ? "1px solid #333" : "1px solid #e5e7eb",
          }}
        >
          <div className="nav-brand-wrap">
            <span style={{ fontSize: "20px" }}>🎮</span>
            <span className="nav-brand-text" style={{ color: dark ? "#fff" : "#111" }}>
              Code While Playing
            </span>
          </div>

          <div className="nav-center">
            <span className="nav-link" style={{ fontSize: "15px", cursor: "pointer", fontWeight: "500", color: dark ? "#ccc" : "#555" }}
              onClick={() => navigate("/games")}>
              Games
            </span>
            <span className="nav-link" style={{ fontSize: "15px", cursor: "pointer", fontWeight: "500", color: dark ? "#ccc" : "#555" }}
              onClick={() => navigate("/profile")}>
              Profile
            </span>
          </div>

          <div className="nav-right-wrap">
            <span className="user-email-nav" style={{ color: dark ? "#aaa" : "#888" }}>
              {user?.displayName || user?.email}
            </span>

            <button
              className="toggle-btn"
              onClick={() => setDark(!dark)}
              style={{
                background: dark ? "#333" : "#f0f0f0",
                border: dark ? "1px solid #555" : "1px solid #e5e7eb",
                color: dark ? "#fff" : "#555",
              }}
            >
              {dark ? "☀️" : "🌙"}
              <span className="toggle-text">{dark ? "Light" : "Dark"}</span>
            </button>

            <button
              className="signout-btn-top"
              style={{
                background: dark ? "#2a2a2a" : "#f5f5f5",
                color: dark ? "#ccc" : "#555",
                border: dark ? "1px solid #444" : "1px solid #e5e7eb",
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>

            <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <span style={{ background: dark ? "#fff" : "#333" }} />
              <span style={{ background: dark ? "#fff" : "#333" }} />
              <span style={{ background: dark ? "#fff" : "#333" }} />
            </button>
          </div>
        </nav>

        {/* ── MOBILE DROPDOWN ── */}
        <div
          className={`mobile-dropdown ${menuOpen ? "open" : ""}`}
          style={{ background: dark ? "#1a1a1a" : "#fff", borderBottom: dark ? "1px solid #333" : "1px solid #e5e7eb" }}
        >
          <div className="mobile-menu-item" style={{ color: dark ? "#ccc" : "#333" }}
            onClick={() => { navigate("/games"); setMenuOpen(false); }}>
            🎮 Games
          </div>
          <div className="mobile-menu-item" style={{ color: dark ? "#ccc" : "#333" }}
            onClick={() => { navigate("/profile"); setMenuOpen(false); }}>
            👤 Profile
          </div>

          {/* ── NEW: Mode links in mobile menu too ── */}
          <div className="mobile-menu-item" style={{ color: dark ? "#c084fc" : "#7B2FBE" }}
            onClick={() =>{ localStorage.setItem("gameMode", "pass-and-play");navigate("/pass-and-play"); setMenuOpen(false); }}>
            🤝 Pass &amp; Play
          </div>
          <div className="mobile-menu-item" style={{ color: dark ? "#38bdf8" : "#0891b2" }}
            onClick={() => {localStorage.setItem("gameMode", "vs-computer");navigate("/vs-computer"); setMenuOpen(false); }}>
            🤖 vs Computer
          </div>

          <div className="mobile-menu-item" style={{ color: dark ? "#aaa" : "#888", fontSize: "13px", fontWeight: "400" }}>
            {user?.displayName || user?.email}
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="hero-section">
          <div style={{
            background: dark ? "#2d1b69" : "#ede9fe",
            color: dark ? "#c084fc" : "#7B2FBE",
            borderRadius: "99px",
            padding: "6px 18px",
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "24px",
            fontFamily: "monospace",
            animation: "badgePop 0.5s ease both",
          }}>
            &lt;Code While Playing /&gt;
          </div>

          <h1 style={{
            fontSize: "clamp(26px, 6vw, 64px)",
            fontWeight: "900",
            color: dark ? "#fff" : "#111",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}>
            Code While{" "}
            <span style={{
              background: "linear-gradient(90deg, #7B2FBE, #FF4D8D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Playing</span>
          </h1>

          <p style={{
            fontSize: "clamp(14px, 2vw, 16px)",
            color: dark ? "#aaa" : "#666",
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "36px",
          }}>
            Master programming through 5 interactive coding games.
            Quiz yourself, trace errors, and level up your skills.
          </p>

          <div className="btn-row">
            <button
              className="start-btn"
              style={{
                background: "linear-gradient(90deg, #7B2FBE, #FF4D8D)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onClick={() => navigate("/games")}
            >
              ▶ Start Playing
            </button>
            <button
              style={{
                background: dark ? "#2a2a2a" : "#fff",
                color: dark ? "#fff" : "#333",
                border: dark ? "1px solid #444" : "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={() => navigate("/games")}
            >
              📖 Browse Games
            </button>
          </div>

          {/* ── GAME MODE SELECTOR ── */}
          <p className="mode-section-label" style={{ color: dark ? "#aaa" : "#888" }}>
            Choose your mode
          </p>
          <div className="mode-row">

            {/* ── FIXED: Pass & Play now navigates to /pass-and-play ── */}
            <div
              className={`mode-card mode-card-pnp${dark ? " dark-card" : ""}`}
              onClick={() => navigate("/pass-and-play")}
              title="Take turns on the same device with a friend"
            >
              <span className="mode-icon">🤝</span>
              <span className="mode-label">Pass &amp; Play</span>
              <span className="mode-sub">2 players · same device</span>
            </div>

            {/* ── FIXED: vs Computer now navigates to /vs-computer ── */}
            <div
              className={`mode-card mode-card-cpu${dark ? " dark-card" : ""}`}
              onClick={() => navigate("/vs-computer")}
              title="Challenge the AI — can you beat the bot?"
            >
              <span className="mode-badge">AI</span>
              <span className="mode-icon">🤖</span>
              <span className="mode-label">vs Computer</span>
              <span className="mode-sub">challenge the bot</span>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            {[
              { icon: "🎮", num: "5",    label: "Games",     color: dark ? "#fff" : "#111" },
              { icon: "💻", num: "7+",   label: "Languages", color: dark ? "#fff" : "#111" },
              { icon: "❓", num: "500+", label: "Questions", color: "#e11d48" },
            ].map((s, i) => (
              <>
                {i > 0 && (
                  <div className="stat-divider" key={`div-${i}`} style={{ width: "1px", height: "48px", background: dark ? "#444" : "#ddd" }} />
                )}
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "28px" }}>{s.icon}</span>
                  <span style={{ fontSize: "28px", fontWeight: "900", color: s.color }}>{s.num}</span>
                  <span style={{ fontSize: "13px", color: dark ? "#aaa" : "#888" }}>{s.label}</span>
                </div>
              </>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ background: dark ? "#1a1a1a" : "#eee9e3", padding: "60px 24px" }} className="features-section-inner">
          <div className="features-grid">
            {[
              { icon: "▶",  color: "#7B2FBE", title: "5 Game Modes",        desc: "Quiz, Syntax, Error Tracing, Shorthand & Output guessing", click: () => navigate("/games") },
              { icon: "📖", color: "#e11d48", title: "7+ Languages",         desc: "Python, C, C++, Java, SQL, Web Dev, DSA",                  click: () => navigate("/games") },
              { icon: "🏆", color: "#d97706", title: "3 Difficulty Levels",  desc: "Easy, Medium, Hard — 10 questions each" },
              { icon: "⚡", color: "#0891b2", title: "500+ Questions",        desc: "Huge question bank updated regularly across all topics" },
              { icon: "📊", color: "#16a34a", title: "Track Progress",        desc: "See your scores, streaks and improvement over time" },
              { icon: "🎯", color: "#7B2FBE", title: "Daily Challenges",      desc: "New coding challenge every day to keep you sharp" },
            ].map((f, i) => (
              <div
                key={i}
                className="feature-card"
                onClick={f.click}
                style={{
                  background: dark ? "#2a2a2a" : "#fff",
                  boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  cursor: f.click ? "pointer" : "default",
                }}
              >
                <span style={{ fontSize: "24px", display: "block", marginBottom: "12px", color: f.color }}>{f.icon}</span>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: dark ? "#fff" : "#111", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: "13px", color: dark ? "#aaa" : "#888", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;