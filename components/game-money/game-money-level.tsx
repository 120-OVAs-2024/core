import { FC, useEffect, useReducer } from 'react';

import type { InitialState, Question as QuestionType } from './types/types';
import { GameMoneytButton } from './game-money-buttons';
import { GameMoneyActivityProvider } from './game-money-context';
import { Question } from './game-money-questions';

// Estado inicial de la actividad
const INITIAL_STATE: InitialState = {
    validation: false,
    button: true,
    result: false,
    selectedOption: null,
    correctOption: null,
    questions: []
};

interface Props {
    children: JSX.Element | JSX.Element[];
    questions: QuestionType[];
}

type SubComponents = {
    Button: typeof GameMoneytButton;
    Question: typeof Question;
};

// Componente principal MoneyLevel
const MoneyLevel: FC<Props> & SubComponents = ({ children, questions }) => {
    // Combina el estado inicial con las preguntas pasadas como props
    const initialStateWithQuestions = { ...INITIAL_STATE, questions };

    // Reducer para manejar el estado de la actividad
    const reducer = (state: InitialState, action: Partial<InitialState>): InitialState => {
        return { ...state, ...action };
    };

    // Hook useReducer para manejar el estado de la actividad
    const [activity, updateActivity] = useReducer(reducer, initialStateWithQuestions);

    /**
     * Función para agregar la selección de una respuesta.
     * @param id - ID de la opcion seleccionada.
     * @returns {void} - No devuelve nada.
     */
    const addSelectedOption = (id: string) => {
        console.log(id);
        updateActivity({ selectedOption: id });
    };

    /**
     * Función para manejar la validación de la opcion seleccionada.
     * @return {void} - No devuelve nada.
     */
    const handleValidation = () => {
        updateActivity({ validation: true, button: true });

        // Encuentra la opción correcta y determina si la opción seleccionada es correcta
        const correctOption = activity.questions.find(q => q.correct)?.id || null;
        const result = correctOption === activity.selectedOption;

        updateActivity({correctOption, result });
    };

    /**
     * Función para reiniciar la actividad a su estado inicial.
     * @return {void} - No devuelve nada.
     */
    const handleReset = () => {
        updateActivity({ ...INITIAL_STATE, questions });
    };

    // Efecto para habilitar el botón "Comprobar" solo si hay una opción seleccionada
    useEffect(() => {
        if (activity.selectedOption!==null && !activity.validation) {
            updateActivity({ button: false });
        }
    }, [activity.validation, activity.selectedOption]);

    return(
        <GameMoneyActivityProvider
            value={{ 
                ...activity, 
                addSelectedOption,
                handleReset,
                handleValidation,
                selectedOption: activity.selectedOption,
                correctOption: activity.correctOption,
                validation: activity.validation,
                button: activity.button,
                result: activity.result 
            }}>
            {children}
        </GameMoneyActivityProvider>
    );
}

MoneyLevel.Button = GameMoneytButton;
MoneyLevel.Question = Question;

export { MoneyLevel };