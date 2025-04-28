import { useId, useRef, useState } from 'react';
import { Row } from 'books-ui';
import { Button, FullScreenAlert, FullScreenButton, ModalFeedback } from '@shared/components';

import type { GameBagQuestionProps } from './types/types';
import { BagButton } from './game-bag-button';
import { Radio } from './game-bag-radio';
import { useGameBagContext } from './game-radio-context';

import css from './game-bag.module.css';

// Define los tipos de modales disponibles
const MODALS = {
  TRUE: 'modal-correct-activity',
  FALSE: 'modal-wrong-activity'
};

const CHARACTER__EMOTIONS = {
  true: 'happy__person',
  false: 'sad__person'
};

type EmotionKey = keyof typeof CHARACTER__EMOTIONS;

export const GameBagQuestion: React.FC<GameBagQuestionProps> = ({
  question,
  addClass,
  title,
  alt,
  modal,
  ...props
}) => {
  const { selectedId, addOptionElementsId, options, result, validation } = useGameBagContext();
  const uid = useId();
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const characterRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Maneja el cambio de opción seleccionada y mueve el personaje en consecuencia.
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio del input.
   */
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id: selectedOptionId } = event.target;

    // Agrega el ID de la opción seleccionada.
    addOptionElementsId(selectedOptionId);

    // Mueve el personaje según la posición de la opción seleccionada.
    const targetElement = document.querySelector(`label[for='${selectedOptionId}']`) as HTMLElement;
    if (!targetElement) return;

    const targetPosition = calculateTargetPosition(targetElement);
    moveCharacterToPosition(targetPosition);
  };

  /**
   * Calcula la posición del objetivo en relación al eje X del contenedor principal.
   * @param {HTMLElement} targetElement - El elemento objetivo.
   * @returns {number} La posición en píxeles.
   */
  const calculateTargetPosition = (targetElement: HTMLElement): number => {
    const targetRect = targetElement.getBoundingClientRect();
    const parentRect = wrapperRef.current?.getBoundingClientRect();
    return targetRect.x - (parentRect?.x || 0);
  };

  /**
   * Mueve el personaje a una posición específica en el eje X.
   * @param {number} positionX - La posición en el eje X en píxeles.
   */
  const moveCharacterToPosition = (positionX: number) => {
    const characterElement = characterRef.current as HTMLImageElement;
    if (!characterElement) return;
    characterElement.style.setProperty('--move-x', `${positionX}px`);
  };

  /**
   * Maneja la validación de la opción seleccionada.
   * Abre el modal correcto o incorrecto según el estado de la opción seleccionada.
   */
  const handleValidation = () => {
    const selectedOption = options.find((option) => option.id === selectedId);
    setTimeout(() => {
      setIsOpen(selectedOption?.state === 'success' ? MODALS.TRUE : MODALS.FALSE);
    }, 1000);
  };

  // Cierre del modal
  const closeModal = () => setIsOpen(null);

  return (
    <>
      <FullScreenAlert />
      <div ref={wrapperRef} id={uid} role="group" className={`u-flow ${addClass ?? ''}`} {...props}>
        <FullScreenButton elementId={uid} addClass={css['fullscreen__button']} />
        <div className={css['game-bag']}>
          <div className={`${css['question']}`} role="heading" aria-level={2}>
            <h2>{question}</h2>
          </div>

          <div className={css['wrapper-images']}>
            <img
              ref={characterRef}
              src={`assets/images/${validation ? CHARACTER__EMOTIONS[result.toString() as EmotionKey] : 'normal__person'}.webp`}
              alt="Personaje"
              className={css['character']}
            />
          </div>
          
          <div className={`u-grid ${css['wrapper-answers']}`}>
            {options.map((option) => (
              <Radio key={`${option.id}-${uid}`} uid={uid} option={option} onChange={handleOptionChange} />
            ))}
          </div>
        </div>
        <p className="u-text-center u-font-italic">
          <strong>{title}</strong>&nbsp;{alt}
        </p>

        <Row justifyContent="center" alignItems="center">
          <BagButton>
            <Button label="Comprobar" onClick={handleValidation} />
          </BagButton>
          <BagButton type="reset">
            <Button label="Reintentar" addClass="js-modal-wrong" />
          </BagButton>
        </Row>
      </div>

      <ModalFeedback
        type="success"
        isOpen={isOpen === MODALS.TRUE}
        onClose={closeModal}
        finalFocusRef="#main"
        audio={modal?.audio_success}
        aria-live="assertive">
        <p>{modal?.text_success}</p>
      </ModalFeedback>

      <ModalFeedback
        type="wrong"
        isOpen={isOpen === MODALS.FALSE}
        onClose={closeModal}
        finalFocusRef=".js-modal-wrong"
        audio={modal?.audio_wrong}
        aria-live="assertive">
        <p>{modal?.text_wrong}</p>
      </ModalFeedback>
    </>
  );
};
