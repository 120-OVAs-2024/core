// Estado inicial de la actividad de ordenar
export interface InitialState {
  validation: boolean;
  button: boolean;
  result: boolean;
}

// Context que expone el estado y funciones
export interface OrderActivityContextType extends InitialState {
  handleValidation: () => void;
  handleReset: () => void;
}

// Tipos de elementos DnD (opcional según tu implementación)
export type OrderTypes = 'draggable' | 'droppable' | 'general-draggable';

// Clases dinámicas aplicadas según el estado del drag & drop
export interface OrderClasses {
  style: string;
  dragging?: string;
  over?: string;
}
