// src/components/common/Toast.jsx
import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#16161B] text-white border border-[rgba(255,255,255,0.14)] p-3.5 rounded-lg shadow-2xl flex items-start justify-between gap-3 animate-fade-in"
          >
            <div className="flex items-start gap-2.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />}
              {isError && <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
              {isInfo && <Info className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />}
              <p className="text-xs font-medium text-zinc-200 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-white transition-colors p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
