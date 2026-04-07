import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FireBaseConfig";
import { useState } from "react";

const gameMeta = {
  1: { title: "Quiz Master",        desc: "Test your coding knowledge with MCQ questions",   icon: "🧠" },
  2: { title: "Guess The Syntax",   desc: "Fill in the missing syntax to complete the code", icon: "📝" },
  3: { title: "Trace The Error",    desc: "Find the bug in the code snippet",                icon: "🐛" },
  4: { title: "Shorten The Syntax", desc: "Pick the shorthand or optimized version",         icon: "✂️" },
  5: { title: "Guess The Output",   desc: "Predict what the code will print",                icon: "💻" },
};

const languageLabels = {
  python: "Python", c: "C", cpp: "C++",
  java: "Java", sql: "SQL", webdev: "Web Dev", dsa: "DSA",
};

const levelConfig = {
  easy: {
    label: "EASY",
    mascot: "😊",
    mascotBg: "#22c55e",
    color: "#22c55e",
    sliderPos: 0,
    desc: "Basic concepts and fundamentals",
  },
  medium: {
    label: "MEDIUM",
    mascot: "😤",
    mascotBg: "#f59e0b",
    color: "#f59e0b",
    sliderPos: 1,
    desc: "Intermediate challenges",
  },
  hard: {
    label: "HARD",
    mascot: "😈",
    mascotBg: "#ef4444",
    color: "#ef4444",
    sliderPos: 2,
    desc: "Advanced problems",
  },
};

const levels = ["easy", "medium", "hard"];

