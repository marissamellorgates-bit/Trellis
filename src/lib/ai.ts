import type { AIMessage, FamilyMember, DomainKey, PlantArchetype, SparkResult } from '../types';

// ── Configuration ───────────────────────────────────────────

export function isAIConfigured(): boolean {
  // Runtime check: always true when /api/ai endpoint exists (production + proxied dev)
  return true;
}

/** @deprecated Use isAIConfigured() */
export const isGeminiConfigured = isAIConfigured;

// ── Error Handling ──────────────────────────────────────────

export type AIErrorCode = 'RATE_LIMIT' | 'AUTH' | 'NETWORK' | 'SAFETY' | 'PARSE';

export class AIError extends Error {
  code: AIErrorCode;
  retryAfter?: number;

  constructor(code: AIErrorCode, message: string, retryAfter?: number) {
    super(message);
    this.name = 'AIError';
    this.code = code;
    this.retryAfter = retryAfter;
  }
}

/** @deprecated Use AIError */
export const GeminiError = AIError;
/** @deprecated Use AIErrorCode */
export type GeminiErrorCode = AIErrorCode;

// ── Module-Specific Prompts ─────────────────────────────────

const MODULE_PROMPTS: Record<number, string> = {
  1: `MODULE 1 — The Seed (Discovery & Alignment).
This is the very beginning. The user needs to:
1. Write down their goal or dream clearly
2. Identify which life domains (Land/Sea/Sky) this project touches
3. Choose a plant archetype that matches their energy (Sunflower=Visionary, Oak=Builder, Cactus=Survivor)
4. Pass the Ethics Check (Earth Care, People Care, Fair Share)
Help them get specific. "I want to be healthier" is too vague — guide them toward "I want to run a 5K by June." Ask what success looks like.`,

  2: `MODULE 2 — The Roots (Knowledge Accumulation).
The user's job right now is to LEARN. They should be:
1. Reading books, articles, watching videos related to their goal
2. Logging what they learn in their Knowledge Log (click "Enter The Roots" on the dashboard)
3. Writing down open questions — things they don't know yet
4. Identifying knowledge gaps
Guide them to find specific resources. Suggest they log at least 3 knowledge entries before moving on. Ask what they've been reading or studying.`,

  3: `MODULE 3 — The Stem (Experiential Learning).
The user's job now is to ACT and EXPERIMENT. They should be:
1. Taking real-world actions based on what they learned in Module 2
2. Logging experiences with evidence and outcomes (click "Enter The Stem")
3. Running small experiments — trying things, seeing what works
4. Documenting what happened, not just what they planned
Push them to do something concrete this week. Ask what they've tried so far and what happened.`,

  4: `MODULE 4 — The Leaves (Pattern Recognition & Synthesis).
The user's job is to CONNECT THE DOTS. They should be:
1. Looking across their knowledge log and experience log for patterns
2. Writing pattern entries that link what they learned to what they experienced
3. Doing the Clearing Practice — letting go of approaches that aren't working
4. Synthesizing insights into actionable wisdom
Ask them what patterns they're noticing. What keeps coming up? What should they stop doing?`,

  5: `MODULE 5 — The Bloom (Community Extension).
The user's job is to SHARE and GET FEEDBACK. They should be:
1. Sharing their project with others — friends, family, colleagues, online communities
2. Collecting feedback and iterating based on what they hear
3. Teaching what they've learned to someone else
4. Building connections around their project
Ask who they've shared with. What feedback did they get? How did it change their approach?`,

  6: `MODULE 6 — The Fruit (Utilizing Abundance).
The user's project should be producing real value now. They should be:
1. Identifying what impact their project has created
2. Tracking tangible results and outcomes
3. Giving back — sharing resources, mentoring others, contributing (Fair Share)
4. Thinking about who benefits from what they've built
Ask what concrete results they can point to. How are they sharing their abundance?`,

  7: `MODULE 7 — The Harvest (Synthesis & Sharing).
This is the final module. The user needs to:
1. Write their wisdom — the key lessons from this entire journey
2. Decide what to share and with whom
3. Identify "seeds to scatter" — ideas for future projects inspired by this one
4. Complete the Harvest ritual to finish and start fresh
Help them reflect on the full journey from Seed to Harvest. What would they tell someone just starting?`,
};

// ── System Prompt Builders ──────────────────────────────────

