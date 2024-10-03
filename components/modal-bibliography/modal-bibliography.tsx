import { Audio } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import type { ModalCoreProps } from '../modal/modal';
import { Modal } from '../modal/modal';

import { i18n } from './const';
import { ModalBibliographyLink } from './modal-bibliography-link';

import css from './modal-bibliography.module.css';

interface Props extends ModalCoreProps {
  addClass?: string;
  label?: string;
  audio?: string;
  content?: JSX.Element | JSX.Element[];
}

type SubComponents = {
  Link: typeof ModalBibliographyLink;
};

const ModalBibliography: React.FC<Props> & SubComponents = ({
  addClass,
  label,
  children,
  audio,
  content,
  ...props
}) => {
  const { lang } = useOvaContext();

  return (
    <Modal {...props} addClass={`${css['modal']} u-py-4 ${addClass ?? ''}`}>
      <div className="u-flow">
        <h2 className="u-text-center">{label || i18n[lang].title}</h2>
        {content}
        <ul className="u-list-shape u-flow">{children}</ul>
        {audio ? <Audio src={audio} /> : null}
      </div>
    </Modal>
  );
};

ModalBibliography.Link = ModalBibliographyLink;

export { ModalBibliography };
