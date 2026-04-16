let sessions = [];
let coins = 0;

// 🌱 Save session + reward coins
export const saveSession = (session) => {
  sessions.push(session);
  coins += 10; // reward per session
};

// 📊 Get sessions
export const getSessions = () => {
  return sessions;
};

// 💰 Get coins
export const getCoins = () => {
  return coins;
};

// 🔥 STREAK SYSTEM
export const getStreak = () => {
  if (sessions.length === 0) return 0;

  let streak = 1;

  for (let i = sessions.length - 1; i > 0; i--) {
    const curr = new Date(sessions[i].date);
    const prev = new Date(sessions[i - 1].date);

    const diff = (curr - prev) / (1000 * 60 * 60 * 24);

    if (diff <= 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};