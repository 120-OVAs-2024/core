import React, { useState } from 'react';
import { Button } from '@shared/components';

import { ImgContainer } from '../img-container';

import { Card } from './card';
import { CardType } from './types';

import css from './memory-card.module.css';

interface Props {
  background: string;
  memoryImages: CardType[];
  onResult: (result: boolean) => boolean;
}

export const MemoryCardActivity: React.FC<Props> = ({ background, memoryImages, onResult }) => {
  const [cards, setCards] = useState<CardType[]>(memoryImages.sort(() => Math.random() - 0.5));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [isReset, setIsReset] = useState(true);

  /**
   * Handles the card click event.
   * @param {number} index - Index of the clicked card.
   */
  const handleCardClick = (index: number) => {
    if (cards[index].flipped || cards[index].matched || selectedCards.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;

    const updatedSelectedCards = [...selectedCards, index];
    setSelectedCards(updatedSelectedCards);

    if (updatedSelectedCards.length === 2) {
      setButtonsDisabled(false);
      const [first, second] = updatedSelectedCards;
      if (updatedCards[first].id === updatedCards[second].id) {
        updatedCards[first].matched = true;
        updatedCards[second].matched = true;
      } else {
        setTimeout(() => {
          updatedCards[first].flipped = false;
          updatedCards[second].flipped = false;
          setCards([...updatedCards]);
        }, 1000);
      }
      setSelectedCards([]);
    }

    setCards([...updatedCards]);
  };

  /*Checks the current game status.*/
  const checkGameStatus = () => {
    const allMatched = cards.every((card) => card.matched);

    if (!allMatched) {
      setIsReset(false);
    }

    setButtonsDisabled(true);

    if (onResult) {
      onResult(allMatched);
    }
  };

  /**
   * Restarts the game.
   * Resets all cards to their initial state (`flipped: false`, `matched: false`).
   */
  const restartGame = () => {
    const resetCards = cards.map((card) => ({
      ...card,
      flipped: false,
      matched: false
    }));
    setCards(resetCards.sort(() => Math.random() - 0.5));
    setButtonsDisabled(true);
    setIsReset(true);
  };

  return (
    <>
      <ImgContainer
        addClass={`${css['image-container-game']} u-flow`}
        background={background}
        backgroundSize="70px"
        padding="40px">
        <div className={css.container}>
          {cards.map((card, index) => (
            <Card card={card} key={index} handleCardClick={() => handleCardClick(index)} />
          ))}
        </div>
      </ImgContainer>

      <div className={`u-mt-5 ${css.buttons}`}>
        <Button disabled={buttonsDisabled} onClick={checkGameStatus} label="Check" />
        <Button disabled={isReset} onClick={restartGame} label="Try Again" />
      </div>
    </>
  );
};