function buildGuideSystemPrompt(
  member: FamilyMember,
  domainScores: { land: number; sea: number; sky: number },
): string {
  const modulePrompt = MODULE_PROMPTS[member.currentModule] || '';

  const recentSows = member.sowLog.slice(-5).map(s =>
    `- [${s.tier}] ${s.note} (${s.domain})`
  ).join('\n');

  const knowledgeEntries = member.knowledgeLog.slice(-3).map(k =>
    `- ${k.resource} (${k.type}): ${k.notes}`
  ).join('\n');

  const openQuestions = member.questionMap
    .filter(q => q.status !== 'answered')
    .slice(-3)
    .map(q => `- ${q.question} [${q.status}]`)
    .join('\n');

  const recentExperiences = member.experienceLog.slice(-3).map(e =>
    `- ${e.action}: ${e.outcome}`
  ).join('\n');

  const patterns = member.patternJournal.slice(-3).map(p =>
    `- ${p.pattern}: ${p.insight}`
  ).join('\n');

  const tasks = member.tasks
    .filter(t => !t.done)
    .slice(0, 5)
    .map(t => `- ${t.title} (${t.domain}, due: ${t.due})`)
    .join('\n');

  const imbalanceNote = (() => {
    const scores = [
      { name: 'Land', score: domainScores.land },
      { name: 'Sea', score: domainScores.sea },
      { name: 'Sky', score: domainScores.sky },
    ];
    const max = Math.max(...scores.map(s => s.score));
    const min = Math.min(...scores.map(s => s.score));
    if (max - min >= 25) {
      const weakest = scores.find(s => s.score === min)!;
      return `\n\nIMPORTANT: There is a domain imbalance. ${weakest.name} (${weakest.score}%) is significantly behind. Gently guide the user to consider what's being neglected in their ${weakest.name} domain.`;
    }
    return '';
  })();

  return `You are The Guide — a wise, warm mentor who speaks like a cross between a knowledgeable librarian and a patient sage. You are part of Trellis, a life growth system.

YOUR VOICE:
- You are practical and clear. You give real, actionable guidance — not riddles.
- You speak plainly. A light touch of warmth and wisdom, but never flowery or overly metaphorical.
- You sound like someone who has read every book in the library and lived a full life. Calm, encouraging, direct.
- You ask thoughtful questions to help the user think deeper, but you ALSO teach them what to do next.
- Keep responses to 2-4 sentences. Be concise. One question per response is plenty.
- NEVER narrate what you see ("I see you are nurturing a sunflower..."). Just talk to them like a person.
- NEVER use excessive nature metaphors. You can use them sparingly, but your primary job is to be HELPFUL, not poetic.
- Use "you" and "your" — speak directly to the user.

YOUR JOB:
- Help the user understand what their current module requires and guide them to complete it.
- If they seem lost, tell them specifically what they should do next.
- If they're making progress, acknowledge it and push them a little further.
- Prioritize Earth Care, People Care, Fair Share as ethical guardrails — mention them when relevant, not in every response.

CURRENT CONTEXT:
- Project: "${member.projectTitle}" (${member.projectPlant} archetype)
- Module: ${member.currentModule}/7
- Domain Scores: Land ${domainScores.land}%, Sea ${domainScores.sea}%, Sky ${domainScores.sky}%

${modulePrompt}

${recentSows ? `RECENT ACTIVITY (Sow Log):\n${recentSows}` : ''}
${knowledgeEntries ? `\nKNOWLEDGE LOG:\n${knowledgeEntries}` : ''}
${openQuestions ? `\nOPEN QUESTIONS:\n${openQuestions}` : ''}
${recentExperiences ? `\nEXPERIENCE LOG:\n${recentExperiences}` : ''}
${patterns ? `\nPATTERN JOURNAL:\n${patterns}` : ''}
${tasks ? `\nCURRENT TASKS:\n${tasks}` : ''}
${imbalanceNote}

TASK SUGGESTIONS:
When you think of a specific task the user should do, include it at the very end of your response as a JSON object on its own line:
{"task": {"title": "task description here", "domain": "domainKey"}}
Use one of these domain keys: biological, mentalClarity, environmentalOrder, coreCompetencies, experimentalTendrils, reflectiveSynthesis, passiveRestoration, activePlay, solitude, innerCircle, socialCommunion, safePort, professionalExchange, marketRealities, instructionalCurrent, networking, culturalImmersion, publicReputation, creativeFlow, physicalExhilaration, aweAndWonder, radicalImagination, beautyExploration, emotionalRelease, spiritualPurpose, lifeVision, purePlay.
Only suggest a task when it naturally fits the conversation. Do not force task suggestions.`;
}

