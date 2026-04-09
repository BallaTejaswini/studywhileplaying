// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GAMES = [
  { id: 1, title: "Quiz Master",        route: "quiz",    desc: "MCQ coding knowledge test",        icon: "🧠", bg: "linear-gradient(135deg, #7B2FBE, #9B59B6)" },
  { id: 2, title: "Guess the Syntax",   route: "syntax",  desc: "Fill in the missing syntax",       icon: "📝", bg: "linear-gradient(135deg, #e11d48, #FF4D8D)" },
  { id: 3, title: "Trace the Error",    route: "error",   desc: "Find the bug in the code",         icon: "🐛", bg: "linear-gradient(135deg, #0891b2, #06b6d4)" },
  { id: 4, title: "Shorten the Syntax", route: "shorten", desc: "Pick the optimized shorthand",     icon: "✂️", bg: "linear-gradient(135deg, #ea580c, #f97316)" },
  { id: 5, title: "Guess the Output",   route: "output",  desc: "Predict what the code will print", icon: "💻", bg: "linear-gradient(135deg, #16a34a, #22c55e)" },
];

const LANGUAGES = [
  { id: "python", label: "Python",  emoji: "🐍" },
  { id: "java",   label: "Java",    emoji: "☕" },
  { id: "cpp",    label: "C++",     emoji: "⚙️" },
  { id: "c",      label: "C",       emoji: "🔧" },
  { id: "sql",    label: "SQL",     emoji: "🗄️" },
  { id: "dsa",    label: "DSA",     emoji: "📊" },
  { id: "web",    label: "Web Dev", emoji: "🌐" },
];

