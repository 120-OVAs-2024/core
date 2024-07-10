// Representa una pregunta con su texto y una indicación de si es correcta.
export interface Question {
    id: string;
    text: string;
    correct: boolean;
}

// Representa un modal con mensajes de audio y texto para estados de éxito y error.
export interface Modal {
    audio_success?: string;
    audio_wrong?: string;
    text_success: string; 
    text_wrong: string;
}

// Define la interfaz para el estado inicial de la actividad
export interface InitialState {
    validation: boolean;
    button: boolean;
    result: boolean;
    questions: Question[];
    selectedOption: string | null;
    correctOption: string | null;
}

// Define la interfaz para el contexto de actividad de selección de opciones
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