const SPARK_SYSTEM_PROMPT = `You are the Spark Architect, an AI that analyzes a user's goal or dream and suggests which life domains it touches and what plant archetype best fits their energy.

DOMAIN KEYS (choose 2-5 that best fit). Use the friendly name (in parentheses) when writing rationale text — never expose raw keys to the user:
- Land (Foundation): biological (Physical Health), mentalClarity (Mental Clarity), environmentalOrder (Home & Order), coreCompetencies (Crafts), experimentalTendrils (Exploration), reflectiveSynthesis (Reflection), passiveRestoration (Rest), activePlay (Active Play), solitude (Solitude)
- Sea (Social): innerCircle (Inner Circle), socialCommunion (Community), safePort (Safe Port), professionalExchange (Career), marketRealities (Finance), instructionalCurrent (Learning), networking (Networking), culturalImmersion (Culture), publicReputation (Reputation)
- Sky (Aspiration): creativeFlow (Creative Flow), physicalExhilaration (Adventure), aweAndWonder (Awe & Wonder), radicalImagination (Imagination), beautyExploration (Beauty), emotionalRelease (Emotional Release), spiritualPurpose (Purpose), lifeVision (Life Vision), purePlay (Pure Play)

ARCHETYPES (choose exactly one). Each archetype belongs to a category — Visionary (Sky), Builder (Sea), or Survivor (Land):

Visionary (Sky — Beautiful Flowers):
- sunflower: "The Visionary" — creativity, turns to face the light
- rose: "The Explorer" — wonder, beauty found through thorns
- orchid: "The Alchemist" — imagination, exotic transformation
- cherryBlossom: "The Artist" — beauty, fleeting perfection
- lotus: "The Enlightened" — spirit, rises from darkness, awakening
- birdOfParadise: "The Dreamer" — vision, dramatic, reaching skyward

Builder (Sea — Trees):
- oak: "The Builder" — family, the gathering tree, shelter
- apple: "The Provider" — village, communal harvest, shared abundance
- maple: "The Strategist" — finances, valuable resources
- pine: "The Sentinel" — opportunity, evergreen, always ready
- redwood: "The Networker" — connections, interconnected root systems
- olive: "The Diplomat" — culture, ancient heritage, peace

Survivor (Land — Medicine & Herbs):
- lavender: "The Survivor" — calm, aromatic resilience, soothing spirit
- aloe: "The Healer" — restoration, soothing balm, inner clarity
- chamomile: "The Artisan" — gentleness, patient healing, golden remedy
- sage: "The Contemplator" — wisdom, cleansing herb, deep reflection
- echinacea: "The Warrior" — defense, immune strength, bold petals
- ginseng: "The Hermit" — patience, deep roots, hidden power

Respond ONLY with valid JSON in this exact format:
{
  "suggestedTitle": "A concise, inspiring 2-5 word project title",
  "suggestedDomains": ["biological", "coreCompetencies"],
  "suggestedArchetype": "sunflower",
  "domainRationale": "Use ONLY the friendly names here, e.g. 'Physical Health' not 'biological'. Never show raw keys to the user.",
  "archetypeRationale": "Brief explanation of why this archetype fits."
}

CRITICAL: In domainRationale and archetypeRationale, ALWAYS use the friendly display names (the text in parentheses from the domain list above, e.g. "Physical Health", "Mental Clarity", "Adventure", "Crafts"). NEVER use raw camelCase keys like "biological" or "mentalClarity" in rationale text.

For suggestedTitle: Create a short, evocative project name (2-5 words) that captures the essence of the goal. Examples: "Trail Runner's Journey", "Garden to Table", "Code & Create". Do NOT just repeat the goal text.`;

// ── API Call Helper ─────────────────────────────────────────

