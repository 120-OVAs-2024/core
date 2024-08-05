import {  useId,  useState } from 'react';
import { Row } from 'books-ui';
import { Button, ModalFeedback } from '@shared/components';

import { BAGS } from './data/data';
import { Modal as ModalType, Option as optionType} from'./types/types';
import { BagButton } from './game-bag-button';
import { useGameBagContext } from './game-radio-context';

import css from './game-bag.module.css';


// Define los tipos de modales disponibles
const MODALS = {
    TRUE: 'modal-correct-activity',
    FALSE: 'modal-wrong-activity'
};

interface OptionProps {
  addClass?: string;
  options: optionType[];
  modal: ModalType;
  question: string;
  title: string;
  alt: string;
  correctCount: number;
  incrementCorrectCount: () => void;
}

export const RadioBag: React.FC<OptionProps> = ({ options, question, addClass, title, alt, modal, correctCount, incrementCorrectCount, ...props }) => {

    const { selectedId, addOptionElementsId, validation} = useGameBagContext();
    const [isOpen, setIsOpen] = useState<string | null>(null);
    const reactId = useId(); // Obtiene un ID único para el componente

    const uid = reactId; // ID del componente

    /**
     * Maneja el cambio de opción seleccionada.
     * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio del input
     */
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        addOptionElementsId(event.target.id);
    };

    /**
     * Maneja la validación de la opción seleccionada.
     * Abre el modal correcto o incorrecto según el estado de la opción seleccionada.
     */
    const handleValidation = () => {
        const selectedOption = options.find(option => option.id === selectedId);
        if(selectedOption?.state === 'success') incrementCorrectCount();
        setIsOpen(selectedOption?.state === 'success' ? MODALS.TRUE : MODALS.FALSE);
    };

    /**
     * Obtiene la clase CSS para un botón según su estado y si está seleccionado.
     * @returns {string} La clase CSS correspondiente
     */
    const getSelectedOptionClass = () => {
        if (!validation) return '';
        const selectedOption = options.find(option => option.id === selectedId);
        return selectedOption?.state === 'success'  ? css['correct'] : css['incorrect'];
    };

    // Cierre del modal
    const closeModal = () => setIsOpen(null);

    return(
        <>
            <div className={`u-flow ${addClass ?? ''}`} {...props} role='group'>
                <div className={`u-grid ${css['game-bag']}`} >
                    <div className={css['wrapper-images']}>
                        <img src='assets/svgs/character.svg' alt="Personaje" className={css['character']}/>
                        <img src={BAGS[correctCount].Bag} alt="bolso" className={css['bag']}/>
                    </div>
                    <div className={css['wrapper-container']}>
                        <div className={`${css['question']}`} role='heading' aria-level={2}><h2>{question}</h2></div>
                        {options.map((option) => (
                            <label 
                                key={option.id}
                                className={`${css['option']} ${selectedId === option.id ? css['selected'] : ''} ${selectedId === option.id ? getSelectedOptionClass() : ''}`}
                                htmlFor={option.id}
                            >
                                <input 
                                    type="radio" 
                                    name={`radio-group-${uid}`}
                                    id={option.id}
                                    checked={selectedId === option.id}
                                    disabled = {validation}
                                    aria-checked={selectedId === option.id}
                                    onChange={handleOptionChange}
                                />
                                <span dangerouslySetInnerHTML={{ __html: option.label}}></span>
                            </label>
                        ))}
                    </div>
                </div>
                <p className="u-text-center u-font-italic">
                    <strong>{title}</strong>&nbsp;{alt}
                </p>
                <Row justifyContent="center" alignItems="center">
                    <BagButton>
                        <Button label="Comprobar" onClick={handleValidation}/>
                    </BagButton>
                    <BagButton type="reset">
                        <Button label="Reintentar" addClass="js-modal-wrong" />
                    </BagButton>
                </Row>
            </div>
            <ModalFeedback type="success" isOpen={isOpen === MODALS.TRUE} onClose={closeModal} finalFocusRef="#main" audio={modal.audio_success} aria-live="assertive">
                <p>{modal.text_success}</p>
            </ModalFeedback>

            <ModalFeedback type="wrong" isOpen={isOpen === MODALS.FALSE} onClose={closeModal} finalFocusRef=".js-modal-wrong" audio={modal.audio_wrong} aria-live="assertive">
                <p>{modal.text_wrong}</p>
            </ModalFeedback>
        </>
    );
}