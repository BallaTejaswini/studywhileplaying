// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate, Link } from "react-router-dom";
// import { auth } from "../firebase/FireBaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/FireBaseConfig";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email.includes("@")) {
      newErrors.email = "Email must include @";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignin = async () => {
    if (!validate()) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
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
        .signin-btn:hover { transform: scale(1.03); transition: transform 0.2s; }
        .input-field::placeholder { color: #aaa; }
        .input-field:focus { outline: none; background: #ede8ff !important; }
        .input-field { color: #333; }
      `}</style>

      <div style={styles.root}>
        <div style={styles.card}>

          {/* Logo */}
          <div style={styles.logoWrap}>
            <span style={styles.logoIcon}>🎮</span>
            <h1 style={styles.logoText}>Welcome Back!</h1>
            <p style={styles.logoSub}>Sign in to continue playing</p>
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

          {/* Button */}
          <button className="signin-btn" style={styles.btn} onClick={handleSignin}>
            Sign In →
          </button>

          <p style={styles.bottomText}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.link}>Sign Up</Link>
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

export default SignIn;