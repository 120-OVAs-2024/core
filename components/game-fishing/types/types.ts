export type fishStates = 'wrong' | 'success';
export type direction= 'left' | 'right';

// Define el tipo Option que representa una opción individual en la actividad
export type Fish = {
    id: string;
    state: fishStates;
    text: string;
    direction: direction,
    x: number;
    y: number;
};

// Define la interfaz InitialState que representa el estado inicial de la actividad
export interface InitialState {
    validation: boolean;
    button: boolean;
    result: boolean;
    fishes: Fish[];
}

// Define la interfaz para el contexto de actividad
export interface GameFishingContextType {
    handleFishClick: (id: string) => void;
    handleValidation: () => void;
    handleReset: () => void;
    validation: boolean;
    button: boolean;
    result: boolean;
    selectedFishId: string | null;
    fishes: Fish[];
}

// Enumeración para los estados posibles
export enum States {
    SUCCESS = 'success',
    WRONG = 'wrong'
}