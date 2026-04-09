
import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FireBaseConfig";

const languages = [
  { id: "python",  label: "Python",  icon: "🐍" },
  { id: "c",       label: "C",       icon: "©️" },
  { id: "cpp",     label: "C++",     icon: "➕" },
  { id: "java",    label: "Java",    icon: "☕" },
  { id: "sql",     label: "SQL",     icon: "🗄️" },
  { id: "webdev",  label: "Web Dev", icon: "🌐" },
  { id: "dsa",     label: "DSA",     icon: "📊" },
];

const gameTitles = {
  1: "Quiz Master",
  2: "Guess The Syntax",
  3: "Trace The Error",
  4: "Shorten The Syntax",
  5: "Guess The Output",
};

const LanguageSelector = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("cwp-theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("cwp-theme", dark ? "dark" : "light");
  }, [dark]);

  const gameTitle = gameTitles[Number(gameId)] ?? "Game";

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <style>{`
        :root {
          --bg-page:      #f5f0eb;
          --bg-nav:       #ffffff;
          --bg-card:      #f0ebe4;
          --bg-card-h:    #ffffff;
          --border:       #e5e7eb;
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
          --icon-bg:      rgba(123,47,190,0.09);
          --tap-color:    #aaaaaa;
        }
        [data-theme="dark"] {
          --bg-page:      #1a1520;
          --bg-nav:       #221d2e;
          --bg-card:      #261f35;
          --bg-card-h:    #2d2640;
          --border:       #3a3347;
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
          --icon-bg:      rgba(180,140,255,0.12);
          --tap-color:    #6a6080;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 7px; }
        ::-webkit-scrollbar-track { background: var(--bg-page); border-radius: 999px; }
        ::-webkit-scrollbar-thumb { background: #c4b5d4; border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: #7B2FBE; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lang-card {
          animation: fadeInUp 0.4s ease both;
          cursor: pointer;
          background: var(--bg-card) !important;
          border: 1px solid rgba(0,0,0,0.04);
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .lang-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.15) !important;
          background: var(--bg-card-h) !important;
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

        .theme-toggle {
          width: 40px; height: 22px; border-radius: 999px;
          background: var(--toggle-bg);
          border: none; cursor: pointer; position: relative;
          flex-shrink: 0; transition: background 0.25s;
        }
        .theme-toggle::after {
          content: ''; position: absolute; top: 3px; left: 3px;
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--toggle-thumb); transition: transform 0.25s;
        }
        [data-theme="dark"] .theme-toggle::after { transform: translateX(18px); }

        .ls-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 60px;
          background: var(--bg-nav); border-bottom: 1px solid var(--border);
          flex-shrink: 0; z-index: 10;
          transition: background 0.25s, border-color 0.25s;
        }
        .ls-nav-left   { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .ls-nav-center { display: flex; gap: 24px; align-items: center; }
        .ls-nav-right  { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        .ls-user-email {
          font-size: 13px; color: var(--text-muted);
          max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .ls-hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 6px;
        }
        .ls-hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--text-nav); border-radius: 99px;
          transition: transform 0.22s, opacity 0.22s;
        }

        .ls-mobile-menu {
          display: none; flex-direction: column; gap: 2px;
          padding: 10px 16px 14px;
          background: var(--bg-nav); border-bottom: 1px solid var(--border);
          z-index: 99; transition: background 0.25s;
        }
        .ls-mobile-menu.open { display: flex; }

        .g-mobile-item {
          padding: 12px 8px; font-size: 15px; font-weight: 600;
          cursor: pointer; border-radius: 8px; color: var(--text-primary);
          border-bottom: 1px solid var(--mob-border);
          transition: background 0.15s, color 0.15s;
        }
        .g-mobile-item:last-of-type { border-bottom: none; }
        .g-mobile-item:hover { background: var(--mob-hover-bg); color: var(--mob-hover-cl); }

        .ls-mob-theme-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 8px; font-size: 14px; color: var(--text-muted);
          border-bottom: 1px solid var(--mob-border);
        }

        .ls-page-header { padding: 40px 40px 24px; }

        .ls-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; padding: 0 40px;
        }

        @media (max-width: 900px) {
          .ls-nav { padding: 0 20px; }
          .ls-nav-center { display: none; }
          .ls-user-email { display: none; }
          .ls-hamburger { display: flex; }
          .ls-grid { grid-template-columns: repeat(2, 1fr); padding: 0 20px; gap: 14px; }
          .ls-page-header { padding: 28px 20px 16px; }
        }

        @media (max-width: 600px) {
          .ls-nav { padding: 0 14px; height: 56px; }
          .ls-grid { grid-template-columns: 1fr; padding: 0 14px; gap: 12px; }
          .ls-page-header { padding: 18px 14px 12px; }
          .ls-nav-brand { font-size: 13px !important; }
          .theme-toggle { width: 34px; height: 19px; }
          .theme-toggle::after { width: 13px; height: 13px; }
          [data-theme="dark"] .theme-toggle::after { transform: translateX(15px); }
        }

        @media (min-width: 1200px) {
          .ls-nav { padding: 0 80px; }
          .ls-grid { grid-template-columns: repeat(4, 1fr); padding: 0 80px; }
          .ls-page-header { padding: 48px 80px 24px; }
        }
      `}</style>

      <div style={{
        height: "100vh", display: "flex", flexDirection: "column",
        background: "var(--bg-page)", fontFamily: "'Segoe UI', sans-serif",
        overflow: "hidden", transition: "background 0.25s",
      }}>

        {/* ── NAVBAR ── */}
        <nav className="ls-nav">
          <div className="ls-nav-left">
            <button
              style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "var(--text-nav)", padding: "4px 6px" }}
              onClick={() => navigate("/games")}
            >←</button>
            <span style={{ fontSize: "20px" }}>🎮</span>
            <span className="ls-nav-brand" style={{ fontWeight: "800", fontSize: "16px", color: "var(--text-primary)", whiteSpace: "nowrap" }}>
              Code While Playing
            </span>
          </div>

          <div className="ls-nav-center">
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

          <div className="ls-nav-right">
            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{dark ? "🌙" : "☀️"}</span>
            <button className="theme-toggle" onClick={() => setDark(d => !d)} title="Toggle theme" />
            <span className="ls-user-email">{user?.displayName || user?.email}</span>
            <button
              className="signout-top"
              style={{ borderRadius: "8px", padding: "6px 12px", fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <button className="ls-hamburger" onClick={() => setMenuOpen(o => !o)}>
              <span style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </nav>

        {/* ── MOBILE MENU ── */}
        <div className={`ls-mobile-menu ${menuOpen ? "open" : ""}`}>
          {[
            { label: "🏠 Home",    path: "/home" },
            { label: "🎮 Games",   path: "/games" },
            { label: "👤 Profile", path: "/profile" },
          ].map(({ label, path }) => (
            <div key={path} className="g-mobile-item" onClick={() => { navigate(path); setMenuOpen(false); }}>
              {label}
            </div>
          ))}
          <div className="ls-mob-theme-row">
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

        {/* ── SCROLLABLE BODY ── */}
        <div style={{ flex: 1, overflowY: "scroll", overflowX: "hidden" }}>
          <div className="ls-page-header">
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: "900", color: "var(--text-primary)", marginBottom: "8px" }}>
              Select Language
            </h1>
            <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
              Choose a language for{" "}
              <span style={{ color: "#7B2FBE", fontWeight: "700" }}>{gameTitle}</span>
            </p>
          </div>

          <div className="ls-grid">
            {languages.map((lang, i) => (
              <div
                key={lang.id}
                className="lang-card"
                style={{
                  borderRadius: "18px",
                  padding: "clamp(16px, 3vw, 32px) clamp(14px, 2.5vw, 24px)",
                  minHeight: "90px",
                  display: "flex", alignItems: "center", gap: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  animationDelay: `${i * 0.07}s`,
                }}
                onClick={() => navigate(`/games/${gameId}/level/${lang.id}`)}
              >
                <div style={{
                  width: "clamp(46px, 7vw, 60px)", height: "clamp(46px, 7vw, 60px)",
                  borderRadius: "14px", background: "var(--icon-bg)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ fontSize: "clamp(22px, 4vw, 32px)" }}>{lang.icon}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "clamp(15px, 2.5vw, 20px)", fontWeight: "800", color: "var(--text-primary)" }}>
                    {lang.label}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--tap-color)", fontWeight: "500" }}>
                    Tap to select →
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: "40px" }} />
        </div>
      </div>
    </>
  );
};

export default LanguageSelector;