const LEVELS = [
  { id: "easy",   label: "Easy",   desc: "10 questions · Beginner",      color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
  { id: "medium", label: "Medium", desc: "10 questions · Intermediate",  color: "#d97706", bg: "#fffbeb", border: "#fcd34d" },
  { id: "hard",   label: "Hard",   desc: "10 questions · Advanced",      color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" },
];

const PLAYER_COLORS = ["#7C3AED", "#0891b2"];

// ── Step progress dots ────────────────────────────────────────────────────────
const STEP_LIST = ["names", "game", "language", "level"];

const StepBar = ({ step }) => {
  const idx = STEP_LIST.indexOf(step);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
      {STEP_LIST.map((s, i) => (
        <div key={s} style={{
          width: i === idx ? "32px" : "10px",
          height: "10px",
          borderRadius: "99px",
          background: i < idx ? "#a78bfa" : i === idx ? "#7C3AED" : "#e5e7eb",
          transition: "all 0.3s ease",
        }} />
      ))}
    </div>
  );
};

// ── Shared styles ─────────────────────────────────────────────────────────────
const pageStyle = {
  minHeight: "100vh",
  background: "#F5F0EB",
  fontFamily: "'Segoe UI', system-ui, sans-serif",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px 16px",
};

const cardStyle = {
  background: "#FFF",
  border: "1px solid #E8E2DA",
  borderRadius: "20px",
  padding: "36px 28px",
  width: "100%",
  maxWidth: "440px",
  animation: "fadeUp 0.35s ease both",
};

const backBtn = {
  background: "none", border: "none", cursor: "pointer",
  color: "#9C9489", fontSize: "14px", marginBottom: "20px",
  padding: 0, display: "flex", alignItems: "center", gap: "6px",
};

const inputStyle = {
  width: "100%", padding: "11px 14px", borderRadius: "10px",
  border: "1.5px solid #E8E2DA", fontSize: "15px", outline: "none",
  background: "#FAFAF8", color: "#1C1814", fontFamily: "inherit",
};

const primaryBtn = {
  background: "linear-gradient(90deg, #7C3AED, #a855f7)",
  color: "#FFF", border: "none", borderRadius: "12px",
  padding: "14px", fontSize: "15px", fontWeight: "800",
  cursor: "pointer", fontFamily: "inherit", width: "100%",
};

const BASE_CSS = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pnp-game-row:hover  { transform: translateX(4px); border-color: #7C3AED !important; background: #F3F0FF !important; }
  .pnp-lang-btn:hover  { border-color: #7C3AED !important; background: #F3F0FF !important; transform: translateY(-2px); }
  .pnp-level-row:hover { transform: translateX(4px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
  .pnp-game-row, .pnp-lang-btn, .pnp-level-row { transition: all 0.15s ease; }
`;

// ── Main Component ────────────────────────────────────────────────────────────
const PassAndPlay = () => {
  const navigate = useNavigate();

  const [step, setStep]               = useState("names");
  const [player1, setPlayer1]         = useState("");
  const [player2, setPlayer2]         = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);

  const p1 = player1 || "Player 1";
  const p2 = player2 || "Player 2";

  // ── STEP 1 — Enter Names ──────────────────────────────────────────────────
  if (step === "names") return (
    <div style={pageStyle}>
      <style>{BASE_CSS}</style>
      <div style={cardStyle}>
        <button onClick={() => navigate("/home")} style={backBtn}>← Back</button>

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span style={{ fontSize: "44px", display: "block", marginBottom: "10px" }}>🤝</span>
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1C1814", margin: "0 0 6px" }}>Pass &amp; Play</h1>
          <p style={{ fontSize: "14px", color: "#7A7268", margin: 0 }}>Two players, one device — take turns!</p>
        </div>

        <StepBar step={step} />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
          {[
            { label: "Player 1 Name", val: player1, set: setPlayer1, color: PLAYER_COLORS[0], emoji: "🟣" },
            { label: "Player 2 Name", val: player2, set: setPlayer2, color: PLAYER_COLORS[1], emoji: "🔵" },
          ].map(({ label, val, set, color, emoji }) => (
            <div key={label}>
              <label style={{ fontSize: "12px", fontWeight: "700", color, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                {emoji} {label}
              </label>
              <input value={val} onChange={e => set(e.target.value)} placeholder={label} maxLength={20} style={inputStyle} />
            </div>
          ))}
        </div>

        <button onClick={() => setStep("game")} style={primaryBtn}>
          Next: Choose Game →
        </button>
      </div>
    </div>
  );

  // ── STEP 2 — Pick Game ────────────────────────────────────────────────────
  if (step === "game") return (
    <div style={pageStyle}>
      <style>{BASE_CSS}</style>
      <div style={{ ...cardStyle, maxWidth: "520px" }}>
        <button onClick={() => setStep("names")} style={backBtn}>← Back</button>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: "800", color: "#1C1814", margin: "0 0 6px" }}>Choose a Game</h1>
          <p style={{ fontSize: "13px", color: "#7A7268", margin: 0 }}>
            <span style={{ color: PLAYER_COLORS[0], fontWeight: "700" }}>{p1}</span>
            {" "}&amp;{" "}
            <span style={{ color: PLAYER_COLORS[1], fontWeight: "700" }}>{p2}</span>
            {" "}— pick your game!
          </p>
        </div>

        <StepBar step={step} />

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {GAMES.map(game => (
            <div
              key={game.id}
              className="pnp-game-row"
              onClick={() => { setSelectedGame(game); setStep("language"); }}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 16px", borderRadius: "14px",
                border: `2px solid ${selectedGame?.id === game.id ? "#7C3AED" : "#E8E2DA"}`,
                background: selectedGame?.id === game.id ? "#F3F0FF" : "#FAFAF8",
                cursor: "pointer",
              }}
            >
              <div style={{
                width: "46px", height: "46px", borderRadius: "12px",
                background: game.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "22px", flexShrink: 0,
              }}>
                {game.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#1C1814" }}>{game.title}</div>
                <div style={{ fontSize: "12px", color: "#9C9489", marginTop: "2px" }}>{game.desc}</div>
              </div>
              <span style={{ fontSize: "20px", color: "#C0B8B0" }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── STEP 3 — Pick Language ────────────────────────────────────────────────
  if (step === "language") return (
    <div style={pageStyle}>
      <style>{BASE_CSS}</style>
      <div style={{ ...cardStyle, maxWidth: "480px" }}>
        <button onClick={() => setStep("game")} style={backBtn}>← Back</button>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#F3F0FF", padding: "6px 14px", borderRadius: "99px", marginBottom: "12px",
          }}>
            <span style={{ fontSize: "18px" }}>{selectedGame?.icon}</span>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#7C3AED" }}>{selectedGame?.title}</span>
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: "800", color: "#1C1814", margin: "0 0 4px" }}>Choose Language</h1>
          <p style={{ fontSize: "13px", color: "#7A7268", margin: 0 }}>What topic will you be tested on?</p>
        </div>

        <StepBar step={step} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {LANGUAGES.map(lang => (
            <div
              key={lang.id}
              className="pnp-lang-btn"
              onClick={() => { setSelectedLang(lang); setStep("level"); }}
              style={{
                padding: "14px 8px", borderRadius: "12px",
                border: `2px solid ${selectedLang?.id === lang.id ? "#7C3AED" : "#E8E2DA"}`,
                background: selectedLang?.id === lang.id ? "#F3F0FF" : "#FAFAF8",
                cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", gap: "6px",
              }}
            >
              <span style={{ fontSize: "22px" }}>{lang.emoji}</span>
              <span style={{ fontSize: "12px", fontWeight: "700", color: selectedLang?.id === lang.id ? "#7C3AED" : "#6B6560", textAlign: "center" }}>
                {lang.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── STEP 4 — Pick Level ───────────────────────────────────────────────────
  if (step === "level") return (
    <div style={pageStyle}>
      <style>{BASE_CSS}</style>
      <div style={{ ...cardStyle, maxWidth: "440px" }}>
        <button onClick={() => setStep("language")} style={backBtn}>← Back</button>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {/* Selected game + language badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#F3F0FF", padding: "5px 12px", borderRadius: "99px" }}>
              <span style={{ fontSize: "16px" }}>{selectedGame?.icon}</span>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#7C3AED" }}>{selectedGame?.title}</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#F0F9FF", padding: "5px 12px", borderRadius: "99px" }}>
              <span style={{ fontSize: "16px" }}>{selectedLang?.emoji}</span>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#0891b2" }}>{selectedLang?.label}</span>
            </div>
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: "800", color: "#1C1814", margin: "0 0 4px" }}>Choose Difficulty</h1>
          <p style={{ fontSize: "13px", color: "#7A7268", margin: 0 }}>How hard do you want it?</p>
        </div>

        <StepBar step={step} />

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          {LEVELS.map(level => (
            <div
              key={level.id}
              className="pnp-level-row"
              onClick={() => {
                // Navigate to the game route, passing player names via state
                navigate(
                  `/games/${selectedGame.route}/play/${selectedLang.id}/${level.id}`,
                  {
                    state: {
                      passAndPlay: true,
                      player1: p1,
                      player2: p2,
                    },
                  }
                );
              }}
              style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "18px 20px", borderRadius: "14px",
                border: `2px solid ${level.border}`,
                background: level.bg, cursor: "pointer",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: "800", color: level.color }}>{level.label}</div>
                <div style={{ fontSize: "13px", color: "#6B6560", marginTop: "2px" }}>{level.desc}</div>
              </div>
              <span style={{ fontSize: "22px", color: level.color }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#F3F0FF", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", color: "#5B4A9F", lineHeight: 1.6 }}>
          <strong>How it works:</strong> Players take turns answering on the same device. Pass the device after each question. Highest score wins!
        </div>
      </div>
    </div>
  );

  return null;
};

export default PassAndPlay;