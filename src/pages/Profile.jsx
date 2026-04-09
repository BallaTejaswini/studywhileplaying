// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { signOut } from "firebase/auth";
// import { auth, db } from "../firebase/FireBaseConfig";
// import { doc, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/FireBaseConfig";
import { doc, onSnapshot} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ games: 0, score: 0, streak: 0 });
  const [loading, setLoading] = useState(true);

  // Live Firestore listener — updates instantly when stats change
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const { games = 0, score = 0, streak = 0 } = snap.data();
        setStats({ games, score, streak });
      }
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-link-btn:hover { color: #7B2FBE !important; }
        .signout-top:hover { background: #fee2e2 !important; color: #dc2626 !important; }
        .stat-card:hover { transform: translateY(-4px); transition: transform 0.2s; }
      `}</style>

      <div style={styles.root}>

        {/* NAVBAR */}
        <nav style={styles.nav}>
          <div style={styles.navLeft}>
            <button style={styles.backBtn} onClick={() => navigate("/home")}>←</button>
            <span style={styles.navIcon}>🎮</span>
            <span style={styles.navBrand}>Code While Playing</span>
          </div>
          <div style={styles.navLinks}>
            <span
              className="nav-link-btn"
              style={styles.navLink}
              onClick={() => navigate("/games")}
            >
              Games
            </span>
            <span
              className="nav-link-btn"
              style={{ ...styles.navLink, color: "#7B2FBE", fontWeight: "700" }}
            >
              Profile
            </span>
          </div>
          <div style={styles.navRight}>
            <button className="signout-top" style={styles.signoutBtn} onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </nav>

        {/* PROFILE CONTENT */}
        <div style={styles.content}>

          {/* Avatar */}
          <div style={styles.avatarWrap}>
            <div style={styles.avatar}>👤</div>
          </div>

          {/* Name & Email */}
          <h1 style={styles.userName}>
            {user?.displayName || "Guest User"}
          </h1>
          <p style={styles.userEmail}>{user?.email || "Sign up to save your progress"}</p>

          {/* Stats Row */}
          {loading ? (
            <div style={styles.loadingText}>Loading stats...</div>
          ) : (
            <div style={styles.statsRow}>
              <div className="stat-card" style={styles.statCard}>
                <span style={{ ...styles.statIcon, color: "#d97706" }}>🏆</span>
                <span style={styles.statNum}>{stats.games}</span>
                <span style={styles.statLabel}>Games</span>
              </div>
              <div className="stat-card" style={styles.statCard}>
                <span style={{ ...styles.statIcon, color: "#7B2FBE" }}>📖</span>
                <span style={styles.statNum}>{stats.score}</span>
                <span style={styles.statLabel}>Score</span>
              </div>
              <div className="stat-card" style={styles.statCard}>
                <span style={{ ...styles.statIcon, color: "#e11d48" }}>🔥</span>
                <span style={styles.statNum}>{stats.streak}</span>
                <span style={styles.statLabel}>Streak</span>
              </div>
            </div>
          )}

          {/* Save Progress Card — only show if not logged in */}
          {!user ? (
            <div style={styles.saveCard}>
              <h2 style={styles.saveTitle}>Save Your Progress</h2>
              <p style={styles.saveDesc}>
                Sign up to track scores, unlock achievements, and compete with friends.
              </p>
              <button style={styles.saveBtn} onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>
          ) : (
            <div style={styles.saveCard}>
              <h2 style={styles.saveTitle}>Keep Playing!</h2>
              <p style={styles.saveDesc}>
                Complete more games to grow your score and keep your streak alive 🔥
              </p>
              <button style={styles.saveBtn} onClick={() => navigate("/games")}>
                Play Games
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

const styles = {
  root: {
    minHeight: "100vh",
    background: "#f5f0eb",
    fontFamily: "'Segoe UI', sans-serif",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  navLeft: { display: "flex", alignItems: "center", gap: "10px" },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#555",
    padding: "4px 8px",
  },
  navIcon: { fontSize: "22px" },
  navBrand: { fontWeight: "800", fontSize: "17px", color: "#111" },
  navLinks: { display: "flex", gap: "32px" },
  navLink: { fontSize: "15px", color: "#555", cursor: "pointer", fontWeight: "500" },
  navRight: { display: "flex", alignItems: "center", gap: "12px" },
  signoutBtn: {
    background: "#f5f5f5",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "7px 16px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    color: "#555",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 24px",
    animation: "fadeInUp 0.5s ease both",
  },
  avatarWrap: { marginBottom: "16px" },
  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#ede9fe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    border: "3px solid #c4b5fd",
  },
  userName: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#111",
    margin: "0 0 6px",
  },
  userEmail: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 36px",
  },
  loadingText: {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "32px",
  },
  statsRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "32px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  statCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    minWidth: "120px",
    cursor: "default",
  },
  statIcon: { fontSize: "24px" },
  statNum: { fontSize: "28px", fontWeight: "900", color: "#111" },
  statLabel: { fontSize: "13px", color: "#888" },
  saveCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "36px 40px",
    maxWidth: "480px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
  },
  saveTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#111",
    margin: "0 0 10px",
  },
  saveDesc: {
    fontSize: "14px",
    color: "#888",
    lineHeight: 1.6,
    margin: "0 0 24px",
  },
  saveBtn: {
    background: "linear-gradient(90deg, #7B2FBE, #FF4D8D)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 40px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Profile;