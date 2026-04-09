
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FireBaseConfig";
import { useState, useEffect } from "react";

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
  easy:   { label: "EASY",   mascot: "😊", mascotBg: "#22c55e", color: "#22c55e", desc: "Basic concepts and fundamentals" },
  medium: { label: "MEDIUM", mascot: "😤", mascotBg: "#f59e0b", color: "#f59e0b", desc: "Intermediate challenges" },
  hard:   { label: "HARD",   mascot: "😈", mascotBg: "#ef4444", color: "#ef4444", desc: "Advanced problems" },
};

const levels = ["easy", "medium", "hard"];

const LevelSelector = () => {
  const navigate = useNavigate();
  const { gameId, langId } = useParams();
  const { user } = useAuth();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("cwp-theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("cwp-theme", dark ? "dark" : "light");
  }, [dark]);

  const currentLevel = levelConfig[levels[selectedIdx]];
  const game = gameMeta[Number(gameId)] ?? { title: "Game", desc: "", icon: "🎮" };
  const langLabel = languageLabels[langId] ?? langId;
  const fillPct = selectedIdx * 50;

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const handlePlay = () => {
    navigate(`/games/${gameId}/play/${langId}/${levels[selectedIdx]}`);
  };

  return (
    <>
      <style>{`
        :root {
          --bg-page:      #f5f0eb;
          --bg-nav:       #ffffff;
          --bg-banner:    linear-gradient(150deg, #2d1b4e 0%, #1a1028 100%);
          --bg-card:      #faf6f1;
          --border:       #e8e2da;
          --text-primary: #1c1814;
          --text-muted:   #9c9489;
          --text-nav:     #555555;
          --toggle-bg:    #e5e7eb;
          --toggle-thumb: #ffffff;
          --signout-bg:   #f5f5f5;
          --signout-color:#555555;
          --mob-border:   #f0ece6;
          --mob-hover-bg: #f5f0eb;
          --level-tick-inactive: #c0b8b0;
          --card-shadow:  rgba(0,0,0,0.09);
        }
        [data-theme="dark"] {
          --bg-page:      #1a1520;
          --bg-nav:       #221d2e;
          --bg-banner:    linear-gradient(150deg, #1a0d2e 0%, #0e0818 100%);
          --bg-card:      #221d2e;
          --border:       #3a3347;
          --text-primary: #f0eafa;
          --text-muted:   #9a90ae;
          --text-nav:     #c0b8d4;
          --toggle-bg:    #4a3f60;
          --toggle-thumb: #c9b8f0;
          --signout-bg:   #2d2640;
          --signout-color:#c0b8d4;
          --mob-border:   #2d2640;
          --mob-hover-bg: #2d2640;
          --level-tick-inactive: #5a5068;
          --card-shadow:  rgba(0,0,0,0.35);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes mascotPop {
          0%   { transform: scale(0.6) rotate(-8deg); opacity: 0; }
          70%  { transform: scale(1.12) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mascot-anim { animation: mascotPop 0.48s cubic-bezier(.34,1.56,.64,1) both; }
        .label-anim  { animation: fadeUp 0.32s ease both 0.08s; }

        /* Slider */
        input[type=range] {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 100%;
          background: transparent; outline: none; cursor: pointer; margin: 0; padding: 0;
        }
        input[type=range]::-webkit-slider-runnable-track { height: 100%; border-radius: 999px; background: transparent; }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 44px; height: 44px; border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          cursor: pointer; margin-top: -2px;
          transition: background 0.25s;
        }
        input[type=range]::-moz-range-thumb {
          width: 44px; height: 44px; border-radius: 50%;
          border: 4px solid #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          cursor: pointer;
        }

        .play-btn {
          transition: transform 0.15s, filter 0.15s, box-shadow 0.15s;
          border: none; cursor: pointer;
        }
        .play-btn:hover  { transform: translateY(-2px); filter: brightness(1.07); box-shadow: 0 14px 36px rgba(0,0,0,0.22); }
        .play-btn:active { transform: scale(0.97); }

        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #7B2FBE !important; }

        .signout-btn {
          background: var(--signout-bg) !important;
          color: var(--signout-color) !important;
          border: 1px solid var(--border) !important;
          transition: background 0.15s, color 0.15s;
        }
        .signout-btn:hover { background: #fee2e2 !important; color: #dc2626 !important; }

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

        /* ── NAVBAR ── */
        .lv-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px; height: 60px;
          background: var(--bg-nav); border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 100;
          transition: background 0.25s, border-color 0.25s;
        }
        .lv-nav-left   { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .lv-nav-center { display: flex; gap: 24px; align-items: center; }
        .lv-nav-right  { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        .lv-user        { font-size: 13px; color: var(--text-muted); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .lv-hamburger   { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .lv-hamburger span { display: block; width: 22px; height: 2px; background: var(--text-nav); border-radius: 2px; transition: transform 0.22s, opacity 0.22s; }
        .lv-nav-links   { display: flex; }

        /* ── MOBILE MENU ── */
        .lv-mobile-menu {
          display: none; flex-direction: column; gap: 2px;
          padding: 10px 16px 14px;
          background: var(--bg-nav); border-bottom: 1px solid var(--border);
          position: sticky; top: 60px; z-index: 99;
          transition: background 0.25s;
        }
        .lv-mobile-menu.open { display: flex; }

        .menu-item {
          padding: 12px 8px; font-size: 15px; font-weight: 600;
          cursor: pointer; border-radius: 8px; color: var(--text-primary);
          border-bottom: 1px solid var(--mob-border);
          transition: background 0.12s;
        }
        .menu-item:last-of-type { border-bottom: none; }
        .menu-item:hover { background: var(--mob-hover-bg); }

        .lv-mob-theme-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 8px; font-size: 14px; color: var(--text-muted);
          border-bottom: 1px solid var(--mob-border);
        }

        /* ── HEADER BANNER ── */
        .header-inner { max-width: 600px; margin: 0 auto; padding: 28px 20px 52px; }

        /* ── LEVEL CARD ── */
        .level-card {
          background: var(--bg-card);
          border-radius: 28px;
          padding: 0 36px 48px;
          max-width: 480px;
          width: calc(100% - 32px);
          margin: -28px auto 0;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          box-shadow: 0 8px 40px var(--card-shadow);
          position: relative; z-index: 2;
          transition: background 0.25s;
        }

        .mascot-ring {
          width: 100px; height: 100px; border-radius: 50%; border: 5px solid;
          background: var(--bg-nav);
          display: flex; align-items: center; justify-content: center;
          margin-top: -50px; box-shadow: 0 8px 28px rgba(0,0,0,0.13); z-index: 3;
          transition: background 0.25s;
        }

        .level-label {
          font-size: clamp(36px, 8vw, 50px); font-weight: 900;
          letter-spacing: 4px; line-height: 1; margin: 4px 0 0;
        }

        .slider-wrap  { width: 100%; max-width: 340px; margin: 6px 0 2px; }
        .play-btn-wrap { width: 100%; max-width: 340px; }

        /* Responsive */
        @media (max-width: 640px) {
          .lv-nav-links  { display: none; }
          .lv-user       { display: none; }
          .lv-hamburger  { display: flex; }
          .lv-nav        { padding: 0 14px; height: 56px; }
          .lv-mobile-menu { top: 56px; }
          .theme-toggle  { width: 34px; height: 19px; }
          .theme-toggle::after { width: 13px; height: 13px; }
          [data-theme="dark"] .theme-toggle::after { transform: translateX(15px); }
        }

        @media (max-width: 480px) {
          .header-inner { padding: 20px 16px 48px; }
          .level-card   { padding: 0 20px 36px; width: calc(100% - 24px); border-radius: 22px; gap: 12px; }
          .mascot-ring  { width: 88px; height: 88px; margin-top: -44px; }
          .slider-wrap, .play-btn-wrap { max-width: 100%; }
        }

        @media (max-width: 360px) {
          .level-label  { font-size: 32px; letter-spacing: 2px; }
        }
      `}</style>

      {/* Dynamic slider thumb color */}
      <style>{`
        input[type=range]::-webkit-slider-thumb { background: ${currentLevel.color}; }
        input[type=range]::-moz-range-thumb     { background: ${currentLevel.color}; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg-page)", fontFamily: "'Segoe UI', system-ui, sans-serif", transition: "background 0.25s" }}>

        {/* ── NAVBAR ── */}
        <nav className="lv-nav">
          <div className="lv-nav-left">
            <button
              onClick={() => navigate(`/games/${gameId}/language`)}
              style={{
                width: "34px", height: "34px", borderRadius: "50%",
                border: `1.5px solid var(--border)`, background: "var(--bg-page)",
                cursor: "pointer", fontSize: "16px", color: "var(--text-nav)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                transition: "background 0.25s",
              }}
            >←</button>
            <span style={{ fontSize: "20px" }}>🎮</span>
            <span style={{ fontWeight: "800", fontSize: "16px", color: "var(--text-primary)", whiteSpace: "nowrap" }}>
              Code While Playing
            </span>
          </div>

          <div className="lv-nav-center lv-nav-links">
            {[
              { label: "🏠 Home",    path: "/home" },
              { label: "🎮 Games",   path: "/games" },
              { label: "👤 Profile", path: "/profile" },
            ].map(({ label, path }) => (
              <span
                key={path}
                className="nav-link"
                onClick={() => navigate(path)}
                style={{ fontSize: "14px", color: "var(--text-nav)", cursor: "pointer", fontWeight: "600" }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="lv-nav-right">
            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{dark ? "🌙" : "☀️"}</span>
            <button className="theme-toggle" onClick={() => setDark(d => !d)} title="Toggle theme" />
            <span className="lv-user">{user?.displayName || user?.email}</span>
            <button
              className="signout-btn"
              onClick={handleSignOut}
              style={{ borderRadius: "8px", padding: "6px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              Sign Out
            </button>
            <button className="lv-hamburger" onClick={() => setMenuOpen(o => !o)}>
              <span style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </nav>

        {/* ── MOBILE MENU ── */}
        <div className={`lv-mobile-menu ${menuOpen ? "open" : ""}`}>
          {[
            { label: "🏠 Home",    path: "/home" },
            { label: "🎮 Games",   path: "/games" },
            { label: "👤 Profile", path: "/profile" },
          ].map(({ label, path }) => (
            <div key={path} className="menu-item" onClick={() => { navigate(path); setMenuOpen(false); }}>
              {label}
            </div>
          ))}
          <div className="lv-mob-theme-row">
            <span>{dark ? "🌙 Dark mode" : "☀️ Light mode"}</span>
            <button className="theme-toggle" onClick={() => setDark(d => !d)} />
          </div>
          <div style={{ height: "1px", background: "var(--mob-border)", margin: "4px 0" }} />
          <div style={{ padding: "8px 8px 2px" }}>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
              {user?.displayName || user?.email}
            </p>
            <button
              className="signout-btn"
              onClick={() => { handleSignOut(); setMenuOpen(false); }}
              style={{ borderRadius: "8px", padding: "8px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer", width: "100%" }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* ── DARK HEADER BANNER ── */}
        <div style={{ background: "var(--bg-banner)" }}>
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
              >‹</button>
              <span style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "2px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                {game.icon} {game.title}
              </span>
            </div>
            <p style={{ fontSize: "clamp(13px, 2vw, 15px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "16px" }}>
              {game.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
              <span style={{ background: "rgba(255,255,255,0.18)", color: "#fff", borderRadius: "999px", padding: "5px 14px", fontSize: "13px", fontWeight: "600" }}>
                🔤 {langLabel}
              </span>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                3 Levels · 30 Questions
              </span>
            </div>
          </div>
        </div>

        {/* ── LEVEL CARD ── */}
        <div className="level-card">

          {/* Mascot */}
          <div key={levels[selectedIdx] + "_mascot"} className="mascot-ring mascot-anim" style={{ borderColor: currentLevel.color }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: currentLevel.mascotBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "44px", lineHeight: 1 }}>{currentLevel.mascot}</span>
            </div>
          </div>

          {/* Level name */}
          <h1 key={levels[selectedIdx] + "_label"} className="level-label label-anim" style={{ color: currentLevel.color }}>
            {currentLevel.label}
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
            {currentLevel.desc}
          </p>

          {/* Slider */}
          <div className="slider-wrap">
            <div style={{
              height: "44px", borderRadius: "999px", overflow: "hidden",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.07)",
              background: `linear-gradient(to right, ${currentLevel.color} ${fillPct}%, var(--border) ${fillPct}%)`,
            }}>
              <input type="range" min={0} max={2} step={1} value={selectedIdx} onChange={(e) => setSelectedIdx(Number(e.target.value))} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px 0" }}>
              {levels.map((lv, i) => (
                <span
                  key={lv}
                  onClick={() => setSelectedIdx(i)}
                  style={{
                    fontSize: "11px", letterSpacing: "0.6px",
                    fontWeight: i === selectedIdx ? "800" : "500",
                    color: i === selectedIdx ? currentLevel.color : "var(--level-tick-inactive)",
                    cursor: "pointer", transition: "color 0.25s",
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
                padding: "clamp(14px, 3vw, 18px)",
                borderRadius: "16px",
                background: currentLevel.color,
                color: "#fff",
                fontSize: "clamp(16px, 3vw, 20px)",
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

        <div style={{ height: "48px" }} />
      </div>
    </>
  );
};

export default LevelSelector;