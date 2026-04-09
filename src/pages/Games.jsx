

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FireBaseConfig";


const games = [
  {
    id: 1,
    title: "QUIZ MASTER",
    route: "quiz",
    desc: "Test your coding knowledge with MCQ questions",
    icon: "🧠",
    levels: "3 Levels • 30 Questions",
    bg: "linear-gradient(135deg, #7B2FBE, #9B59B6)",
  },
  {
    id: 2,
    title: "GUESS THE SYNTAX",
    route: "syntax",
    desc: "Fill in the missing syntax to complete the code",
    icon: "📝",
    levels: "3 Levels • 30 Questions",
    bg: "linear-gradient(135deg, #e11d48, #FF4D8D)",
  },
  {
    id: 3,
    title: "TRACE THE ERROR",
    route: "error",
    desc: "Find the bug in the code snippet",
    icon: "🐛",
    levels: "3 Levels • 30 Questions",
    bg: "linear-gradient(135deg, #0891b2, #06b6d4)",
  },
  {
    id: 4,
    title: "SHORTEN THE SYNTAX",
    route: "shorten",
    desc: "Pick the shorthand or optimized version",
    icon: "✂️",
    levels: "3 Levels • 30 Questions",
    bg: "linear-gradient(135deg, #ea580c, #f97316)",
  },
  {
    id: 5,
    title: "GUESS THE OUTPUT",
    route: "output",
    desc: "Predict what the code will print",
    icon: "💻",
    levels: "3 Levels • 30 Questions",
    bg: "linear-gradient(135deg, #16a34a, #22c55e)",
  },
];

