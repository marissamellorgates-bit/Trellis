import type { AIMessage, FamilyMember, DomainKey, PlantArchetype, SparkResult } from '../types';

// ── Configuration ───────────────────────────────────────────

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export function isGeminiConfigured(): boolean {
  return !!(import.meta.env.VITE_GEMINI_API_KEY);
}

// ── Error Handling ──────────────────────────────────────────

export type GeminiErrorCode = 'RATE_LIMIT' | 'AUTH' | 'NETWORK' | 'SAFETY' | 'PARSE';

export class GeminiError extends Error {
  code: GeminiErrorCode;
  retryAfter?: number;

  constructor(code: GeminiErrorCode, message: string, retryAfter?: number) {
    super(message);
    this.name = 'GeminiError';
    this.code = code;
    this.retryAfter = retryAfter;
  }
}

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

DOMAIN KEYS (choose 2-5 that best fit):
- Land (Foundation): biological, mentalClarity, environmentalOrder, coreCompetencies, experimentalTendrils, reflectiveSynthesis, passiveRestoration, activePlay, solitude
- Sea (Social): innerCircle, socialCommunion, safePort, professionalExchange, marketRealities, instructionalCurrent, networking, culturalImmersion, publicReputation
- Sky (Aspiration): creativeFlow, physicalExhilaration, aweAndWonder, radicalImagination, beautyExploration, emotionalRelease, spiritualPurpose, lifeVision, purePlay

ARCHETYPES (choose exactly one):
- sunflower: "The Visionary" — creative, spiritual, intellectual pursuits
- oak: "The Builder" — legacy, financial, long-term growth
- cactus: "The Survivor" — resilience, health, efficiency

Respond ONLY with valid JSON in this exact format:
{
  "suggestedDomains": ["domain1", "domain2", "domain3"],
  "suggestedArchetype": "sunflower",
  "domainRationale": "Brief explanation of why these domains were chosen.",
  "archetypeRationale": "Brief explanation of why this archetype fits."
}`;

// ── API Call Helper ─────────────────────────────────────────

interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

async function callGemini(
  contents: GeminiContent[],
  systemInstruction: string,
  maxOutputTokens: number,
  signal?: AbortSignal,
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new GeminiError('AUTH', 'Gemini API key is not configured.');

  let response: Response;
  try {
    response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }
    throw new GeminiError('NETWORK', 'Could not reach Gemini. Check your connection.');
  }

  if (!response.ok) {
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '30', 10);
      throw new GeminiError('RATE_LIMIT', 'Rate limited. Try again in a moment.', retryAfter);
    }
    if (response.status === 401 || response.status === 403) {
      throw new GeminiError('AUTH', 'Invalid API key. Check your Gemini configuration.');
    }
    throw new GeminiError('NETWORK', `Gemini returned status ${response.status}.`);
  }

  const data = await response.json();

  // Check for safety blocks
  if (data.candidates?.[0]?.finishReason === 'SAFETY') {
    throw new GeminiError('SAFETY', 'Response was blocked by safety filters. Try rephrasing.');
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new GeminiError('PARSE', 'Received an empty response from Gemini.');
  }

  return text;
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

  // Convert chat history to Gemini format (last 20 messages)
  const recentHistory = history.slice(-20);
  const contents: GeminiContent[] = recentHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  const rawText = await callGemini(contents, systemPrompt, 2048, signal);

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

export async function sparkArchitectAnalyze(
  goalText: string,
  signal?: AbortSignal,
): Promise<SparkResult> {
  const contents: GeminiContent[] = [
    { role: 'user', parts: [{ text: `Analyze this goal and suggest domains + archetype:\n\n"${goalText}"` }] },
  ];

  const rawText = await callGemini(contents, SPARK_SYSTEM_PROMPT, 2048, signal);

  // Extract JSON from the response (may be wrapped in markdown code fences)
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new GeminiError('PARSE', 'Could not parse Spark Architect response.');
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

    const validArchetypes: PlantArchetype[] = ['sunflower', 'oak', 'cactus'];

    const filteredDomains = parsed.suggestedDomains.filter(
      (d: string) => validDomains.includes(d as DomainKey)
    ) as DomainKey[];

    const archetype = validArchetypes.includes(parsed.suggestedArchetype)
      ? parsed.suggestedArchetype as PlantArchetype
      : 'sunflower';

    return {
      suggestedDomains: filteredDomains.length > 0 ? filteredDomains : ['coreCompetencies'],
      suggestedArchetype: archetype,
      domainRationale: parsed.domainRationale || '',
      archetypeRationale: parsed.archetypeRationale || '',
    };
  } catch (err) {
    if (err instanceof GeminiError) throw err;
    throw new GeminiError('PARSE', 'Could not parse Spark Architect response.');
  }
}