const LevelSelector = () => {
  const navigate = useNavigate();
  const { gameId, langId } = useParams();
  const { user } = useAuth();

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLevel = levelConfig[levels[selectedIdx]];
  const game = gameMeta[Number(gameId)] ?? { title: "Game", desc: "", icon: "🎮" };
  const langLabel = languageLabels[langId] ?? langId;

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const handlePlay = () => {
    navigate(`/games/${gameId}/play/${langId}/${levels[selectedIdx]}`);
  };

  const fillPct = selectedIdx * 50;

  return (
    <>
      <style>{`
        /* ── Reset / Base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Animations ── */
        @keyframes mascotPop {
          0%   { transform: scale(0.6) rotate(-8deg); opacity: 0; }
          70%  { transform: scale(1.12) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mascot-anim { animation: mascotPop 0.48s cubic-bezier(.34,1.56,.64,1) both; }
        .label-anim  { animation: fadeUp 0.32s ease both 0.08s; }
        .menu-anim   { animation: slideDown 0.2s ease both; }

        /* ── Slider ── */
        input[type=range] {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 100%;
          background: transparent; outline: none; cursor: pointer; margin: 0; padding: 0;
        }
        input[type=range]::-webkit-slider-runnable-track { height: 100%; border-radius: 999px; background: transparent; }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 48px; height: 48px; border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          cursor: pointer; margin-top: -2px;
          background: ${currentLevel.color};
          transition: background 0.25s;
        }
        input[type=range]::-moz-range-thumb {
          width: 48px; height: 48px; border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          cursor: pointer;
          background: ${currentLevel.color};
        }

        /* ── Buttons ── */
        .play-btn {
          transition: transform 0.15s, filter 0.15s, box-shadow 0.15s;
          border: none; cursor: pointer;
        }
        .play-btn:hover  { transform: translateY(-2px); filter: brightness(1.07); box-shadow: 0 14px 36px rgba(0,0,0,0.22); }
        .play-btn:active { transform: scale(0.97); }

        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #7B2FBE !important; }

        .signout-btn { transition: background 0.15s, color 0.15s; }
        .signout-btn:hover { background: #fee2e2 !important; color: #dc2626 !important; border-color: #fca5a5 !important; }

        .menu-item { transition: background 0.12s; }
        .menu-item:hover { background: #f5f0eb !important; }

        .hamburger { transition: opacity 0.15s; }
        .hamburger:hover { opacity: 0.7; }

        .level-tick { transition: color 0.25s, font-weight 0.25s; }

        /* ── Responsive layout ── */

        /* Navbar: always show brand + back; hide links+user on small, show hamburger */
        .nav-links-desktop { display: flex; }
        .nav-user-desktop  { display: flex; }
        .nav-hamburger     { display: none; }

        @media (max-width: 640px) {
          .nav-links-desktop { display: none; }
          .nav-user-desktop  { display: none; }
          .nav-hamburger     { display: flex; }
        }

        /* Header padding */
        .header-inner {
          max-width: 600px;
          margin: 0 auto;
          padding: 28px 20px 52px;
        }
        @media (max-width: 480px) {
          .header-inner { padding: 20px 16px 48px; }
        }

        /* Card */
        .level-card {
          background: #faf6f1;
          border-radius: 28px;
          padding: 0 36px 48px;
          max-width: 480px;
          width: calc(100% - 32px);
          margin: -28px auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.09);
          position: relative;
          z-index: 2;
        }
        @media (max-width: 480px) {
          .level-card {
            padding: 0 20px 36px;
            width: calc(100% - 24px);
            border-radius: 22px;
            gap: 12px;
          }
        }

        /* Mascot ring */
        .mascot-ring {
          width: 100px; height: 100px;
          border-radius: 50%; border: 5px solid;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          margin-top: -50px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.13);
          z-index: 3;
        }
        @media (max-width: 480px) {
          .mascot-ring { width: 88px; height: 88px; margin-top: -44px; }
        }

        /* Level label */
        .level-label {
          font-size: 50px; font-weight: 900;
          letter-spacing: 4px; line-height: 1;
          margin: 4px 0 0;
        }
        @media (max-width: 480px) {
          .level-label { font-size: 40px; letter-spacing: 3px; }
        }

        /* Slider container */
        .slider-wrap {
          width: 100%;
          max-width: 340px;
          margin: 6px 0 2px;
        }
        @media (max-width: 380px) {
          .slider-wrap { max-width: 100%; }
        }

        /* Play button */
        .play-btn-wrap {
          width: 100%;
          max-width: 340px;
        }
        @media (max-width: 380px) {
          .play-btn-wrap { max-width: 100%; }
        }
      `}</style>

      {/* Dynamic thumb color */}
      <style>{`
        input[type=range]::-webkit-slider-thumb { background: ${currentLevel.color}; }
        input[type=range]::-moz-range-thumb     { background: ${currentLevel.color}; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f5f0eb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

        {/* ══════════════════════════════
            NAVBAR
        ══════════════════════════════ */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", height: "60px",
          background: "#fff", borderBottom: "1px solid #e8e2da",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          {/* Left: back + brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => navigate(`/games/${gameId}/language`)}
              style={{
                width: "34px", height: "34px", borderRadius: "50%",
                border: "1.5px solid #e0d8cf", background: "#f5f0eb",
                cursor: "pointer", fontSize: "16px", color: "#555",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ←
            </button>
            <span style={{ fontSize: "20px" }}>🎮</span>
            <span style={{ fontWeight: "800", fontSize: "16px", color: "#1c1814", whiteSpace: "nowrap" }}>
              Code While Playing
            </span>
          </div>

          {/* Center links — desktop only */}
          <div className="nav-links-desktop" style={{ gap: "28px" }}>
            {["Games", "Profile"].map(label => (
              <span
                key={label}
                className="nav-link"
                onClick={() => navigate("/" + label.toLowerCase())}
                style={{ fontSize: "14px", color: "#555", cursor: "pointer", fontWeight: "500" }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Right: user + signout — desktop only */}
          <div className="nav-user-desktop" style={{ alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: "#9c9489", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.displayName || user?.email}
            </span>
            <button
              className="signout-btn"
              onClick={handleSignOut}
              style={{
                background: "#f5f5f5", border: "1px solid #e5e7eb", borderRadius: "8px",
                padding: "6px 14px", fontSize: "13px", fontWeight: "600",
                cursor: "pointer", color: "#555", whiteSpace: "nowrap",
              }}
            >
              Sign Out
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: "5px", padding: "4px",
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: "22px", height: "2px",
                background: "#555", borderRadius: "2px",
                transform: menuOpen
                  ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 2 ? "translateY(-7px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
                transition: "transform 0.22s, opacity 0.22s",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="menu-anim" style={{
            position: "sticky", top: "60px", zIndex: 99,
            background: "#fff", borderBottom: "1px solid #e8e2da",
            padding: "8px 0",
          }}>
            {["Games", "Profile"].map(label => (
              <div
                key={label}
                className="menu-item"
                onClick={() => { navigate("/" + label.toLowerCase()); setMenuOpen(false); }}
                style={{ padding: "12px 24px", fontSize: "15px", color: "#333", cursor: "pointer" }}
              >
                {label}
              </div>
            ))}
            <div style={{ height: "1px", background: "#f0ece6", margin: "4px 0" }} />
            <div style={{ padding: "8px 24px 4px" }}>
              <p style={{ fontSize: "12px", color: "#a09890", marginBottom: "8px" }}>
                {user?.displayName || user?.email}
              </p>
              <button
                className="signout-btn"
                onClick={() => { handleSignOut(); setMenuOpen(false); }}
                style={{
                  background: "#f5f5f5", border: "1px solid #e5e7eb", borderRadius: "8px",
                  padding: "8px 16px", fontSize: "13px", fontWeight: "600",
                  cursor: "pointer", color: "#555", width: "100%",
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            DARK HEADER BANNER
        ══════════════════════════════ */}
        <div style={{ background: "linear-gradient(150deg, #2d1b4e 0%, #1a1028 100%)" }}>
          <div className="header-inner">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
              <button
                onClick={() => navigate(`/games/${gameId}/language`)}
                style={{
                  width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                  background: "rgba(255,255,255,0.15)", border: "none",
                  color: "#fff", fontSize: "22px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                ‹
              </button>
              <span style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "2px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                {game.icon} {game.title}
              </span>
            </div>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "16px" }}>
              {game.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
              <span style={{
                background: "rgba(255,255,255,0.18)", color: "#fff",
                borderRadius: "999px", padding: "5px 14px", fontSize: "13px", fontWeight: "600",
              }}>
                🔤 {langLabel}
              </span>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                3 Levels · 30 Questions
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            LEVEL CARD
        ══════════════════════════════ */}
        <div className="level-card">

          {/* Mascot */}
          <div
            key={levels[selectedIdx] + "_mascot"}
            className="mascot-ring mascot-anim"
            style={{ borderColor: currentLevel.color }}
          >
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: currentLevel.mascotBg,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "44px", lineHeight: 1 }}>{currentLevel.mascot}</span>
            </div>
          </div>

          {/* Level name */}
          <h1
            key={levels[selectedIdx] + "_label"}
            className="level-label label-anim"
            style={{ color: currentLevel.color }}
          >
            {currentLevel.label}
          </h1>
          <p style={{ fontSize: "13px", color: "#a09890", margin: 0 }}>
            {currentLevel.desc}
          </p>

          {/* Slider */}
          <div className="slider-wrap">
            <div style={{
              height: "48px",
              borderRadius: "999px",
              overflow: "hidden",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.07)",
              background: `linear-gradient(to right, ${currentLevel.color} ${fillPct}%, #ddd8d0 ${fillPct}%)`,
            }}>
              <input
                type="range"
                min={0} max={2} step={1}
                value={selectedIdx}
                onChange={(e) => setSelectedIdx(Number(e.target.value))}
                style={{ display: "block" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px 0" }}>
              {levels.map((lv, i) => (
                <span
                  key={lv}
                  className="level-tick"
                  onClick={() => setSelectedIdx(i)}
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.6px",
                    fontWeight: i === selectedIdx ? "800" : "500",
                    color: i === selectedIdx ? currentLevel.color : "#c0b8b0",
                    cursor: "pointer",
                  }}
                >
                  {levelConfig[lv].label}
                </span>
              ))}
            </div>
          </div>

          {/* Play button */}
          <div className="play-btn-wrap">
            <button
              className="play-btn"
              onClick={handlePlay}
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "16px",
                background: currentLevel.color,
                color: "#fff",
                fontSize: "20px",
                fontWeight: "900",
                letterSpacing: "3px",
                boxShadow: `0 6px 24px ${currentLevel.color}55`,
                marginTop: "4px",
              }}
            >
              ▶&nbsp; PLAY
            </button>
          </div>

        </div>

        {/* Bottom spacer */}
        <div style={{ height: "48px" }} />
      </div>
    </>
  );
};

export default LevelSelector;