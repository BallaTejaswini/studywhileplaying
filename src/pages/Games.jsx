import { useState } from "react";
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

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

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
          box-shadow: 0 20px 40px rgba(0,0,0,0.25) !important;
        }
        .nav-link-btn:hover { color: #7B2FBE !important; }
        .signout-top:hover { background: #fee2e2 !important; color: #dc2626 !important; }

        /* ── NAVBAR ── */
        .games-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 60px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .g-nav-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .g-nav-center {
          display: flex;
          gap: 28px;
        }
        .g-nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .g-user-email {
          font-size: 13px;
          color: #888;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .g-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px;
        }
        .g-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #333;
          border-radius: 99px;
        }

        /* Mobile dropdown */
        .g-mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 12px 20px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 60px;
          z-index: 99;
        }
        .g-mobile-menu.open { display: flex; }
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
        .g-mobile-item:hover { background: #f5f0ff; color: #7B2FBE; }

        /* ── GAMES GRID ── */
        .games-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 40px 40px;
          max-width: 1200px;
        }

        /* ── PAGE HEADER ── */
        .games-page-header {
          padding: 40px 40px 24px;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .games-nav { padding: 0 20px; }
          .g-nav-center { display: none; }
          .g-user-email { display: none; }
          .g-hamburger { display: flex; }
          .games-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 20px 32px;
          }
          .games-page-header { padding: 28px 20px 16px; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .games-nav { padding: 0 16px; height: 56px; }
          .games-grid {
            grid-template-columns: 1fr;
            padding: 0 16px 28px;
            gap: 16px;
          }
          .games-page-header { padding: 24px 16px 14px; }
          .g-nav-brand { font-size: 14px !important; }
        }

        /* Large desktop */
        @media (min-width: 1200px) {
          .games-nav { padding: 0 80px; }
          .games-grid {
            grid-template-columns: repeat(3, 1fr);
            padding: 0 80px 48px;
            max-width: 100%;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f5f0eb", fontFamily: "'Segoe UI', sans-serif" }}>

        {/* ── NAVBAR ── */}
        <nav className="games-nav">
          {/* Left */}
          <div className="g-nav-left">
            <button
              style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#555", padding: "4px 6px" }}
              onClick={() => navigate("/home")}
            >←</button>
            <span style={{ fontSize: "20px" }}>🎮</span>
            <span className="g-nav-brand" style={{ fontWeight: "800", fontSize: "16px", color: "#111", whiteSpace: "nowrap" }}>
              Code While Playing
            </span>
          </div>

          {/* Center — hidden on mobile */}
          <div className="g-nav-center">
            <span className="nav-link-btn" style={{ fontSize: "15px", color: "#555", cursor: "pointer", fontWeight: "500" }} onClick={() => navigate("/games")}>
              Games
            </span>
            <span className="nav-link-btn" style={{ fontSize: "15px", color: "#555", cursor: "pointer", fontWeight: "500" }} onClick={() => navigate("/profile")}>
              Profile
            </span>
          </div>

          {/* Right */}
          <div className="g-nav-right">
            <span className="g-user-email">{user?.displayName || user?.email}</span>
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
            <button className="g-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <div className={`g-mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="g-mobile-item" onClick={() => { navigate("/games"); setMenuOpen(false); }}>🎮 Games</div>
          <div className="g-mobile-item" onClick={() => { navigate("/profile"); setMenuOpen(false); }}>👤 Profile</div>
          <div className="g-mobile-item" onClick={() => { navigate("/home"); setMenuOpen(false); }}>🏠 Home</div>
          <div style={{ padding: "8px", fontSize: "13px", color: "#aaa" }}>{user?.displayName || user?.email}</div>
        </div>

        {/* ── PAGE HEADER ── */}
        <div className="games-page-header">
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: "900", color: "#111", margin: "0 0 8px" }}>
            Games
          </h1>
          <p style={{ fontSize: "15px", color: "#888", margin: 0 }}>
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
                padding: "32px 28px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                animationDelay: `${i * 0.1}s`,
              }}
              onClick={() => navigate(`/games/${game.route}/language`)}
            >
              <span style={{ fontSize: "40px", marginBottom: "4px" }}>{game.icon}</span>
              <div style={{ width: "36px", height: "3px", background: "rgba(255,255,255,0.5)", borderRadius: "99px", marginBottom: "4px" }} />
              <h2 style={{ fontSize: "18px", fontWeight: "900", color: "#fff", margin: 0, letterSpacing: "0.5px" }}>
                {game.title}
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.5 }}>
                {game.desc}
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", margin: "auto 0 0", paddingTop: "12px" }}>
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