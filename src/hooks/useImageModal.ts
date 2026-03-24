import { useState } from 'react';

export const useImageModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return {
    isOpen,
    selectedId,
    openModal: (id: string) => { setSelectedId(id); setIsOpen(true); },
    closeModal: () => { setIsOpen(false); setSelectedId(null); },
  };
};
