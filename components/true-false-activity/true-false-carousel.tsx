import { FC, useState } from 'react';
import { Audio, Col, Row } from 'books-ui';
import { Button, ModalFeedback } from '@shared/components';

import { Icon } from '../icon';

import { Modal, Question } from './types/types';
import { useTrueFalseActivityContext } from './true-false-activity-context';
import { TrueFalseButton } from './true-false-button';
import { TrueFalseCard } from './true-false-card';

import css from './true-false.module.css';

// Define los tipos de modales disponibles
const MODALS = {
    TRUE: 'modal-correct-activity',
    FALSE: 'modal-wrong-activity'
};

interface TrueFalseCarouselProps {
    questions: Question[];
    modal: Modal;
    text: string;
    addClass?: string;
}

const TrueFalseCarousel: FC<TrueFalseCarouselProps> = ({ questions, text, modal, addClass, ...props }) => {
    const { selectedAnswer, score, validation, currentQuestionIndex, handleNextQuestion, handlePreviousQuestion } = useTrueFalseActivityContext();
    const [isOpen, setIsOpen] = useState<string | null>(null);

    /**
     * Función para manejar la validación de la respuesta seleccionada.
     * Establece el estado del modal según si la respuesta es correcta o incorrecta.
     */
    const handleValidationWrapper = ( ) => {
        const answer = questions[currentQuestionIndex].correct;
        setIsOpen(answer === selectedAnswer ? MODALS.TRUE : MODALS.FALSE);
    };

    /**
     * Función para cerrar el modal actualmente abierto.
     */
    const closeModal = () => setIsOpen(null);

    return (
        <>
            <Row justifyContent="center" alignItems="center" addClass={`${addClass ? addClass : ''}`} {...props}>
                <Col xs="11" mm="10" md="9" lg="8" hd="7" addClass="u-flow">
                    <Audio src={`${questions[currentQuestionIndex].audioSrc}`} key={currentQuestionIndex}/>
                    <h2 className="u-font-italic u-text-center u-fs-300">{text}</h2>
                    <div className={css['carousel-wrapper']}>
                        <button onClick={handlePreviousQuestion} className={css['nav-button']} disabled={currentQuestionIndex === 0}><Icon name="arrow-left-footer" /></button>
                        <div className={css['activity-wrapper']}>
                            <div className={css['activity-header']}>
                                <div className={css['score']}>
                                    <b className={css['score-text']}>Puntaje:</b>
                                    <b className={css['score-value']}>{score}</b>
                                </div>
                            </div>
                            <div className={css['question-container']}>
                                <TrueFalseCard
                                    question={questions[currentQuestionIndex].text}
                                    isCorrect={questions[currentQuestionIndex].correct}
                                    validation={validation}
                                /> 
                            </div>
                        </div>
                        <button onClick={handleNextQuestion} className={css['nav-button']} disabled={currentQuestionIndex === questions.length - 1}><Icon name="arrow-right-footer" /></button>
                    </div>
            
                    <Row justifyContent="center" alignItems="center">
                        <TrueFalseButton>
                            <Button label="Comprobar" onClick={handleValidationWrapper}/>
                        </TrueFalseButton>

                        <TrueFalseButton type="reset">
                            <Button label="Reintentar" addClass="js-modal-wrong" />
                        </TrueFalseButton>
                    </Row>
                </Col>
            </Row>

            <ModalFeedback type="success" isOpen={isOpen === MODALS.TRUE} onClose={closeModal} finalFocusRef="#main" audio={modal.audio_success}>
                <p>{modal.text_success}</p>      
            </ModalFeedback>

            <ModalFeedback type="wrong" isOpen={isOpen === MODALS.FALSE} onClose={closeModal} finalFocusRef=".js-modal-wrong" audio={modal.audio_wrong}>
                <p>{modal.text_wrong}</p>
            </ModalFeedback>
        </>
    );
}

export {TrueFalseCarousel};