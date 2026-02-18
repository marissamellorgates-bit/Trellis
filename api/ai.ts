import type { VercelRequest, VercelResponse } from '@vercel/node';

// ── Provider Interface ──────────────────────────────────────

interface ProviderMessage {
  role: 'user' | 'assistant';
  text: string;
  imageData?: { mimeType: string; base64: string };
}

interface ProviderRequest {
  messages: ProviderMessage[];
  systemPrompt: string;
  maxOutputTokens: number;
  temperature: number;
  apiKey: string;
  model?: string;
}

interface AIProvider {
  generateContent(req: ProviderRequest): Promise<string>;
}

// ── Gemini Provider ─────────────────────────────────────────

const geminiProvider: AIProvider = {
  async generateContent({ messages, systemPrompt, maxOutputTokens, temperature, apiKey, model }) {
    const modelId = model || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

    // Convert messages to Gemini format
    const contents = messages.map(msg => {
      const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];
      if (msg.imageData) {
        parts.push({ inlineData: { mimeType: msg.imageData.mimeType, data: msg.imageData.base64 } });
      }
      parts.push({ text: msg.text });
      return {
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts,
      };
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature, maxOutputTokens },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '30', 10);
        throw new ProxyError(429, 'RATE_LIMIT', 'Rate limited. Try again in a moment.', retryAfter);
      }
      if (status === 401 || status === 403) {
        throw new ProxyError(401, 'AUTH', 'Invalid API key. Check your AI configuration.');
      }
      throw new ProxyError(500, 'NETWORK', `Provider returned status ${status}.`);
    }

    const data = await response.json();

    if (data.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new ProxyError(500, 'SAFETY', 'Response was blocked by safety filters. Try rephrasing.');
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new ProxyError(500, 'PARSE', 'Received an empty response from provider.');
    }

    return text;
  },
};

// ── OpenAI Provider (stub) ──────────────────────────────────

const openaiProvider: AIProvider = {
  async generateContent({ messages, systemPrompt, maxOutputTokens, temperature, apiKey, model }) {
    const modelId = model || 'gpt-4o';
    const url = 'https://api.openai.com/v1/chat/completions';

    const oaiMessages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }> = [
      { role: 'system', content: systemPrompt },
    ];

    for (const msg of messages) {
      if (msg.imageData) {
        oaiMessages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:${msg.imageData.mimeType};base64,${msg.imageData.base64}` } },
            { type: 'text', text: msg.text },
          ],
        });
      } else {
        oaiMessages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.text,
        });
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelId,
        messages: oaiMessages,
        max_tokens: maxOutputTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '30', 10);
        throw new ProxyError(429, 'RATE_LIMIT', 'Rate limited. Try again in a moment.', retryAfter);
      }
      if (status === 401) {
        throw new ProxyError(401, 'AUTH', 'Invalid API key. Check your AI configuration.');
      }
      throw new ProxyError(500, 'NETWORK', `Provider returned status ${status}.`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      throw new ProxyError(500, 'PARSE', 'Received an empty response from provider.');
    }

    return text;
  },
};

// ── Claude Provider (stub) ──────────────────────────────────

const claudeProvider: AIProvider = {
  async generateContent({ messages, systemPrompt, maxOutputTokens, temperature, apiKey, model }) {
    const modelId = model || 'claude-sonnet-4-5-20250929';
    const url = 'https://api.anthropic.com/v1/messages';

    const claudeMessages: Array<{ role: string; content: string | Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }> }> = [];

    for (const msg of messages) {
      if (msg.imageData) {
        claudeMessages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: msg.imageData.mimeType, data: msg.imageData.base64 },
            },
            { type: 'text', text: msg.text },
          ],
        });
      } else {
        claudeMessages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.text,
        });
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: modelId,
        system: systemPrompt,
        messages: claudeMessages,
        max_tokens: maxOutputTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        const retryAfter = parseInt(response.headers.get('retry-after') || '30', 10);
        throw new ProxyError(429, 'RATE_LIMIT', 'Rate limited. Try again in a moment.', retryAfter);
      }
      if (status === 401) {
        throw new ProxyError(401, 'AUTH', 'Invalid API key. Check your AI configuration.');
      }
      throw new ProxyError(500, 'NETWORK', `Provider returned status ${status}.`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;
    if (!text) {
      throw new ProxyError(500, 'PARSE', 'Received an empty response from provider.');
    }

    return text;
  },
};

// ── Provider Registry ───────────────────────────────────────

const PROVIDERS: Record<string, AIProvider> = {
  gemini: geminiProvider,
  openai: openaiProvider,
  claude: claudeProvider,
};

// ── Error Class ─────────────────────────────────────────────

class ProxyError extends Error {
  httpStatus: number;
  errorCode: string;
  retryAfter?: number;

  constructor(httpStatus: number, errorCode: string, message: string, retryAfter?: number) {
    super(message);
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.retryAfter = retryAfter;
  }
}

// ── Request Handler ─────────────────────────────────────────

interface AIRequestBody {
  action: 'guide' | 'spark_architect' | 'spark_refine' | 'extract_tasks';
  messages: Array<{ role: 'user' | 'assistant'; text: string }>;
  systemPrompt: string;
  maxOutputTokens?: number;
  temperature?: number;
  imageData?: { mimeType: string; base64: string };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Resolve provider + key from env
  const providerName = (process.env.AI_PROVIDER || 'gemini').trim();
  const apiKey = (process.env.AI_API_KEY || '').trim();
  const model = process.env.AI_MODEL?.trim();

  if (!apiKey) {
    return res.status(500).json({ error: 'AI_API_KEY not configured on server', errorCode: 'AUTH' });
  }

  const provider = PROVIDERS[providerName];
  if (!provider) {
    return res.status(500).json({ error: `Unknown AI provider: ${providerName}`, errorCode: 'AUTH' });
  }

  const body = req.body as AIRequestBody;

  if (!body.messages || !body.systemPrompt) {
    return res.status(400).json({ error: 'Missing required fields: messages, systemPrompt' });
  }

  // Build provider messages, attaching imageData to the last user message if present
  const providerMessages: ProviderMessage[] = body.messages.map((msg, i) => {
    const pm: ProviderMessage = { role: msg.role, text: msg.text };
    // Attach image data to the last message if this is an image extraction request
    if (body.imageData && i === body.messages.length - 1) {
      pm.imageData = body.imageData;
    }
    return pm;
  });

  try {
    const text = await provider.generateContent({
      messages: providerMessages,
      systemPrompt: body.systemPrompt,
      maxOutputTokens: body.maxOutputTokens || 2048,
      temperature: body.temperature ?? 0.8,
      apiKey,
      model,
    });

    return res.status(200).json({ text });
  } catch (err) {
    if (err instanceof ProxyError) {
      const responseBody: Record<string, unknown> = {
        error: err.message,
        errorCode: err.errorCode,
      };
      if (err.retryAfter) responseBody.retryAfter = err.retryAfter;
      return res.status(err.httpStatus).json(responseBody);
    }

    console.error('AI proxy error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: message, errorCode: 'NETWORK' });
  }
}
