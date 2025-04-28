import { FC, useEffect, useMemo, useReducer } from 'react';

import type { GameBagQuestionProps, InitialState, Option as OptionType } from './types/types';
import { GameBagQuestion } from './game-bag-question';
import { GameBagProvider } from './game-radio-context';

// Estado inicial de la actividad
const INITIAL_STATE: InitialState = {
  validation: false,
  button: true,
  result: false,
  options: [],
  selectedId: null
};

interface Props extends GameBagQuestionProps {
  children?: JSX.Element | JSX.Element[];
  options: OptionType[];
}

// Función para agregar IDs únicos a cada opción
function addUniqueIdsToOptions(options: OptionType[]) {
  return options.map((option) => ({
    ...option,
    id: crypto.randomUUID() // Genera un ID único para cada opción
  }));
}

const GameBagLevel: FC<Props> = ({ children, options, ...props }) => {
  // Aplicar la función para agregar IDs a las opciones
  const initialOptions = useMemo(() => addUniqueIdsToOptions(options), [options]);

  // Definir el estado inicial con las opciones modificadas
  const initialStateWithOptions = { ...INITIAL_STATE, options: initialOptions };

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
  const addOptionValues = (option: OptionType) => {
    const updatedOptions = activity.options.map((opt) =>
      opt.id === option.id ? { ...opt, state: option.state } : opt
    );
    updateActivity({ options: updatedOptions });
  };

  /**
   * Maneja la validación de la actividad.
   */
  const handleValidation = () => {
    const selectedOption = activity.options.find((opt) => opt.id === activity.selectedId);
    
    if (selectedOption) {
      const isSuccess = selectedOption.state === 'success';
      updateActivity({ result: isSuccess });
    } else {
      updateActivity({ result: false });
    }

    updateActivity({ validation: true, button: true });
  };

  /**
   * Reinicia la actividad al estado inicial.
   */
  const handleReset = () => {
    updateActivity({ ...initialStateWithOptions });
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
    if (activity.selectedId !== null && !activity.validation) {
      updateActivity({ button: false });
    }
  }, [activity.validation, activity.selectedId]);

  return (
    <GameBagProvider
      value={{
        ...activity,
        options: initialOptions,
        addOptionValues,
        handleValidation,
        handleReset,
        addOptionElementsId
      }}>
      <GameBagQuestion {...props} />
      {children}
    </GameBagProvider>
  );
};

export { GameBagLevel };
