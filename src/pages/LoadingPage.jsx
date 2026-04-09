// import { useState, useEffect } from "react";
import { useState, useEffect } from "react";

const loadingMessages = [
  "Setting up your playground...",
  "Loading challenges...",
  "Preparing code editor...",
  "Almost ready to play!",
];

export default function LoadingPage({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [dots, setDots] = useState("");

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete && onComplete(), 600);
          return 100;
        }
        return p + 1;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Cycle messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #ffffff;
          font-family: 'Poppins', sans-serif;
        }

        .loading-root {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* Background decorative circles */
        .bg-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.06;
          pointer-events: none;
        }
        .bg-circle-1 {
          width: 500px; height: 500px;
          background: #6C63FF;
          top: -150px; left: -150px;
        }
        .bg-circle-2 {
          width: 400px; height: 400px;
          background: #FF6B35;
          bottom: -120px; right: -100px;
        }
        .bg-circle-3 {
          width: 200px; height: 200px;
          background: #00C896;
          top: 60%; left: 10%;
        }

        /* Grid dots pattern */
        .bg-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #ddd 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.4;
          pointer-events: none;
        }

        /* Center card */
        .card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          background: #fff;
          border-radius: 28px;
          padding: 52px 56px 44px;
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.06),
            0 20px 60px rgba(0,0,0,0.08),
            0 4px 12px rgba(0,0,0,0.04);
          min-width: 360px;
          max-width: 440px;
          width: 90vw;
        }

        /* Pencil + Controller icon stack */
        .icon-stack {
          position: relative;
          width: 90px;
          height: 90px;
          margin-bottom: 28px;
        }
        .icon-bg {
          width: 90px;
          height: 90px;
          border-radius: 24px;
          background: linear-gradient(135deg, #6C63FF 0%, #FF6B35 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          box-shadow: 0 8px 24px rgba(108,99,255,0.35);
          animation: pulse 2s ease-in-out infinite;
        }
        .icon-badge {
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 30px;
          height: 30px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          border: 2px solid #f5f5f5;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 24px rgba(108,99,255,0.35); }
          50% { transform: scale(1.06); box-shadow: 0 12px 32px rgba(108,99,255,0.5); }
        }

        /* Title */
        .title {
          font-size: 30px;
          font-weight: 900;
          color: #111;
          letter-spacing: -0.5px;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .title span {
          background: linear-gradient(90deg, #6C63FF, #FF6B35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 13px;
          color: #999;
          font-family: 'Space Mono', monospace;
          margin-bottom: 36px;
          text-align: center;
        }

        /* Progress */
        .progress-wrap {
          width: 100%;
          margin-bottom: 12px;
        }
        .progress-track {
          width: 100%;
          height: 8px;
          background: #f0f0f0;
          border-radius: 99px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #6C63FF 0%, #FF6B35 60%, #FFD700 100%);
          transition: width 0.035s linear;
          position: relative;
        }
        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 20px; height: 100%;
          background: rgba(255,255,255,0.5);
          border-radius: 99px;
          filter: blur(4px);
        }

        .progress-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }
        .progress-msg {
          font-size: 12px;
          color: #888;
          font-family: 'Space Mono', monospace;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 240px;
        }
        .progress-pct {
          font-size: 13px;
          font-weight: 700;
          color: #6C63FF;
          font-family: 'Space Mono', monospace;
          flex-shrink: 0;
          margin-left: 12px;
        }

        /* Spinner dots */
        .spinner-row {
          display: flex;
          gap: 8px;
          margin-top: 28px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6C63FF;
          animation: bounce 1.2s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.15s; background: #FF6B35; }
        .dot:nth-child(3) { animation-delay: 0.30s; background: #FFD700; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }

        /* Footer */
        .footer-text {
          position: absolute;
          bottom: 28px;
          font-size: 11px;
          color: #ccc;
          font-family: 'Space Mono', monospace;
          z-index: 2;
        }
      `}</style>

      <div className="loading-root">
        {/* Background */}
        <div className="bg-dots" />
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />

        {/* Main Card */}
        <div className="card">
          {/* Icon */}
          <div className="icon-stack">
            <div className="icon-bg">🎮</div>
            <div className="icon-badge">✏️</div>
          </div>

          {/* Title */}
          <div className="title">
            Code <span>While</span> Playing
          </div>
          <div className="subtitle">// learn · build · play{dots}</div>

          {/* Progress Bar */}
          <div className="progress-wrap">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-row">
              <span className="progress-msg">{loadingMessages[msgIndex]}</span>
              <span className="progress-pct">{progress}%</span>
            </div>
          </div>

          {/* Bouncing dots */}
          <div className="spinner-row">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>

        <div className="footer-text">Code While Playing © 2026</div>
      </div>
    </>
  );
}