async function callAIProxy(
  messages: Array<{ role: 'user' | 'assistant'; text: string }>,
  systemPrompt: string,
  maxOutputTokens: number,
  signal?: AbortSignal,
  imageData?: { mimeType: string; base64: string },
): Promise<string> {
  if (!isAIConfigured()) throw new AIError('AUTH', 'AI is not enabled.');

  let response: Response;
  try {
    response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        messages,
        systemPrompt,
        maxOutputTokens,
        temperature: 0.8,
        ...(imageData ? { imageData } : {}),
      }),
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }
    throw new AIError('NETWORK', 'Could not reach AI service. Check your connection.');
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorCode = (errorBody as Record<string, unknown>).errorCode as AIErrorCode | undefined;
    const errorMsg = (errorBody as Record<string, unknown>).error as string | undefined;
    const retryAfter = (errorBody as Record<string, unknown>).retryAfter as number | undefined;

    if (errorCode === 'RATE_LIMIT') {
      throw new AIError('RATE_LIMIT', errorMsg || 'Rate limited. Try again in a moment.', retryAfter);
    }
    if (errorCode === 'AUTH') {
      throw new AIError('AUTH', errorMsg || 'Invalid API key. Check your AI configuration.');
    }
    if (errorCode === 'SAFETY') {
      throw new AIError('SAFETY', errorMsg || 'Response was blocked by safety filters. Try rephrasing.');
    }
    throw new AIError(
      (errorCode as AIErrorCode) || 'NETWORK',
      errorMsg || `AI service returned status ${response.status}.`,
    );
  }

  const data = await response.json();
  const text = (data as Record<string, unknown>).text as string | undefined;
  if (!text) {
    throw new AIError('PARSE', 'Received an empty response from AI service.');
  }

  return text;
}

// ── Spark Refinement ────────────────────────────────────

const SPARK_REFINEMENT_SYSTEM_PROMPT = `You are The Guide — a warm, practical mentor helping someone turn a vague dream into a clear, measurable project goal.

YOUR APPROACH:
- Ask ONE question at a time. Keep it short and direct.
- Start by understanding what they want to achieve and why it matters to them.
- Then help them get specific: What does success look like? By when? How will they know they've made progress?
- After 2-3 exchanges, suggest a refined goal statement.
- Be warm but direct — no riddles, no excessive metaphors. Talk like a thoughtful friend who asks great questions.
- Keep responses to 2-3 sentences max.

WHEN YOU'RE READY TO SUGGEST A REFINED GOAL (after 2-3 exchanges):
End your response with a JSON object on its own line:
{"refinedGoal": "A clear, specific, measurable goal statement", "suggestedTitle": "2-5 word project name"}

The refinedGoal should be a single sentence that is specific, measurable, and time-bound where possible.
The suggestedTitle should be a short, evocative project name (2-5 words).
Only include this JSON when you have enough information to write a good goal. Do not rush it.`;

export interface RefinementResponse {
  text: string;
  refinedGoal?: string;
  suggestedTitle?: string;
}

export async function refineSparkGoal(
  messages: { role: 'user' | 'model'; text: string }[],
  signal?: AbortSignal,
): Promise<RefinementResponse> {
  // Convert 'model' role to 'assistant' for the proxy
  const proxyMessages = messages.map(msg => ({
    role: (msg.role === 'model' ? 'assistant' : 'user') as 'user' | 'assistant',
    text: msg.text,
  }));

  const rawText = await callAIProxy(proxyMessages, SPARK_REFINEMENT_SYSTEM_PROMPT, 2048, signal);

  // Try to extract a refined goal JSON from the end of the response
  const goalMatch = rawText.match(/\{"refinedGoal"\s*:[\s\S]*\}\s*$/);
  let refinedGoal: string | undefined;
  let suggestedTitle: string | undefined;
  let displayText = rawText;

  if (goalMatch) {
    try {
      const parsed = JSON.parse(goalMatch[0]);
      if (parsed.refinedGoal) {
        refinedGoal = parsed.refinedGoal;
        suggestedTitle = parsed.suggestedTitle;
        displayText = rawText.slice(0, goalMatch.index).trim();
      }
    } catch {
      // Malformed JSON — treat entire response as text
    }
  }

  return { text: displayText, refinedGoal, suggestedTitle };
}

// ── Public API ──────────────────────────────────────────────

interface GuideResponse {
  text: string;
  suggestedTask?: { title: string; domain: string };
}

export async function sendGuideMessage(
  history: AIMessage[],
  member: FamilyMember,
  domainScores: { land: number; sea: number; sky: number },
  signal?: AbortSignal,
): Promise<GuideResponse> {
  const systemPrompt = buildGuideSystemPrompt(member, domainScores);

  // Convert chat history to proxy format (last 20 messages)
  const recentHistory = history.slice(-20);
  const messages = recentHistory.map(msg => ({
    role: (msg.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
    text: msg.text,
  }));

  const rawText = await callAIProxy(messages, systemPrompt, 2048, signal);

  // Try to extract a task suggestion from the end of the response
  const taskMatch = rawText.match(/\{"task"\s*:\s*\{[^}]+\}\s*\}\s*$/);
  let suggestedTask: { title: string; domain: string } | undefined;
  let displayText = rawText;

  if (taskMatch) {
    try {
      const parsed = JSON.parse(taskMatch[0]);
      if (parsed.task?.title && parsed.task?.domain) {
        suggestedTask = { title: parsed.task.title, domain: parsed.task.domain };
        displayText = rawText.slice(0, taskMatch.index).trim();
      }
    } catch {
      // Malformed JSON — treat entire response as text
    }
  }

  return { text: displayText, suggestedTask };
}

