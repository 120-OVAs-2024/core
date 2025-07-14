import { FC, useId, useState } from 'react';
import { Row } from 'books-ui';
import { Button, ModalFeedback } from '@shared/components';

import { Modal as ModalType, Radio as radioType } from './types/types';
import { useGameLegoContext } from './game-lego-context';
import { LegoButton } from './lego-button';

import css from './game-lego.module.css';

// Define los tipos de modales disponibles
const MODALS = {
  TRUE: 'modal-correct-activity',
  FALSE: 'modal-wrong-activity'
};

interface OptionProps {
  addClass?: string;
  options: radioType[];
  modal: ModalType;
  question: string | JSX.Element;
  title: string;
  alt: string;
}

export const RadioLego: FC<OptionProps> = ({ options, question, addClass, title, alt, modal, ...props }) => {
  const { selectedId, addOptionElementsId, validation } = useGameLegoContext();
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const reactId = useId();
  const uid = reactId; // ID del componente

  const letter = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'ñ',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];

  /**
   * Maneja el cambio de opción en el input de tipo radio.
   * @param {React.ChangeEvent<HTMLInputElement>} event - El evento de cambio.
   */
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    addOptionElementsId(event.target.id);
  };

  /**
   * Maneja la validación de la opción seleccionada.
   */
  const handleValidation = () => {
    const selectedOption = options.find((option) => option.id === selectedId);
    setIsOpen(selectedOption?.state === 'success' ? MODALS.TRUE : MODALS.FALSE);
  };

  /**
   * Obtiene la clase CSS para un botón según su estado y si está seleccionado.
   * @returns {string} La clase CSS correspondiente
   */
  const getSelectedOptionClass = () => {
    if (!validation) return '';
    const selectedOption = options.find((option) => option.id === selectedId);
    return selectedOption?.state === 'success' ? css['correct'] : css['incorrect'];
  };

  // Cierre del modal
  const closeModal = () => setIsOpen(null);

  return (
    <>
      <div className={` ${css.lego__container}  ${addClass ?? ''} `} {...props}>
        <div className={`${css.lego__question} ${getSelectedOptionClass()}`} role="heading" aria-level={2}>
          <h2>{question}</h2>
        </div>
        <div className={css.lego__options}>
          {options.map((option, index) => (
            <div
              key={option.id}
              className={`${css['option']} ${selectedId === option.id ? getSelectedOptionClass() : ''}`}>
              <div className={css['circle']}>{letter[index]}</div>
              <label htmlFor={option.id}>
                <input
                  type="radio"
                  name={`radio-group-${uid}`}
                  id={option.id}
                  checked={selectedId === option.id}
                  disabled={validation}
                  onChange={handleOptionChange}
                  aria-checked={selectedId === option.id}
                />
                <span dangerouslySetInnerHTML={{ __html: option.name }} />
              </label>
            </div>
          ))}
        </div>
      </div>
      <p className="u-text-center u-font-italic">
        <strong>{title}</strong>&nbsp;{alt}
      </p>
      <Row justifyContent="center" alignItems="center">
        <LegoButton>
          <Button label="Comprobar" onClick={handleValidation} />
        </LegoButton>

        <LegoButton type="reset">
          <Button label="Reintentar" addClass="js-modal-wrong" />
        </LegoButton>
      </Row>

      <ModalFeedback
        type="success"
        isOpen={isOpen === MODALS.TRUE}
        onClose={closeModal}
        finalFocusRef="#main"
        audio={modal.audio_success}
        interpreter={modal.interpreter_success}>
        <p>{modal.text_success}</p>
      </ModalFeedback>

      <ModalFeedback
        type="wrong"
        isOpen={isOpen === MODALS.FALSE}
        onClose={closeModal}
        finalFocusRef=".js-modal-wrong"
        audio={modal.audio_wrong}
        interpreter={modal.interpreter_wrong}>
        <p>{modal.text_wrong}</p>
      </ModalFeedback>
    </>
  );
};
