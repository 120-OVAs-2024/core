export interface Question {
    id: string;
    text: string;
    correct: boolean;
}

export interface Modal {
    audio_success?: string;
    audio_wrong?: string;
    text_success: string; 
    text_wrong: string;
}

export interface InitialState {
    validation: boolean;
    button: boolean;
    result: boolean;
    questions: Question[];
    selectedOption: string | null;
    correctOption: string | null;
}

// Define la interfaz para el contexto de actividad de selección
export interface GameMoneyContextType {
    addSelectedOption: (id: string) => void;
    handleValidation: () => void;
    handleReset: () => void;
    selectedOption: string | null;
    correctOption: string | null;
    validation: boolean;
    button: boolean;
    result: boolean;
    questions: Question[];
}

// Enumeración para los estados posibles
export enum States {
    SUCCESS = "success",
    WRONG = "wrong",
}
