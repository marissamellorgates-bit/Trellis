import type { ScheduleItem } from '../types';

const BIO_KEYWORDS = [
  'lunch', 'breakfast', 'dinner', 'walk', 'gym', 'workout', 'exercise',
  'meditation', 'meditate', 'yoga', 'doctor', 'therapy', 'dentist',
  'sleep', 'nap', 'break', 'commute', 'drive', 'shower', 'run',
  'stretch', 'health', 'self-care', 'rest',
];

const BLOCK_KEYWORDS = [
  'focus', 'deep work', 'study', 'research', 'reading', 'write',
  'writing', 'review', 'prep', 'prepare', 'plan', 'planning',
  'brainstorm', 'think', 'heads down', 'blocked time', 'do not disturb',
];

const PROJECT_KEYWORDS = [
  'project', 'sprint', 'build', 'design', 'prototype', 'ship',
  'deploy', 'launch', 'milestone', 'deliverable', 'hackathon',
];

function matchesAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}

export function guessEventType(title: string, description?: string): ScheduleItem['type'] {
  const combined = `${title} ${description ?? ''}`;
  if (matchesAny(combined, BIO_KEYWORDS)) return 'bio';
  if (matchesAny(combined, BLOCK_KEYWORDS)) return 'block';
  if (matchesAny(combined, PROJECT_KEYWORDS)) return 'project';
  return 'event';
}
