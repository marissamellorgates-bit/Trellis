import type { Task, DomainKey } from '../types';

// ── Configuration ───────────────────────────────────────────

const TODOIST_CLIENT_ID = import.meta.env.VITE_TODOIST_CLIENT_ID;

export function isTodoistConfigured(): boolean {
  return !!TODOIST_CLIENT_ID;
}

// ── Types ───────────────────────────────────────────────────

export interface TodoistTask {
  id: string;
  content: string;
  description: string;
  priority: number;
  due: { date: string; string: string } | null;
  project_id: string;
  labels: string[];
}

// ── OAuth ───────────────────────────────────────────────────

export function getTodoistAuthUrl(): string {
  const state = crypto.randomUUID();
  const redirectUri = `${window.location.origin}/todoist-callback.html`;
  const params = new URLSearchParams({
    client_id: TODOIST_CLIENT_ID,
    scope: 'data:read',
    state,
    redirect_uri: redirectUri,
  });
  return `https://todoist.com/oauth/authorize?${params.toString()}`;
}

export async function exchangeTodoistToken(code: string): Promise<string> {
  const redirectUri = `${window.location.origin}/todoist-callback.html`;
  const response = await fetch('/api/todoist-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirect_uri: redirectUri }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Token exchange failed' }));
    throw new Error(err.error || 'Token exchange failed');
  }

  const data = await response.json();
  return data.access_token;
}

// ── Fetch Tasks ─────────────────────────────────────────────

export async function fetchTodoistTasks(token: string): Promise<TodoistTask[]> {
  const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Todoist API error: ${response.status}`);
  }

  return response.json();
}

// ── Mapping ─────────────────────────────────────────────────

export function mapTodoistToTrellisTask(task: TodoistTask, domain: DomainKey): Task {
  return {
    id: Date.now() + Math.random(),
    title: task.content,
    domain,
    isProjectRelated: false,
    done: false,
    due: task.due?.string || 'Today',
  };
}
