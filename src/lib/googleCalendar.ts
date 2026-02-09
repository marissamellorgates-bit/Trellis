import type { ScheduleItem } from '../types';
import { guessEventType } from './eventTypeMapper';

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3';

let tokenClient: google.accounts.oauth2.TokenClient | null = null;

export function isGoogleAuthAvailable(): boolean {
  return (
    typeof google !== 'undefined' &&
    !!google.accounts?.oauth2 &&
    !!import.meta.env.VITE_GOOGLE_CLIENT_ID
  );
}

export function initGoogleAuth(
  onSuccess: (token: string) => void,
  onError: (err: string) => void,
): void {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    onError('VITE_GOOGLE_CLIENT_ID not configured');
    return;
  }

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: SCOPES,
    callback: (response) => {
      if (response.error) {
        onError(response.error);
      } else {
        onSuccess(response.access_token);
      }
    },
  });
}

export function requestGoogleAuth(): void {
  if (tokenClient) {
    tokenClient.requestAccessToken();
  }
}

interface GCalEvent {
  id: string;
  summary?: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

interface CalendarListEntry {
  id: string;
  selected?: boolean;
}

async function fetchCalendarIds(token: string): Promise<string[]> {
  const res = await fetch(`${CALENDAR_API}/users/me/calendarList`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Calendar list error: ${res.status}`);
  const data = await res.json();
  const calendars: CalendarListEntry[] = data.items ?? [];
  // Only include calendars the user has toggled visible in Google Calendar
  return calendars.filter(c => c.selected !== false).map(c => c.id);
}

async function fetchEventsForCalendar(
  token: string,
  calendarId: string,
  targetDate: string,
): Promise<ScheduleItem[]> {
  const timeMin = `${targetDate}T00:00:00Z`;
  const timeMax = `${targetDate}T23:59:59Z`;
  const encodedId = encodeURIComponent(calendarId);
  const url = `${CALENDAR_API}/calendars/${encodedId}/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return []; // Skip calendars we can't access

  const data = await res.json();
  const events: GCalEvent[] = data.items ?? [];
  const items: ScheduleItem[] = [];

  for (const ev of events) {
    if (!ev.start.dateTime) continue;
    const startDate = new Date(ev.start.dateTime);
    const h = String(startDate.getHours()).padStart(2, '0');
    const m = String(startDate.getMinutes()).padStart(2, '0');

    items.push({
      time: `${h}:${m}`,
      title: ev.summary || 'Untitled Event',
      type: guessEventType(ev.summary ?? '', ev.description),
      source: 'google',
      sourceId: ev.id,
      date: targetDate,
      description: ev.description || undefined,
    });
  }
  return items;
}

export async function fetchGoogleCalendarEvents(
  token: string,
  date?: string,
): Promise<ScheduleItem[]> {
  const targetDate = date ?? new Date().toISOString().slice(0, 10);
  const calendarIds = await fetchCalendarIds(token);

  const results = await Promise.all(
    calendarIds.map(id => fetchEventsForCalendar(token, id, targetDate))
  );

  return results.flat().sort((a, b) => a.time.localeCompare(b.time));
}
