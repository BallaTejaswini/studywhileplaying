import { useState } from "react";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/FireBaseConfig";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (username.length < 5) {
      newErrors.username = "Username must be at least 5 characters";
    }

    // Email validation
    if (!email.includes("@")) {
      newErrors.email = "Email must include @";
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one capital letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      newErrors.password = "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      await signOut(auth);
      alert(`Account created! Welcome, ${username}. Please log in.`);
      navigate("/signin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(123,47,190,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(123,47,190,0); }
        }
        .signup-btn:hover { transform: scale(1.03); transition: transform 0.2s; }
        .input-field::placeholder { color: #aaa; }
        .input-field:focus { outline: none; background: #ede8ff !important; }
        .input-field { color: #333; }
      `}</style>

      <div style={styles.root}>
        <div style={styles.card}>

          {/* Logo */}
          <div style={styles.logoWrap}>
            <span style={styles.logoIcon}>🎮</span>
            <h1 style={styles.logoText}>Code While Playing</h1>
            <p style={styles.logoSub}>Create an account to save your progress</p>
          </div>

          {/* Username */}
          <div>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>👤</span>
              <input
                className="input-field"
                style={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                  autoComplete="off" 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {errors.username && <p style={styles.errorMsg}>⚠ {errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>✉️</span>
              <input
                className="input-field"
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                 autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p style={styles.errorMsg}>⚠ {errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                className="input-field"
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                autoComplete="new-password" 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && <p style={styles.errorMsg}>⚠ {errors.password}</p>}
          </div>

          {/* Password rules hint */}
          <div style={styles.hintBox}>
            <p style={styles.hintTitle}>Password must have:</p>
            <p style={{ ...styles.hintItem, color: password.length >= 6 ? "#16a34a" : "#aaa" }}>
              {password.length >= 6 ? "✅" : "○"} At least 6 characters
            </p>
            <p style={{ ...styles.hintItem, color: /[A-Z]/.test(password) ? "#16a34a" : "#aaa" }}>
              {/[A-Z]/.test(password) ? "✅" : "○"} One capital letter
            </p>
            <p style={{ ...styles.hintItem, color: /[0-9]/.test(password) ? "#16a34a" : "#aaa" }}>
              {/[0-9]/.test(password) ? "✅" : "○"} One number
            </p>
            <p style={{ ...styles.hintItem, color: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? "#16a34a" : "#aaa" }}>
              {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? "✅" : "○"} One special character
            </p>
          </div>

          {/* Button */}
          <button className="signup-btn" style={styles.btn} onClick={handleSignup}>
            Sign Up →
          </button>

          <p style={styles.bottomText}>
            Already have an account?{" "}
            <Link to="/signin" style={styles.link}>Sign In</Link>
          </p>

        </div>
      </div>
    </>
  );
};

const styles = {
  root: {
    minHeight: "100vh",
    background: "#f5f0eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    animation: "fadeInUp 0.6s ease both",
  },
  logoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "4px",
    gap: "6px",
  },
  logoIcon: { fontSize: "42px" },
  logoText: { fontSize: "22px", fontWeight: "800", color: "#111", margin: 0 },
  logoSub: { fontSize: "13px", color: "#999", margin: 0, textAlign: "center" },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    background: "#f5f0eb",
    borderRadius: "12px",
    padding: "0 16px",
    gap: "10px",
    border: "1px solid transparent",
  },
  inputIcon: { fontSize: "16px", opacity: 0.6 },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    padding: "14px 0",
    fontSize: "14px",
    outline: "none",
  },
  errorMsg: {
    color: "#e11d48",
    fontSize: "12px",
    margin: "4px 0 0 8px",
  },
  hintBox: {
    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "12px 16px",
    border: "1px solid #eee",
  },
  hintTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#555",
    margin: "0 0 6px",
  },
  hintItem: {
    fontSize: "12px",
    margin: "3px 0",
    transition: "color 0.3s",
  },
  btn: {
    background: "linear-gradient(90deg, #7B2FBE, #FF4D8D)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "4px",
    animation: "pulse 2s infinite",
  },
  bottomText: { textAlign: "center", fontSize: "13px", color: "#999", margin: 0 },
  link: { color: "#7B2FBE", fontWeight: "700", textDecoration: "none" },
};

export default SignUp;