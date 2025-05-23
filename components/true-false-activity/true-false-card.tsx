import { FC } from 'react';
import { Content } from '@shared/components';

import { useTrueFalseActivityContext } from './true-false-activity-context';

import css from './true-false.module.css';

interface TrueFalseCardProps {
  question: string;
  isCorrect: boolean;
  validation: boolean;
  interpreter?: {
    contentURL: string;
    a11yURL: string;
  };
}

const TrueFalseCard: FC<TrueFalseCardProps> = ({ question, isCorrect, validation, interpreter }) => {
  const { selectedAnswer, handleAnswerSelect } = useTrueFalseActivityContext();

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
        return (className = css['button'] + ' ' + css['correct']);
      } else if (selectedAnswer === answer && answer !== isCorrect) {
        return (className = css['button'] + ' ' + css['incorrect']);
      }
    }
    return className.trim();
  };

  return (
    <Content interpreter={{ contentURL: interpreter?.contentURL, a11yURL: interpreter?.a11yURL }}>
      <div className={`${css['card-question']}`}>
        <h2>{question}</h2>
        <div className={`${css['card-buttons']}`}>
          <button className={getClassName(true)} onClick={() => handleButtonClick(true)} disabled={validation}>
            <b>Sí</b>
          </button>
          <button className={getClassName(false)} onClick={() => handleButtonClick(false)} disabled={validation}>
            <b>No</b>
          </button>
        </div>
      </div>
    </Content>
  );
};

export { TrueFalseCard };
