import { useMemo } from 'react';
import {FullScreenButton } from '@shared/components';

import { useRelationConceptActivityContext  } from './relation-concept-activity-context';

import css from './relation-concept.module.css';

interface CardProps {
  addClass?: string;
  title: string;
  pairs: { id: string; word: string; definition: string }[];
}

/**
 * Función para mezclar un array usando el algoritmo de Fisher-Yates.
 * @param array - Array a mezclar.
 * @returns Array mezclado.
 */
const shuffle = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const RelationConceptCard: React.FC<CardProps> = ({ pairs, title, addClass, ...props }) => {
  const { addSelectedPair, selectedPairs, correctPairs  } = useRelationConceptActivityContext();

  /**
   * Mezcla los pares de palabras y definiciones y los combina en un solo array.
   * Utiliza useMemo para memorizar el resultado y evitar cálculos innecesarios en renderizados subsecuentes.
   */
  const shuffledPairs = useMemo(() => {
    const combinedPairs = pairs.flatMap(pair => [
      { id: pair.id, text: pair.word, type: 'word' as const },
      { id: pair.id, text: pair.definition, type: 'definition' as const }
    ]);
    return shuffle(combinedPairs);
  }, [pairs]);

  /**
   * Maneja el evento de clic en una tarjeta.
   * @param id - ID de la tarjeta.
   * @param text - Texto de la tarjeta.
   * @param type - Tipo de la tarjeta ('word' o 'definition').
   */
  const handleClick = (id: string, text: string, type: 'word' | 'definition') => {
    addSelectedPair({ id, text, type });
  };

  /**
   * Obtiene el nombre de la clase CSS para una tarjeta específica basado en su estado.
   * @param id - ID de la tarjeta.
   * @param text - Texto de la tarjeta.
   * @returns Nombre de la clase CSS.
   */
  const getClassName = (id: string, text: string) => {
    const selected = selectedPairs.find(pair => pair.id === id && pair.text === text);
    
    const correct = correctPairs.find(pair => pair.id === id && !pair.isIncorrect);
    const incorrect = correctPairs.find(pair => pair.id.includes(id) && pair.isIncorrect && (pair.word === text || pair.definition === text));

    if (correct) return `${css.card} ${css.correct}`;
    if (incorrect) return `${css.card} ${css.incorrect}`;
    if (selected) return `${css.card} ${css.selected}`;
    
    return `${css.card}`;
  };

  return (
    <div className={`${css['grid-wrapper']}`} id="relation-concept">
      <div className={`${css['grid-overlay']}`}>
        <FullScreenButton elementId='relation-concept' />
      </div>
      <div className={`${css['grid-title']}`}><h3>{title}</h3></div>
      <div className={`${css['grid-container']} ${addClass ?? ''}`}>
        {shuffledPairs.map((pair) => (
          <button
            key={pair.id + pair.text}
            id = {pair.id + pair.text}
            onClick={() => handleClick(pair.id, pair.text, pair.type)}
            className={`${getClassName(pair.id, pair.text)} ${css['grid-item']}`}
            {...props}>
            <b>{pair.text}</b>
          </button>
        ))}
      </div>
    </div>
  );
};
