import { FC,useEffect, useReducer } from 'react';

import { InitialState, InitialStateClass, Question } from './types/types';
import { TrueFalseActivityProvider } from './true-false-activity-context';
import { TrueFalseButton } from './true-false-button';
import { TrueFalseCard } from './true-false-card';
import { TrueFalseCarousel } from './true-false-carousel';

// Función para obtener el estado inicial de la actividad
const getInitialState = (): InitialState => (
    new InitialStateClass()
);

interface Props {
    children: JSX.Element | JSX.Element[];
    questions: Question[];
}

type SubComponents = {
    Button: typeof TrueFalseButton;
    Card: typeof TrueFalseCard;
    Carousel: typeof TrueFalseCarousel
};

const TrueFalseActivity: FC<Props> & SubComponents = ({ children, questions }) => {
    // Hook useReducer para manejar el estado de la actividad
    const [activity, updateActivity] = useReducer(
        (prev: InitialState, next: Partial<InitialState>) => ({ ...prev, ...next }),
        getInitialState()
    );

    /**
     * Función para validar la respuesta seleccionada.
     * Actualiza el estado de validación y el puntaje si la respuesta es correcta.
     */
    const handleValidation = () => {
        if (activity.selectedAnswer === null) return;
        const isCorrect = questions[activity.currentQuestionIndex].correct === activity.selectedAnswer;
        updateActivity({ validation: true, button: true });
        if (isCorrect) {
            updateActivity({ score: activity.score + questions[activity.currentQuestionIndex].score });
        }
    };

    /**
     * Función para reiniciar la actividad a su estado inicial.
     */
    const handleReset = () => {
        updateActivity(getInitialState());
    };

    /**
     * Función para manejar la selección de una respuesta.
     * @param {boolean} answer - La respuesta seleccionada (verdadero o falso).
     */
    const handleAnswerSelect = (answer: boolean) => {
        updateActivity({ selectedAnswer: answer, button: false });
    };

    /**
     * Función para pasar a la siguiente pregunta.
     * Resetea la respuesta seleccionada y el estado de validación.
     */
    const handleNextQuestion = () => {
        if (activity.currentQuestionIndex < questions.length - 1) {
            updateActivity({ 
                currentQuestionIndex: activity.currentQuestionIndex + 1, 
                selectedAnswer: null, 
                validation: false, 
                button: true 
            });
        } else {
            updateActivity({ showResult: true });
        }
    };

    /**
     * Función para regresar a la pregunta anterior.
     * Resetea la respuesta seleccionada y el estado de validación.
     */
    const handlePreviousQuestion = () => {
        if (activity.currentQuestionIndex > 0) {
            updateActivity({ 
                currentQuestionIndex: activity.currentQuestionIndex - 1, 
                selectedAnswer: null, 
                validation: false, 
                button: true 
            });
        }
    };

    // Efecto para actualizar el estado del botón cuando se selecciona una respuesta
    useEffect(() => {
        if (activity.selectedAnswer != null && !activity.validation) {
            updateActivity({ button: false });
        }
    }, [activity.selectedAnswer, questions.length, activity.validation]);


    return (
        <TrueFalseActivityProvider value={{
            ...activity,
            handleValidation,
            handleReset,
            handleAnswerSelect,
            handleNextQuestion,
            handlePreviousQuestion
        }}>
            {children}
        </TrueFalseActivityProvider>
    );
};

TrueFalseActivity.Button = TrueFalseButton;
TrueFalseActivity.Card = TrueFalseCard;
TrueFalseActivity.Carousel = TrueFalseCarousel;

export { TrueFalseActivity };
