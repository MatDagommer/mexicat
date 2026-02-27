// Leaderboard - Supabase API integration

// Returns e.g. "1st", "2nd", "3rd", "13th", "21st"
function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Fetches how many scores are strictly above `score` (→ rank) and the total entry count.
async function fetchRankInfo(score) {
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Prefer': 'count=exact'
  };

  const [aboveRes, totalRes] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/Leaderboard?score=gt.${score}`, { method: 'HEAD', headers }),
    fetch(`${SUPABASE_URL}/rest/v1/Leaderboard`,                   { method: 'HEAD', headers })
  ]);

  const parseCount = res => {
    const range = res.headers.get('Content-Range');
    const match = range && range.match(/\/(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  };

  const above = parseCount(aboveRes);
  const total = parseCount(totalRes);
  if (above === null || total === null) return null;
  return { rank: above + 1, total };
}

const SUPABASE_URL = 'https://zodnlyucwnlskbkvblnv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZG5seXVjd25sc2tia3ZibG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTE4NjIsImV4cCI6MjA4NzU2Nzg2Mn0.SPV-BjNBpmgpjSiQrTEaFdBRO7n04VOeL4S1FOk75DY';

async function submitScore(name, score, stage, elapsed) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ name, score, stage, elapsed })
  });
  const text = await res.text();
  console.log('[Leaderboard] submit status:', res.status, text);
  if (!res.ok) throw new Error(`Submit failed: ${res.status} ${text}`);
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
