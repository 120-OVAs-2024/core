import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import ballons from './data/ballons';
import { BallonProps } from './types/types';

import css from './styles/ballon.module.css';

const Ballon: React.FC<BallonProps> = ({
  role = 0,
  letter = 'A',
  index = 'hasdh767803h',
  enable = true,
  onResult,
  ...props
}) => {
  const refWord = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!refWord.current) return;

    const animationProps = enable
      ? { y: 0, opacity: 1, duration: 1 }
      : { ease: 'power3.in', y: 90, opacity: 0, duration: 0.7 };

    gsap.to(refWord.current, {
      ...animationProps,
      onComplete: () => {
        if (onResult) onResult({ index, letter });
      }
    });
  }, [enable]);

  return (
    <button
      {...props}
      className={css.container}
      style={{ animationDelay: `${role * 0.5}s` }}
      aria-label={letter}
      disabled={!enable}>
      <div className={css.container__responsive}>
        <img src={ballons[role % 7]} alt="" />
        <div ref={refWord} className={css.letter}>
          <p>{letter}</p>
        </div>
      </div>
    </button>
  );
};

export default Ballon;
