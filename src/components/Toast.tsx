import { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  onClose: () => void;
}

export function Toast({ message, icon = 'check', onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      id="toast-notification"
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-surface-container-high text-on-surface px-4 py-2.5 rounded-xl text-body-sm shadow-2xl border border-outline-variant/40 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 duration-200 no-print"
    >
      <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
      <span className="font-medium text-on-surface">{message}</span>
    </div>
  );
}
