// Leaderboard - Supabase API integration

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
