import css from './styles/level.module.css';

const scales = ['-1', '1'];

interface Props {
  answer: string;
  isPressed: boolean;
  fish: string;
  margin: string;
  onClick: (answer: string) => void;
  addClass?: string;
}

export const Fish: React.FC<Props> = ({ answer, isPressed, fish, margin, onClick, addClass }) => {
  const handleClick = () => {
    onClick?.(answer);
  };

  return (
    <button
      aria-label={answer}
      className={`${css.fish} ${isPressed && css.selectAnswer} ${addClass ?? ''}`}
      style={{
        top: `${35 + Math.random() * 40}%`,
        left: margin,
        animationDelay: Math.random() * 2 + 's'
      }}
      onClick={handleClick}>
      <img src={fish} style={{ transform: `scaleX(${scales[Math.round(Math.random())]})` }} alt={answer} />
      <p className={css.paragraph__fish}>{answer}</p>
    </button>
  );
};
