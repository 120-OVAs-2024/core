import { useLayoutEffect } from 'react';

import { keyboardShortcuts } from '../utils/keyboardShortcuts';

/**
 * Hook que agrega y elimina los event listeners de los atajos de teclado
 */
export const useKeyboardShortcuts = () => {
  useLayoutEffect(() => {
    document.body.addEventListener('keydown', keyboardShortcuts);
    return () => {
      document.body.removeEventListener('keydown', keyboardShortcuts);
    };
  }, []);
};
