import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mirror of computeMaxPossibleScore in leaderboard.js — keep in sync if game constants change.
function computeMaxPossibleScore(stageReached: number, elapsedMs: number): number {
  const STAGE_DURATION = 20000;
  const BASE_SPAWN_RATE = 3000;
  const SPAWN_DECREMENT = 200;
  const MIN_SPAWN_RATE = 1500;
  const POINTS_PER_COLLECTIBLE = 5;

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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body: { name: unknown; score: unknown; stage: unknown; elapsed: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { name, score, stage, elapsed } = body;

  // Validate name
  if (typeof name !== 'string' || name.trim().length === 0 || name.trim().length > 32) {
    return new Response(JSON.stringify({ error: 'Invalid name' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate score
  if (typeof score !== 'number' || !Number.isInteger(score) || score < 0) {
    return new Response(JSON.stringify({ error: 'Invalid score' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Validate stage and elapsed
  if (typeof stage !== 'number' || !Number.isInteger(stage) || stage < 1) {
    return new Response(JSON.stringify({ error: 'Invalid stage' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (typeof elapsed !== 'number' || elapsed <= 0) {
    return new Response(JSON.stringify({ error: 'Invalid elapsed time' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Server-side anomaly detection
  const maxPossible = computeMaxPossibleScore(stage, elapsed);
  const TOLERANCE = 1.1;
  if (score > maxPossible * TOLERANCE) {
    console.warn(
      `[Anomaly] Score ${score} rejected (max: ${maxPossible}, elapsed: ${elapsed}ms, stage: ${stage})`
    );
    return new Response(JSON.stringify({ error: 'Score rejected: anomaly detected' }), {
      status: 422,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Insert using service role key (bypasses RLS, kept secret server-side)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { error } = await supabase.from('Leaderboard').insert({ name: name.trim(), score });

  if (error) {
    console.error('[submit-score] Insert error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save score' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
