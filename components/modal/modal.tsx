import type { ModalProps } from 'books-ui';
import { Modal as ModalUI } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import { Icon } from '../icon';

import { i18n } from './consts';

import css from './modal.module.css';

interface Props extends ModalProps {
  addClass?: string;
  children: JSX.Element;
}

export const Modal: React.FC<Props> = ({ addClass, children, onClose, ...props }) => {
  const { lang } = useOvaContext();

  return (
    <ModalUI {...props} onClose={onClose}>
      <ModalUI.Overlay addClass={css['modal-overlay']} />
      <ModalUI.Content addClass={`${css['modal']} u-p-3 ${addClass ?? ''}`}>
        <button onClick={onClose} aria-label={i18n[lang].btnModal} className={`${css['modal-button']} u-pl-2`}>
          <Icon name="close" />
        </button>
        {children}
      </ModalUI.Content>
    </ModalUI>
  );
};
