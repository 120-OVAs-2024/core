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


// Componente principal GameSpace
const GameBagLevel: FC<Props> & SubComponents = ({ children, options }) => {
    const initialStateWithOptions = { ...INITIAL_STATE, options };

    const reducer = (state: InitialState, action: Partial<InitialState>): InitialState => {
        return { ...state, ...action };
    };

    const [activity, updateActivity] = useReducer(reducer, initialStateWithOptions);

    const addOptionValues = (option : OptionType) => {
        const updatedOptions = activity.options.map(opt =>
            opt.id === option.id ? { ...opt, state: option.state } : opt
        );
        updateActivity({ options: updatedOptions });
    };

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

    const handleReset = () => {
        updateActivity({ ...INITIAL_STATE, options });
    };

    const addOptionElementsId = (id: string | null): void => {
        updateActivity({ selectedId: id });
    };

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