export type Option = {
    id: string;
    word: string;
    definition: string;
}

// Define el estado inicial
export interface InitialState {
    validation: boolean;
    button: boolean;
    result: boolean;
    selectedPairs: { id: string; text: string; type: 'word' | 'definition' }[];
    correctPairs: { id: string; word: string; definition: string, isIncorrect?: boolean }[];
}

// Define la interfaz para el contexto de actividad de selección
export interface RelationConceptActivityContextType {
    addSelectedPair: (pair: { id: string; text: string; type: 'word' | 'definition' }) => void;
    handleValidation: () => void;
    handleReset: () => void;
    selectedPairs: { id: string; text: string; type: 'word' | 'definition' }[];
    correctPairs: { id: string; word: string; definition: string, isIncorrect?: boolean }[];
    validation: boolean;
    button: boolean;
    result: boolean;
    pairs: Option[];
}

// Enumeración para los estados posibles
export enum States {
    SUCCESS = "success",
    WRONG = "wrong",
}
  
  