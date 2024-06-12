import type { ModalProps } from 'books-ui';
import { Modal as ModalUI } from 'books-ui';

import { Icon } from '../icon';

import css from './modal.module.css';

interface Props extends ModalProps {
  addClass?: string;
}

export const Modal: React.FC<Props> = ({ addClass, children, onClose, ...props }) => {
  return (
    <ModalUI {...props} onClose={onClose}>
      <ModalUI.Overlay addClass={css['modal-overlay']} />
      <ModalUI.Content addClass={`${css['modal']} u-p-3 ${addClass ?? ''}`}>
        <button onClick={onClose} aria-label="close button" className={`${css['modal-button']} u-pl-2`}>
          <Icon name="close" />
        </button>
        {children}
      </ModalUI.Content>
    </ModalUI>
  );
};
