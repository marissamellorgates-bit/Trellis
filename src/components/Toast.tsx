import React, { useState, useEffect } from 'react';
import { Sprout, CheckCircle2, AlertTriangle, Calendar, X } from 'lucide-react';
import type { ToastData, NotificationType } from '../types';

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

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [fading, setFading] = useState(false);
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), duration - 300);
    const removeTimer = setTimeout(() => onDismiss(toast.id), duration);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, duration, onDismiss]);

  const Icon = ICON_MAP[toast.type] || CheckCircle2;

  return (
    <div
      className={`flex items-start gap-3 bg-white border border-[#2c2c2a]/10 rounded-2xl shadow-lg p-4 max-w-80 transition-all duration-300 ${
        fading ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-[#d4af37]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">{toast.title}</p>
        <p className="text-xs text-[#2c2c2a]/70 mt-0.5 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[#2c2c2a]/20 hover:text-[#2c2c2a]/60 transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col-reverse gap-3">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default ToastContainer;
