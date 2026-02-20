import { toast, type ExternalToast } from 'vue-sonner';

export default async function useToast(
  title: string,
  options?: ExternalToast & { type?: 'error' | 'info' | 'success' }
) {
  const { $sound } = useNuxtApp();
  switch (options?.type) {
    case 'error':
      return toast.error(title, options);

    case 'success':
      return toast.success(title, options);

    default:
      return toast.info(title, options);
  }
}
