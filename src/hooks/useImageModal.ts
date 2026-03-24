/**
 * useImageModal.ts
 * Convenience hook for image modal state (open/close/select)
 * Wraps uiStore modal actions
 */

import { useUIStore } from '../stores/uiStore';
import type { Image } from '../api/mockData';

export function useImageModal() {
  const selectedImage = useUIStore((s) => s.selectedImage);
  const isModalOpen = useUIStore((s) => s.isModalOpen);
  const openModal = useUIStore((s) => s.openModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const setSelectedImage = useUIStore((s) => s.setSelectedImage);

  const open = (image: Image) => openModal(image);
  const close = () => closeModal();

  return {
    selectedImage,
    isModalOpen,
    open,
    close,
    setSelectedImage,
  } as const;
}
