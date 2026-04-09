
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";

/**
 * Call this whenever a player wins/completes a game.
 * @param {string} userId   - from auth (user.uid)
 * @param {number} newScore - score earned in this game session
 */
export const updateGameStats = async (userId, newScore = 0) => {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  const today = new Date().toDateString(); // e.g. "Thu Apr 09 2026"

  if (!snap.exists()) {
    // First ever game — create the document
    await setDoc(ref, {
      games: 1,
      score: newScore,
      streak: 1,
      lastPlayed: today,
    });
    return;
  }

  const data = snap.data();
  const lastPlayed = data.lastPlayed || "";

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  let newStreak;
  if (lastPlayed === today) {
    // Already played today — don't increment streak again
    newStreak = data.streak;
  } else if (lastPlayed === yesterdayStr) {
    // Played yesterday — keep streak going
    newStreak = (data.streak || 0) + 1;
  } else {
    // Missed a day — reset streak
    newStreak = 1;
  }

  await updateDoc(ref, {
    games: increment(1),
    score: increment(newScore),
    streak: newStreak,
    lastPlayed: today,
  });
};