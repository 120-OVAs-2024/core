import { FC, useEffect, useReducer } from 'react';

import type { InitialState, Option } from './types/types';
import { RelationConceptActivityProvider } from './relation-concept-activity-context';
import { RelationConceptButton } from './relation-concept-button';
import { RelationConceptCard } from './relation-concept-card';

const INITIAL_STATE: InitialState = {
    validation: false,
    button: true,
    result: false,
    selectedPairs: [],
    correctPairs: [],
  };
  
  interface Props {
    children: JSX.Element | JSX.Element[];
    onResult?: ({ result, options }: { result: boolean; options: Option[] }) => void;
    pairs: Option[];
  }

  type SubComponents = {
    Card: typeof RelationConceptCard;
    Button: typeof RelationConceptButton;
  };

  const RelationConcept: FC<Props> & SubComponents = ({ children, onResult, pairs }) => {
    // Hook useReducer para manejar el estado de la actividad
    const [activity, updateActivity] = useReducer(
        (prev: InitialState, next: Partial<InitialState>) => ({ ...prev, ...next }),
        INITIAL_STATE
    );

    /**
     * Añade un par seleccionado al estado de la actividad.
     * Si se seleccionan dos elementos, se verifica si forman un par correcto o incorrecto.
     * @param pair - El par seleccionado que contiene id, texto y tipo (word o definition).
     */
    const addSelectedPair = (pair: { id: string; text: string; type: 'word' | 'definition' }) => {
        const newSelectedPairs = [...activity.selectedPairs, pair];
        updateActivity({ selectedPairs: newSelectedPairs });

        if (newSelectedPairs.length === 2) {
          const [first, second] = newSelectedPairs;

          const correctPair = pairs.find(p => 
            (p.id === first.id && p.word === first.text && p.definition === second.text) ||
            (p.id === second.id && p.word === second.text && p.definition === first.text)
          );

          if (correctPair) {
            updateActivity({ correctPairs: [...activity.correctPairs, { id: first.id, word: correctPair.word, definition: correctPair.definition }] });
            updateActivity({selectedPairs: []}); // Reiniciamos los pares seleccionados
          }else{
            updateActivity({
              correctPairs: [
                  ...activity.correctPairs,
                  { id: `${first.id}-${second.id}-word`, word: first.text, definition: "", isIncorrect: true },
                  { id: `${first.id}-${second.id}-definition`, word: "", definition: second.text, isIncorrect: true }
              ]
            });
            updateActivity({selectedPairs: []}); // Reiniciamos los pares seleccionados
          }
        }
    };

    /**
     * Maneja la validación de la actividad.
     * Verifica si todos los pares seleccionados son correctos y llama a la función onResult si se proporciona.
     */
    const handleValidation = () => {
        updateActivity({ validation: true, button: true });
    
        const paired = activity.correctPairs.reduce((acc, current) => {
          const correctPair = pairs.find(pair => pair.id === current.id);
          if (correctPair) {
            acc.push(correctPair);
          }
          return acc;
        }, [] as Option[]);
    
        const result = paired.length === pairs.length;
    
        if (onResult) {
          onResult({ result, options: paired });
        }
    
        updateActivity({ result });
    };

    /**
     * Reinicia la actividad al estado inicial.
     */
    const handleReset = () => {
        updateActivity(INITIAL_STATE);
    };
    
    /**
     * Efecto que actualiza el estado del botón de validación
     * dependiendo de si todos los pares correctos han sido seleccionados.
     */
    useEffect(() => {
        if (activity.correctPairs.length >= pairs.length && !activity.validation) {
            updateActivity({ button: false });
        }
    }, [activity.correctPairs, activity.validation, pairs.length]);
    
    return (
    <RelationConceptActivityProvider 
        value={{
            handleValidation,
            handleReset,
            addSelectedPair,
            selectedPairs: activity.selectedPairs,
            validation: activity.validation,
            button: activity.button,
            result: activity.result,
            correctPairs: activity.correctPairs,
            pairs
        }}>
        {children}
    </RelationConceptActivityProvider>);
  };

RelationConcept.Card = RelationConceptCard;
RelationConcept.Button = RelationConceptButton;

export { RelationConcept };