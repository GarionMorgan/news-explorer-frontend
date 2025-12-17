import { useEffect } from "react";

export function useModalClose(isOpen, onClose) {
  useEffect(() => {
    // Handle escape key
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Handle overlay click
    const handleOverlayClick = (event) => {
      if (event.target.classList.contains("modal")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleOverlayClick);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isOpen, onClose]);
}
