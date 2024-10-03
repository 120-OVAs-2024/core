import { DATA_fishs } from './data/data';
import { CorrectIcon, WrongIcon } from './icons_/icons';

import css from './styles/level.module.css';

const MARGIN_FISH = 0.7;
const PERCENT_SPACE_FISHES = 80;

interface Props {
  id: number;
  question: string;
  isDisabled: boolean;
  isPressed: boolean;
  isCorrect: boolean;
  totalQuestions: number;
  addSelectAnswer: (question: string) => void;
}

export const Box: React.FC<Props> = ({
  id,
  question,
  isDisabled,
  isPressed,
  isCorrect,
  totalQuestions,
  addSelectAnswer
}) => {
  const calculateTopPosition = `${40 + Math.random() * 20}%`;
  const calculateLeftPosition = `${(PERCENT_SPACE_FISHES / totalQuestions) * (id + MARGIN_FISH)}%`;
  const calculateAnimationDelay = `${Math.random() * 2}s`;

  return (
    <button
      className={css.fish}
      aria-pressed={isPressed}
      aria-label={question}
      disabled={isDisabled}
      style={{
        top: calculateTopPosition,
        left: calculateLeftPosition,
        animationDelay: calculateAnimationDelay
      }}
      onClick={() => addSelectAnswer(question)}>
      <img src={DATA_fishs[id].image} alt={question} />
      <div className={css.container_paragraph__fish}>
        <p className={css.paragraph__fish}>{question}</p>
      </div>
      {isDisabled && isPressed ? isCorrect ? <CorrectIcon /> : <WrongIcon /> : null}
    </button>
  );
};
