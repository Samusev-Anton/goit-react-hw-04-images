import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('hgb');
      onClose();
    }
  };

  const handleBackdropPress = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropPress}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};
