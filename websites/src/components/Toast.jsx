import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-md py-sm bg-inverse-surface text-inverse-on-surface shadow-lg min-w-[300px] animate-slide-up`}
          role="alert"
        >
          <span className="material-symbols-outlined text-primary">
            {toast.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span className="text-style-body-md flex-grow">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-inverse-on-surface hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Close notification"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  );
}