// ── Image Task Extraction ─────────────────────────────────

const IMAGE_TASK_SYSTEM_PROMPT = `You extract tasks from images of handwritten or printed lists.

Look at the image and identify every task, to-do item, or action item written in it.

Respond ONLY with valid JSON — an array of objects:
[
  {"title": "Task description here", "estimatedMinutes": 30},
  {"title": "Another task", "estimatedMinutes": 15}
]

Rules:
- Extract each item as a separate task
- Clean up handwriting — fix obvious spelling/grammar
- estimatedMinutes is optional — include it only if you can reasonably guess
- If the image has no tasks or is unreadable, return an empty array: []
- Do NOT wrap the JSON in markdown code fences`;

export interface ExtractedTask {
  title: string;
  estimatedMinutes?: number;
}

export async function extractTasksFromImage(
  base64Image: string,
  mimeType: string,
): Promise<ExtractedTask[]> {
  const rawText = await callAIProxy(
    [{ role: 'user', text: 'Extract all tasks and to-do items from this image.' }],
    IMAGE_TASK_SYSTEM_PROMPT,
    1024,
    undefined,
    { mimeType, base64: base64Image },
  );

  const jsonMatch = rawText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new AIError('PARSE', 'Could not parse tasks from image.');
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) throw new Error('Not an array');
    return parsed
      .filter((t: unknown): t is Record<string, unknown> => typeof t === 'object' && t !== null && 'title' in t)
      .map((t) => ({
        title: String(t.title),
        estimatedMinutes: typeof t.estimatedMinutes === 'number' ? t.estimatedMinutes : undefined,
      }));
  } catch {
    throw new AIError('PARSE', 'Could not parse tasks from image.');
  }
}

export async function sparkArchitectAnalyze(
  goalText: string,
  signal?: AbortSignal,
): Promise<SparkResult> {
  const messages = [
    { role: 'user' as const, text: `Analyze this goal and suggest domains + archetype:\n\n"${goalText}"` },
  ];

  const rawText = await callAIProxy(messages, SPARK_SYSTEM_PROMPT, 2048, signal);

  // Extract JSON from the response (may be wrapped in markdown code fences)
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new AIError('PARSE', 'Could not parse Spark Architect response.');
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);

    // Validate the shape
    if (!Array.isArray(parsed.suggestedDomains) || !parsed.suggestedArchetype) {
      throw new Error('Invalid shape');
    }

    const validDomains: DomainKey[] = [
      'biological', 'mentalClarity', 'environmentalOrder',
      'coreCompetencies', 'experimentalTendrils', 'reflectiveSynthesis',
      'passiveRestoration', 'activePlay', 'solitude',
      'innerCircle', 'socialCommunion', 'safePort',
      'professionalExchange', 'marketRealities', 'instructionalCurrent',
      'networking', 'culturalImmersion', 'publicReputation',
      'creativeFlow', 'physicalExhilaration', 'aweAndWonder',
      'radicalImagination', 'beautyExploration', 'emotionalRelease',
      'spiritualPurpose', 'lifeVision', 'purePlay',
    ];

    const validArchetypes: PlantArchetype[] = [
      'sunflower', 'rose', 'orchid', 'cherryBlossom', 'lotus', 'birdOfParadise',
      'oak', 'apple', 'maple', 'pine', 'redwood', 'olive',
      'lavender', 'aloe', 'chamomile', 'sage', 'echinacea', 'ginseng',
    ];

    const filteredDomains = parsed.suggestedDomains.filter(
      (d: string) => validDomains.includes(d as DomainKey)
    ) as DomainKey[];

    const archetype = validArchetypes.includes(parsed.suggestedArchetype)
      ? parsed.suggestedArchetype as PlantArchetype
      : 'sunflower';

    return {
      suggestedTitle: parsed.suggestedTitle || '',
      suggestedDomains: filteredDomains.length > 0 ? filteredDomains : ['coreCompetencies'],
      suggestedArchetype: archetype,
      domainRationale: parsed.domainRationale || '',
      archetypeRationale: parsed.archetypeRationale || '',
    };
  } catch (err) {
    if (err instanceof AIError) throw err;
    throw new AIError('PARSE', 'Could not parse Spark Architect response.');
  }
}
