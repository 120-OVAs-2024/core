import { FC } from 'react';

import { useTrueFalseActivityContext } from './true-false-activity-context';

import css from './true-false.module.css';

interface TrueFalseCardProps {
    question: string;
    isCorrect: boolean;
    validation: boolean;
}

const TrueFalseCard: FC<TrueFalseCardProps> = ({ question, isCorrect, validation }) => {
    const { selectedAnswer , handleAnswerSelect} = useTrueFalseActivityContext();

    /**
     * Maneja el clic en los botones "Sí" o "No".
     * @param {boolean} answer - La respuesta seleccionada (verdadero o falso).
     */
    const handleButtonClick = (answer: boolean) => {
        handleAnswerSelect(answer);
    };
    
    /**
     * Determina la clase CSS para aplicar a un botón según el estado actual.
     * @param {boolean} answer - La respuesta para la cual se está determinando la clase.
     * @returns {string} - La clase CSS a aplicar.
     */
    const getClassName = (answer: boolean) => {
        let className = css['button'] + ' ';
        if (selectedAnswer === answer) {
            className += css['selected'] + ' ';
        }
        if (validation) {
            if (selectedAnswer === answer && answer === isCorrect) {
                return className = css['button'] +' '+ css['correct'] ;
            } else if (selectedAnswer === answer && answer !== isCorrect) {
                return className = css['button'] +' '+ css['incorrect'] ;
            }
        }
        return className.trim();
    };

    return (
        <div className={`${css['card-question']}`}>
            <h2>{question}</h2>
            <div className={`${css['card-buttons']}`}>
                <button className={getClassName(true)} onClick={() => handleButtonClick(true)}><b>Sí</b></button>
                <button className={getClassName(false)} onClick={() => handleButtonClick(false)}><b>No</b></button>
            </div>
        </div>
    );
};

export { TrueFalseCard };
