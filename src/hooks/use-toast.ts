import { toast as sonnerToast } from "sonner";

// Define an interface for your toast options
interface ToastOptions {
  title: string;
  description?: string;
}

export function useToast() {
  // Explicitly type the destructured parameters using ToastOptions
  const toast = ({ title, description }: ToastOptions) => {
    const message = description ? `${title}: ${description}` : title;
    sonnerToast(message);
  };

  return { toast };
}
