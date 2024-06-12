import type { ModalProps } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import { Modal } from '../modal/modal';

import { i18n } from './const';
import { ModalBibliographyLink } from './modal-bibliography-link';

import css from './modal-bibliography.module.css';

interface Props extends ModalProps {
  addClass?: string;
}

type SubComponents = {
  Link: typeof ModalBibliographyLink;
};

const ModalBibliography: React.FC<Props> & SubComponents = ({ addClass, children, ...props }) => {
  const { lang } = useOvaContext();

  return (
    <Modal {...props} addClass={`${css['modal']} u-py-4 ${addClass ?? ''}`}>
      <div className="u-flow">
        <h2 className="u-text-center">{i18n[lang].title}</h2>
        <ul className="u-list-shape u-flow">{children}</ul>
      </div>
    </Modal>
  );
};

ModalBibliography.Link = ModalBibliographyLink;

export { ModalBibliography };
