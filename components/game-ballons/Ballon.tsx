import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import ballons from './data/ballons';
import { spaceProp } from './types/types';

import css from './styles/ballon.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultResult = (_: spaceProp): void => {};
export default function Ballon({
  role = 0,
  letter = 'A',
  index = 'hasdh767803h',
  enable = true,
  onResult = defaultResult,
  ...props
}) {
  const refWord = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (refWord.current) {
      if (!enable) {
        gsap.to(refWord.current, {
          ease: 'power3.in',
          y: 90,
          opacity: 0,
          duration: 0.7,
          onComplete: () => {
            onResult({ index, letter });
          }
        });
      } else {
        gsap.to(refWord.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          onComplete: () => {
            onResult({ index, letter });
          }
        });
      }
    }
  }, [enable]);

  return (
    <button
      {...props}
      className={css.container}
      style={{ animationDelay: `${role * 0.5}s` }}
      aria-label={'palabra  ' + letter}
      disabled={!enable}>
      <div className={css.container__responsive}>
        <img src={ballons[role]} />

        <div ref={refWord} className={css.letter}>
          <p>{letter}</p>
        </div>
      </div>
    </button>
  );
}
