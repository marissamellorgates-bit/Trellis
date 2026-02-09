import * as ICAL from 'ical.js';
import type { ScheduleItem } from '../types';
import { guessEventType } from './eventTypeMapper';

interface ParsedEvent {
  uid: string;
  summary: string;
  description: string;
  dtstart: ICAL.Time | null;
  dtend: ICAL.Time | null;
}

function parseICSFile(text: string): ParsedEvent[] {
  const jcalData = ICAL.parse(text);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  return vevents.map(ve => {
    const event = new ICAL.Event(ve);
    return {
      uid: event.uid,
      summary: event.summary ?? '',
      description: event.description ?? '',
      dtstart: event.startDate,
      dtend: event.endDate,
    };
  });
}

function formatTime(icalTime: ICAL.Time): string {
  const h = String(icalTime.hour).padStart(2, '0');
  const m = String(icalTime.minute).padStart(2, '0');
  return `${h}:${m}`;
}

function isAllDay(dtstart: ICAL.Time): boolean {
  return dtstart.isDate;
}

export function parseAndConvert(text: string, targetDate?: string): ScheduleItem[] {
  const events = parseICSFile(text);
  const dateStr = targetDate ?? new Date().toISOString().slice(0, 10);

  const items: ScheduleItem[] = [];

  for (const ev of events) {
    if (!ev.dtstart || isAllDay(ev.dtstart)) continue;

    const eventDate = ev.dtstart.toJSDate().toISOString().slice(0, 10);
    if (eventDate !== dateStr) continue;

    items.push({
      time: formatTime(ev.dtstart),
      title: ev.summary || 'Untitled Event',
      type: guessEventType(ev.summary, ev.description),
      source: 'ics',
      sourceId: ev.uid,
      date: eventDate,
      description: ev.description || undefined,
    });
  }

  return items.sort((a, b) => a.time.localeCompare(b.time));
}
