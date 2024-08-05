import { FC, useEffect, useReducer } from 'react';

import type { InitialState, Option as OptionType } from './types/types';
import { BagButton } from './game-bag-button';
import { RadioBag } from './game-bag-element';
import { GameBagProvider } from './game-radio-context';

// Estado inicial de la actividad
const INITIAL_STATE: InitialState = {
    validation: false,
    button: true,
    result: false,
    options: [],
    selectedId: null,
};

interface Props {
    children: JSX.Element | JSX.Element[];
    options: OptionType[];
}

type SubComponents = {
    Button: typeof BagButton;
    Option: typeof RadioBag;
};


const GameBagLevel: FC<Props> & SubComponents = ({ children, options }) => {
    const initialStateWithOptions = { ...INITIAL_STATE, options }; // Estado inicial con las opciones pasadas como props

    /**
     * Reducer para actualizar el estado de la actividad.
     * @param {InitialState} state - Estado actual
     * @param {Partial<InitialState>} action - Acción para actualizar el estado
     * @returns {InitialState} Nuevo estado
     */
    const reducer = (state: InitialState, action: Partial<InitialState>): InitialState => {
        return { ...state, ...action };
    };

    // Hook useReducer para manejar el estado de la actividad
    const [activity, updateActivity] = useReducer(reducer, initialStateWithOptions);

    /**
     * Actualiza los valores de las opciones.
     * @param {OptionType} option - Opción a actualizar
     */
    const addOptionValues = (option : OptionType) => {
        const updatedOptions = activity.options.map(opt =>
            opt.id === option.id ? { ...opt, state: option.state } : opt
        );
        updateActivity({ options: updatedOptions });
    };

    /**
     * Maneja la validación de la actividad.
     */
    const handleValidation = () => {
        updateActivity({ validation: true, button: true }); 

        const selectedOption = activity.options.find(opt => opt.id === activity.selectedId);
        if (selectedOption) {
            const isSuccess = selectedOption.state === 'success';
            updateActivity({ result: isSuccess });
        } else {
            updateActivity({ result: false });
        }
    };

    /**
     * Reinicia la actividad al estado inicial.
     */
    const handleReset = () => {
        updateActivity({ ...INITIAL_STATE, options });
    };

    /**
     * Actualiza el ID del elemento seleccionado.
     * @param {string | null} id - ID del elemento seleccionado
     */
    const addOptionElementsId = (id: string | null): void => {
        updateActivity({ selectedId: id });
    };

    // Efecto que se ejecuta cuando cambia el ID seleccionado o el estado de validación
    useEffect(() => {
        if (activity.selectedId!==null && !activity.validation) {
            updateActivity({ button: false });
        }
    }, [activity.validation, activity.selectedId]);

    return(
        <GameBagProvider
            value={{ 
                ...activity,
                addOptionValues,
                handleValidation,
                handleReset,
                addOptionElementsId
            }}
        >
            {children}
        </GameBagProvider>
    );

};

GameBagLevel.Button = BagButton;
GameBagLevel.Option = RadioBag;

export { GameBagLevel };