interface Score{
    score: number;
}

// Tipo para una pregunta
export interface Question extends Score {
    text: string;
    correct: boolean;
    audioSrc?: string;
}

// Tipo para el estado inicial
export interface InitialState extends Score {
    validation: boolean;
    button: boolean;
    result: boolean;
    currentQuestionIndex: number;
    showResult: boolean;
    selectedAnswer: boolean | null;
}

// Clase para el estado inicial
export class InitialStateClass implements InitialState {
    validation: boolean;
    button: boolean;
    result: boolean;
    currentQuestionIndex: number;
    showResult: boolean;
    selectedAnswer: boolean | null;
    score: number;

    constructor (def?: Partial<InitialState>) {
        this.validation = def?.validation || false;
        this.button = def?.button || true;
        this.result = def?.result || false;
        this.currentQuestionIndex = def?.currentQuestionIndex || 0;
        this.showResult = def?.showResult || false;
        this.selectedAnswer = def?.selectedAnswer || null;
        this.score = def?.score || 0;
    }
}

// Tipo para el contexto de la actividad TrueFalseActivity
export interface TrueFalseActivityContextType extends Score{
    currentQuestionIndex: number;
    showResult: boolean;
    validation: boolean;
    button: boolean;
    result: boolean;
    selectedAnswer: boolean | null;
    handleValidation: (answer: boolean | null) => void;
    handleAnswerSelect: (answer: boolean) => void;
    handleNextQuestion: () => void;
    handlePreviousQuestion: () => void;
    handleReset: () => void;
}

// Enumeración para los estados posibles
export enum States {
    SUCCESS = "success",
    WRONG = "wrong",
}
