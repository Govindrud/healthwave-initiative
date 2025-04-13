import { toast as sonnerToast } from 'sonner';

type ToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: React.ReactNode;
}

// Convert our toast API to use sonner
export function toast({ title, description, variant = 'default', duration = 5000, action }: ToastProps) {
  const options = {
    duration,
    action,
  };

  switch (variant) {
    case 'destructive':
      return sonnerToast.error(title, {
        description,
        ...options,
      });
    case 'success':
      return sonnerToast.success(title, {
        description,
        ...options,
      });
    case 'warning':
      return sonnerToast.warning(title, {
        description,
        ...options,
      });
    case 'info':
      return sonnerToast.info(title, {
        description,
        ...options,
      });
    default:
      return sonnerToast(title, {
        description,
        ...options,
      });
  }
}

// Create a compatible hook interface for existing components
export const useToast = () => {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
    toasts: [], // Placeholder for API compatibility
  };
};