const Games = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("cwp-theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("cwp-theme", dark ? "dark" : "light");
  }, [dark]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <style>{`
        :root {
          --bg-page:   #f5f0eb;
          --bg-nav:    #ffffff;
          --border:    #e5e7eb;
          --text-primary: #111111;
          --text-muted:   #888888;
          --text-nav:     #555555;
          --toggle-bg:    #e5e7eb;
          --toggle-thumb: #ffffff;
          --signout-bg:   #f5f5f5;
          --signout-color:#555555;
          --mob-border:   #f0f0f0;
          --mob-hover-bg: #f5f0ff;
          --mob-hover-cl: #7B2FBE;
          --card-shadow:  rgba(0,0,0,0.10);
          --card-shadow-h:rgba(0,0,0,0.25);
        }
        [data-theme="dark"] {
          --bg-page:   #1a1520;
          --bg-nav:    #221d2e;
          --border:    #3a3347;
          --text-primary: #f0eafa;
          --text-muted:   #9a90ae;
          --text-nav:     #c0b8d4;
          --toggle-bg:    #4a3f60;
          --toggle-thumb: #c9b8f0;
          --signout-bg:   #2d2640;
          --signout-color:#c0b8d4;
          --mob-border:   #2d2640;
          --mob-hover-bg: #3a2f55;
          --mob-hover-cl: #c9b8f0;
          --card-shadow:  rgba(0,0,0,0.35);
          --card-shadow-h:rgba(0,0,0,0.55);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .game-card {
          animation: fadeInUp 0.5s ease both;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .game-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 40px var(--card-shadow-h) !important;
        }
        .nav-link-btn { transition: color 0.15s; }
        .nav-link-btn:hover { color: #7B2FBE !important; }

        .signout-top {
          background: var(--signout-bg) !important;
          color: var(--signout-color) !important;
          border: 1px solid var(--border) !important;
          transition: background 0.15s, color 0.15s;
        }
        .signout-top:hover { background: #fee2e2 !important; color: #dc2626 !important; }

        /* ── THEME TOGGLE ── */
        .theme-toggle {
          width: 40px; height: 22px; border-radius: 999px;
          background: var(--toggle-bg);
          border: none; cursor: pointer; position: relative;
          flex-shrink: 0; transition: background 0.25s;
        }
        .theme-toggle::after {
          content: ''; position: absolute;
          top: 3px; left: 3px;
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--toggle-thumb);
          transition: transform 0.25s;
        }
        [data-theme="dark"] .theme-toggle::after { transform: translateX(18px); }

        /* ── NAVBAR ── */
        .games-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 60px;
          background: var(--bg-nav); border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 100;
          transition: background 0.25s, border-color 0.25s;
        }
        .g-nav-left   { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .g-nav-center { display: flex; gap: 24px; align-items: center; }
        .g-nav-right  { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        .g-user-email {
          font-size: 13px; color: var(--text-muted);
          max-width: 140px; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }

        .g-hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 6px;
        }
        .g-hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--text-nav); border-radius: 99px;
          transition: transform 0.22s, opacity 0.22s;
        }

        /* ── MOBILE MENU ── */
        .g-mobile-menu {
          display: none; flex-direction: column; gap: 2px;
          padding: 10px 16px 14px;
          background: var(--bg-nav); border-bottom: 1px solid var(--border);
          position: sticky; top: 60px; z-index: 99;
          transition: background 0.25s;
        }
        .g-mobile-menu.open { display: flex; }

        .g-mobile-item {
          padding: 12px 8px; font-size: 15px; font-weight: 600;
          cursor: pointer; border-radius: 8px;
          color: var(--text-primary);
          border-bottom: 1px solid var(--mob-border);
          transition: background 0.15s, color 0.15s;
        }
        .g-mobile-item:last-of-type { border-bottom: none; }
        .g-mobile-item:hover { background: var(--mob-hover-bg); color: var(--mob-hover-cl); }

        .g-mob-theme-row {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 10px 8px; font-size: 14px; color: var(--text-muted);
          border-bottom: 1px solid var(--mob-border);
        }

        /* ── PAGE HEADER ── */
        .games-page-header { padding: 40px 40px 24px; }

        /* ── GAMES GRID ── */
        .games-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px; padding: 0 40px 40px;
        }

        /* Tablet ≤ 900px */
        @media (max-width: 900px) {
          .games-nav { padding: 0 20px; }
          .g-nav-center { display: none; }
          .g-user-email { display: none; }
          .g-hamburger { display: flex; }
          .games-grid { grid-template-columns: repeat(2, 1fr); padding: 0 20px 32px; gap: 16px; }
          .games-page-header { padding: 28px 20px 16px; }
        }

        /* Mobile ≤ 600px */
        @media (max-width: 600px) {
          .games-nav { padding: 0 14px; height: 56px; }
          .g-mobile-menu { top: 56px; }
          .games-grid { grid-template-columns: 1fr; padding: 0 14px 28px; gap: 14px; }
          .games-page-header { padding: 20px 14px 12px; }
          .g-nav-brand { font-size: 13px !important; }
          .theme-toggle { width: 34px; height: 19px; }
          .theme-toggle::after { width: 13px; height: 13px; }
          [data-theme="dark"] .theme-toggle::after { transform: translateX(15px); }
        }

        /* Large desktop ≥ 1200px */
        @media (min-width: 1200px) {
          .games-nav { padding: 0 80px; }
          .games-grid { grid-template-columns: repeat(3, 1fr); padding: 0 80px 56px; }
          .games-page-header { padding: 48px 80px 28px; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "var(--bg-page)",
        fontFamily: "'Segoe UI', sans-serif",
        transition: "background 0.25s",
      }}>

        {/* ── NAVBAR ── */}
        <nav className="games-nav">
          <div className="g-nav-left">
            <span style={{ fontSize: "20px" }}>🎮</span>
            <span className="g-nav-brand" style={{ fontWeight: "800", fontSize: "16px", color: "var(--text-primary)", whiteSpace: "nowrap" }}>
              Code While Playing
            </span>
          </div>

          <div className="g-nav-center">
            {[
              { label: "🏠 Home",    path: "/home" },
              { label: "🎮 Games",   path: "/games" },
              { label: "👤 Profile", path: "/profile" },
            ].map(({ label, path }) => (
              <span
                key={path}
                className="nav-link-btn"
                style={{ fontSize: "14px", color: "var(--text-nav)", cursor: "pointer", fontWeight: "600" }}
                onClick={() => navigate(path)}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="g-nav-right">
            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{dark ? "🌙" : "☀️"}</span>
            <button className="theme-toggle" onClick={() => setDark(d => !d)} title="Toggle theme" />
            <span className="g-user-email">{user?.displayName || user?.email}</span>
            <button
              className="signout-top"
              style={{ borderRadius: "8px", padding: "6px 12px", fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <button className="g-hamburger" onClick={() => setMenuOpen(o => !o)}>
              <span style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </nav>

        {/* ── MOBILE MENU ── */}
        <div className={`g-mobile-menu ${menuOpen ? "open" : ""}`}>
          {[
            { label: "🏠 Home",    path: "/home" },
            { label: "🎮 Games",   path: "/games" },
            { label: "👤 Profile", path: "/profile" },
          ].map(({ label, path }) => (
            <div key={path} className="g-mobile-item" onClick={() => { navigate(path); setMenuOpen(false); }}>
              {label}
            </div>
          ))}
          <div className="g-mob-theme-row">
            <span>{dark ? "🌙 Dark mode" : "☀️ Light mode"}</span>
            <button className="theme-toggle" onClick={() => setDark(d => !d)} />
          </div>
          <div style={{ padding: "8px 8px 2px", fontSize: "13px", color: "var(--text-muted)" }}>
            {user?.displayName || user?.email}
          </div>
          <button
            className="signout-top"
            style={{ borderRadius: "8px", padding: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", width: "100%", marginTop: "6px" }}
            onClick={() => { handleSignOut(); setMenuOpen(false); }}
          >
            Sign Out
          </button>
        </div>

        {/* ── PAGE HEADER ── */}
        <div className="games-page-header">
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: "900", color: "var(--text-primary)", marginBottom: "8px" }}>
            Games
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
            Choose a game to test your coding skills
          </p>
        </div>

        {/* ── GAMES GRID ── */}
        <div className="games-grid">
          {games.map((game, i) => (
            <div
              key={game.id}
              className="game-card"
              style={{
                background: game.bg,
                borderRadius: "20px",
                padding: "clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px)",
                boxShadow: `0 4px 16px var(--card-shadow)`,
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                animationDelay: `${i * 0.08}s`,
              }}
              onClick={() => navigate(`/games/${game.route}/language`)}
            >
              <span style={{ fontSize: "clamp(32px, 5vw, 42px)", marginBottom: "4px" }}>{game.icon}</span>
              <div style={{ width: "36px", height: "3px", background: "rgba(255,255,255,0.5)", borderRadius: "99px", marginBottom: "4px" }} />
              <h2 style={{ fontSize: "clamp(15px, 2.5vw, 18px)", fontWeight: "900", color: "#fff", margin: 0, letterSpacing: "0.5px" }}>
                {game.title}
              </h2>
              <p style={{ fontSize: "clamp(13px, 1.8vw, 14px)", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.5 }}>
                {game.desc}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", margin: "auto 0 0", paddingTop: "10px" }}>
                {game.levels}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Games;