import React from 'react';
import { Bell, CheckCircle2, Sprout, AlertTriangle, Calendar, Trash2, CheckCheck } from 'lucide-react';
import type { NotificationCenterProps, NotificationType } from '../types';
import { requestNotificationPermission } from '../lib/notifications';

const ICON_MAP: Record<NotificationType, React.ElementType> = {
  module_advance: Sprout,
  harvest_complete: Sprout,
  sow_logged: Sprout,
  task_complete: CheckCircle2,
  schedule_complete: CheckCircle2,
  calendar_synced: Calendar,
  imbalance_alert: AlertTriangle,
  system: AlertTriangle,
};

function timeAgo(timestamp: string): string {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClear,
  onClose,
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  const showPushButton =
    'Notification' in window && Notification.permission === 'default';

  return (
    <>
      {/* Transparent backdrop */}
      <div className="fixed inset-0 z-[90]" onClick={onClose} />

      <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-[#2c2c2a]/10 shadow-xl z-[100] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2c2c2a]/5">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Notifications</p>
            {unreadCount > 0 && (
              <span className="bg-[#d4af37] text-[#2c2c2a] text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="p-1.5 text-[#2c2c2a]/30 hover:text-[#2c2c2a] transition-colors rounded-lg hover:bg-[#2c2c2a]/5"
                title="Mark all read"
              >
                <CheckCheck size={14} />
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClear}
                className="p-1.5 text-[#2c2c2a]/30 hover:text-[#2c2c2a] transition-colors rounded-lg hover:bg-[#2c2c2a]/5"
                title="Clear all"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <Bell size={24} className="mx-auto text-[#2c2c2a]/10 mb-3" />
              <p className="text-xs text-[#2c2c2a]/30">No notifications yet</p>
            </div>
          ) : (
            notifications.map(n => {
              const Icon = ICON_MAP[n.type] || CheckCircle2;
              return (
                <button
                  key={n.id}
                  onClick={() => !n.read && onMarkRead(n.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 border-b border-[#2c2c2a]/5 last:border-b-0 transition-colors text-left ${
                    !n.read ? 'bg-[#d4af37]/[0.03] hover:bg-[#d4af37]/[0.07] cursor-pointer' : ''
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={12} className="text-[#d4af37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#2c2c2a]">{n.title}</p>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#2c2c2a]/50 mt-0.5 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-[#2c2c2a]/25 mt-1">{timeAgo(n.timestamp)}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Push notification prompt */}
        {showPushButton && (
          <div className="px-4 py-3 border-t border-[#2c2c2a]/5 bg-[#2c2c2a]/[0.02]">
            <button
              onClick={() => requestNotificationPermission()}
              className="w-full text-[10px] font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#b08d2b] transition-colors py-1"
            >
              Enable Push Notifications
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationCenter;
