import type { ModalProps } from 'books-ui';
import { Audio, Col, Row } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import { Modal } from '../modal/modal';

import { i18n } from './consts';

import css from './modal-feedback.module.css';

interface Props extends ModalProps {
  addClass?: string;
  type?: 'wrong' | 'success';
  label?: string;
  audio?: string;
}

export const ModalFeedback: React.FC<Props> = ({ type = 'success', label, addClass, audio, children, ...props }) => {
  const { lang } = useOvaContext();
  const imageURL = `assets/base/${type}.webp`;

  return (
    <Modal {...props} addClass={`${css['modal']} u-py-6 ${addClass ?? ''}`}>
      <Row justifyContent="center" alignItems="center">
        <Col mm="12" md="11" addClass="u-flow u-text-center">
          <img className={css['modal__image']} src={imageURL} alt="" />
          <p className={css['modal__title']}>{label || i18n[lang][type]}</p>
          {audio ? <Audio src={audio} /> : null}
          {children}
        </Col>
      </Row>
    </Modal>
  );
};
