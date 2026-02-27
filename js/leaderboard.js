// Leaderboard - Supabase API integration

// Anomaly detection: compute the theoretical maximum score achievable
// given the number of stages reached and total elapsed game time (ms).
// Constants mirror GAME_CONFIG and StageManager — keep in sync if those change.
function computeMaxPossibleScore(stageReached, elapsedMs) {
  const STAGE_DURATION = 20000;       // ms — GAME_CONFIG.STAGE_DURATION
  const BASE_SPAWN_RATE = 3000;       // ms — GAME_CONFIG.COLLECTIBLE_BASE_SPAWN_RATE
  const SPAWN_DECREMENT = 200;        // ms reduction per stage — StageManager.advanceStage
  const MIN_SPAWN_RATE = 1500;        // ms floor — StageManager.advanceStage
  const POINTS_PER_COLLECTIBLE = 5;  // GAME_CONFIG.COLLECTIBLE_POINTS

  let maxScore = 0;
  let timeRemaining = elapsedMs;

  for (let stage = 1; stage <= stageReached; stage++) {
    const spawnRate = Math.max(MIN_SPAWN_RATE, BASE_SPAWN_RATE - (stage - 1) * SPAWN_DECREMENT);
    const stageTime = Math.min(timeRemaining, STAGE_DURATION);
    maxScore += Math.ceil(stageTime / spawnRate) * POINTS_PER_COLLECTIBLE;
    timeRemaining -= stageTime;
    if (timeRemaining <= 0) break;
  }

  return maxScore;
}

const SUPABASE_URL = 'https://zodnlyucwnlskbkvblnv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZG5seXVjd25sc2tia3ZibG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTE4NjIsImV4cCI6MjA4NzU2Nzg2Mn0.SPV-BjNBpmgpjSiQrTEaFdBRO7n04VOeL4S1FOk75DY';

async function submitScore(name, score) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/Leaderboard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ name, score })
  });
  console.log('[Leaderboard] submit status:', res.status, await res.text());
  if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
}

async function fetchTopScores(limit = 10) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/Leaderboard?select=name,score&order=score.desc&limit=${limit}`,
    {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    }
  );
  const text = await res.text();
  console.log('[Leaderboard] fetch status:', res.status, text);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return JSON.parse(text);
}
