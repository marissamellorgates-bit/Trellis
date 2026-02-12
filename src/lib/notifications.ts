import type { TrellisNotification, NotificationType, MetaDomain } from '../types';

// ── Factory ─────────────────────────────────────────────────

export function createNotification(
  type: NotificationType,
  title: string,
  message: string,
  domain?: MetaDomain
): TrellisNotification {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    domain,
  };
}

// ── Pre-built Factories ──────────────────────────────────────

export const moduleAdvanceNotification = (moduleNumber: number, moduleName: string) =>
  createNotification('module_advance', 'Module Advanced', `You've entered ${moduleName} (Module ${moduleNumber}).`);

export const harvestCompleteNotification = (projectTitle: string) =>
  createNotification('harvest_complete', 'Harvest Complete', `"${projectTitle}" has been harvested. Wisdom preserved.`);

export const sowLoggedNotification = (tierLabel: string, domain: string) =>
  createNotification('sow_logged', 'Sow Logged', `${tierLabel} sow recorded in ${domain}.`);

export const taskCompleteNotification = (taskTitle: string) =>
  createNotification('task_complete', 'Task Complete', `Completed: ${taskTitle}`);

export const scheduleCompleteNotification = (itemTitle: string) =>
  createNotification('schedule_complete', 'Block Complete', `Completed: ${itemTitle}`);

export const calendarSyncNotification = (count: number) =>
  createNotification('calendar_synced', 'Calendar Synced', `${count} event${count === 1 ? '' : 's'} synced from Google Calendar.`);

export const interactionReceivedNotification = (fromName: string, type: string, tier: string, projectTitle: string) =>
  createNotification('community_interaction', 'Garden Activity', `${fromName} sent a ${tier} ${type} to "${projectTitle}".`);

export const projectPublishedNotification = (projectTitle: string) =>
  createNotification('project_published', 'Project Published', `"${projectTitle}" is now live in the Community Garden.`);

// ── Imbalance Detection ──────────────────────────────────────

export function detectImbalance(
  land: number,
  sea: number,
  sky: number
): TrellisNotification | null {
  const scores = [
    { domain: 'land' as MetaDomain, score: land },
    { domain: 'sea' as MetaDomain, score: sea },
    { domain: 'sky' as MetaDomain, score: sky },
  ];
  const max = Math.max(land, sea, sky);
  const min = Math.min(land, sea, sky);

  if (max - min < 25) return null;

  const weakest = scores.reduce((a, b) => (a.score < b.score ? a : b));
  return createNotification(
    'imbalance_alert',
    'System Imbalance',
    `Your ${weakest.domain.charAt(0).toUpperCase() + weakest.domain.slice(1)} domain is ${max - weakest.score} points behind. Consider tending to it.`,
    weakest.domain
  );
}

// ── Browser Notification API ─────────────────────────────────

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  return Notification.requestPermission();
}

export function sendBrowserNotification(title: string, body: string): void {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  new Notification(title, {
    body,
    icon: '/trellis-logo.png',
  });
}
