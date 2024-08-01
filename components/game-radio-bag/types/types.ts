export type RadioStates = 'wrong' | 'success';

export type Option = {
    id: string;
    label: string;
    state: RadioStates;
};

// Representa un modal con mensajes de audio y texto para estados de éxito y error.
export interface Modal {
    audio_success?: string;
    audio_wrong?: string;
    text_success?: string; 
    text_wrong?: string;
}

export interface InitialState {
    validation: boolean;
    button: boolean;
    result: boolean;
    options: Option[];
    selectedId: string | null;
}

export interface GameBagContextType {
    addOptionValues: (option: Option) => void;
    handleValidation: () => void;
    handleReset: () => void;
    validation: boolean;
    button: boolean;
    result: boolean;
    selectedId: string | null;
    addOptionElementsId: (id: string | null) => void;
}

// Enumeración para los estados posibles
export enum States {
    SUCCESS = 'success',
    WRONG = 'wrong'
}