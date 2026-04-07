import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const gameTitle = gameTitles[Number(gameId)] ?? "Game";

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const handleSelectLanguage = (langId) => {
    navigate(`/games/${gameId}/level/${langId}`);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f0ebe4; border-radius: 999px; }
        ::-webkit-scrollbar-thumb { background: #c4b5d4; border-radius: 999px; border: 2px solid #f0ebe4; }
        ::-webkit-scrollbar-thumb:hover { background: #7B2FBE; }
        * { scrollbar-width: thin; scrollbar-color: #c4b5d4 #f0ebe4; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lang-card {
          animation: fadeInUp 0.4s ease both;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .lang-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important;
          background: #ffffff !important;
        }
        .nav-link-btn:hover { color: #7B2FBE !important; }
        .signout-top:hover { background: #fee2e2 !important; color: #dc2626 !important; }
        .g-mobile-item:hover { background: #f5f0ff; color: #7B2FBE; }

        /* ── NAVBAR ── */
        .ls-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 60px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          flex-shrink: 0;
          z-index: 10;
        }
        .ls-nav-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .ls-nav-center {
          display: flex;
          gap: 28px;
        }
        .ls-nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .ls-user-email {
          font-size: 13px;
          color: #888;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ls-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px;
        }
        .ls-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #333;
          border-radius: 99px;
        }

        /* Mobile dropdown */
        .ls-mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 12px 20px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          z-index: 99;
        }
        .ls-mobile-menu.open { display: flex; }
        .g-mobile-item {
          padding: 12px 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          color: #333;
          border-bottom: 1px solid #f0f0f0;
        }
        .g-mobile-item:last-child { border-bottom: none; }

        /* ── LANGUAGE GRID ── */
        .ls-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 40px;
        }

        /* ── PAGE HEADER ── */
        .ls-page-header {
          padding: 40px 40px 24px;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .ls-nav { padding: 0 20px; }
          .ls-nav-center { display: none; }
          .ls-user-email { display: none; }
          .ls-hamburger { display: flex; }
          .ls-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 20px;
            gap: 16px;
          }
          .ls-page-header { padding: 28px 20px 16px; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .ls-nav { padding: 0 16px; height: 56px; }
          .ls-grid {
            grid-template-columns: 1fr;
            padding: 0 16px;
            gap: 12px;
          }
          .ls-page-header { padding: 20px 16px 12px; }
          .ls-nav-brand { font-size: 13px !important; }
        }

        /* Large desktop */
        @media (min-width: 1200px) {
          .ls-nav { padding: 0 80px; }
          .ls-grid {
            grid-template-columns: repeat(4, 1fr);
            padding: 0 80px;
            max-width: 1400px;
          }
          .ls-page-header { padding: 48px 80px 24px; }
        }
      `}</style>

      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f0eb",
        fontFamily: "'Segoe UI', sans-serif",
        overflow: "hidden",
      }}>

        {/* ── NAVBAR ── */}
        <nav className="ls-nav">
          {/* Left */}
          <div className="ls-nav-left">
            <button
              style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#555", padding: "4px 6px" }}
              onClick={() => navigate("/games")}
            >←</button>
            <span style={{ fontSize: "20px" }}>🎮</span>
            <span className="ls-nav-brand" style={{ fontWeight: "800", fontSize: "16px", color: "#111", whiteSpace: "nowrap" }}>
              Code While Playing
            </span>
          </div>

          {/* Center — hidden on mobile */}
          <div className="ls-nav-center">
            <span className="nav-link-btn" style={{ fontSize: "15px", color: "#555", cursor: "pointer", fontWeight: "500" }} onClick={() => navigate("/games")}>
              Games
            </span>
            <span className="nav-link-btn" style={{ fontSize: "15px", color: "#555", cursor: "pointer", fontWeight: "500" }} onClick={() => navigate("/profile")}>
              Profile
            </span>
          </div>

          {/* Right */}
          <div className="ls-nav-right">
            <span className="ls-user-email">{user?.displayName || user?.email}</span>
            <button
              className="signout-top"
              style={{
                background: "#f5f5f5",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                color: "#555",
                whiteSpace: "nowrap",
              }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>

            {/* Hamburger */}
            <button className="ls-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <div className={`ls-mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="g-mobile-item" onClick={() => { navigate("/games"); setMenuOpen(false); }}>🎮 Games</div>
          <div className="g-mobile-item" onClick={() => { navigate("/profile"); setMenuOpen(false); }}>👤 Profile</div>
          <div style={{ padding: "8px", fontSize: "13px", color: "#aaa" }}>{user?.displayName || user?.email}</div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div style={{ flex: 1, overflowY: "scroll", overflowX: "hidden" }}>

          {/* Page Header */}
          <div className="ls-page-header">
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: "900", color: "#111", margin: "0 0 8px" }}>
              Select Language
            </h1>
            <p style={{ fontSize: "15px", color: "#888", margin: 0 }}>
              Choose a language for{" "}
              <span style={{ color: "#7B2FBE", fontWeight: "700" }}>{gameTitle}</span>
            </p>
          </div>

          {/* Language Grid */}
          <div className="ls-grid">
            {languages.map((lang, i) => (
              <div
                key={lang.id}
                className="lang-card"
                style={{
                  background: "#f0ebe4",
                  borderRadius: "20px",
                  padding: "32px 24px",
                  minHeight: "120px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  animationDelay: `${i * 0.07}s`,
                }}
                onClick={() => handleSelectLanguage(lang.id)}
              >
                {/* Icon */}
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "rgba(123,47,190,0.09)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: "32px" }}>{lang.icon}</span>
                </div>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: "800", color: "#111" }}>
                    {lang.label}
                  </span>
                  <span style={{ fontSize: "13px", color: "#aaa", fontWeight: "500" }}>
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