import { FC, useState } from 'react';
import { Row } from 'books-ui';
import { Button, FullScreenButton, ModalFeedback } from '@shared/components';

import { Modal as ModalType, Question as QuestionType } from './types/types';
import { GameMoneytButton } from './game-money-buttons';
import { useGameMoneyActivityContext } from './game-money-context';

import css from './game-money.module.css';

// Define los tipos de modales disponibles
const MODALS = {
  TRUE: 'modal-correct-activity',
  FALSE: 'modal-wrong-activity'
};

interface QuestionProps {
  options: QuestionType[];
  question: string;
  modal: ModalType;
  alt?: string;
  title?: string;
  addClass?: string;
}

/**
 * Componente Question para representar una pregunta con múltiples opciones.
 *
 * @param {QuestionProps} props - Las propiedades del componente Question.
 * @returns {JSX.Element} El componente de la pregunta renderizado.
 */
export const Question: FC<QuestionProps> = ({ question, options, modal, alt, title, addClass, ...props }) => {
  const { addSelectedOption, validation, selectedOption, correctOption, questions } = useGameMoneyActivityContext();
  const [isOpen, setIsOpen] = useState<string | null>(null);

  /**
   * Maneja el evento de clic en una opcion.
   * @param id - ID de la opcion seleccionada.
   */
  const handleOptionClick = (id: string) => {
    addSelectedOption(id);
  };

  /**
   * Envuelve la validación de la respuesta en un modal.
   */
  const handleValidationWrapper = () => {
    const answer = questions.find((q) => q.correct)?.id;
    setIsOpen(answer === selectedOption ? MODALS.TRUE : MODALS.FALSE);
  };

  // Cierre del modal
  const closeModal = () => setIsOpen(null);

  const selectedOptionIndex = options.findIndex((option) => option.id === selectedOption); // Obtiene el indice de la opcion seleccionada
  const correctOptionIndex = options.findIndex((option) => option.id === correctOption); // Obtiene el indice de la opcion correcta

  const characterImage = validation
    ? correctOption === selectedOption
      ? 'assets/svgs/personaje_feliz.svg'
      : 'assets/svgs/personaje_triste.svg'
    : 'assets/svgs/personaje.svg';

  /**
   * Obtiene la clase CSS para un botón segun su estado y si esta seleccionado.
   * @returns {string} La clase CSS correspondiente
   */
  const getSelectedOptionClass = () => {
    if (!validation) return '';
    return selectedOption === correctOption ? css['correct'] : css['incorrect'];
  };

  // Genera un id único para el elemento de pantalla completa basado en las opciones.
  const uniqueElementId = `game-money-${options}`;

  return (
    <>
      <div
        className={` ${css['question-wrapper']} u-flow ${addClass ? addClass : ''}`}
        {...props}
        role="group"
        aria-labelledby="question-text">
        <div className={css['background']} id={uniqueElementId}>
          <div className={`${css['grid-overlay']}`}>
            <FullScreenButton elementId={uniqueElementId} role="radiogroup" aria-labelledby="question-text" />
          </div>
          <div className={css['options-container']}>
            {options.map((option) => (
              <button
                key={option.id}
                className={`${css['option-button']} ${selectedOption === option.id ? css['selected'] : ''} ${selectedOption === option.id ? getSelectedOptionClass() : ''}`}
                onClick={() => handleOptionClick(option.id)}
                disabled={validation}
                aria-pressed={selectedOption === option.id}
                aria-describedby={`option-${option.id}`}>
                <b>
                  {option.id}. {option.text}
                </b>
              </button>
            ))}
          </div>
          <div className={css['character-container']} aria-hidden="true">
            <img
              src={characterImage}
              alt="Personaje"
              className={css['character']}
              style={validation ? { left: `${selectedOptionIndex * 25 + 12.5}%` } : {}}
            />
            {validation && correctOption === selectedOption && (
              <img
                src="assets/svgs/billete.svg"
                alt="Billetes"
                className={`${css['money']} ${css['money-fall']}`}
                style={{ left: `${correctOptionIndex * 25 + 12.5}%` }}
              />
            )}
          </div>
          <p className={`${css['question-text']} u-text-left`}>{question}</p>
        </div>
        <p className="u-text-center u-font-italic">
          <b>{title} </b>
          {alt}
        </p>
        <Row justifyContent="center" alignItems="center">
          <GameMoneytButton>
            <Button label="Comprobar" onClick={handleValidationWrapper} />
          </GameMoneytButton>

          <GameMoneytButton type="reset">
            <Button label="Reintentar" addClass="js-modal-wrong" />
          </GameMoneytButton>
        </Row>
      </div>
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
