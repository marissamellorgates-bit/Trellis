import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, redirect_uri } = req.body;

  if (!code || !redirect_uri) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const clientId = process.env.TODOIST_CLIENT_ID;
  const clientSecret = process.env.TODOIST_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Todoist OAuth not configured on server' });
  }

  try {
    const response = await fetch('https://todoist.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Todoist token exchange failed:', errorText);
      return res.status(400).json({ error: 'Token exchange failed' });
    }

    const data = await response.json();
    return res.status(200).json({ access_token: data.access_token });
  } catch (err) {
    console.error('Todoist auth error:', err);
    const message = err instanceof Error ? err.message : 'Auth failed';
    return res.status(500).json({ error: message });
  }
}
