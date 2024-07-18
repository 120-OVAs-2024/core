import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { spaceProp } from './types/types';

import css from './styles/bottle.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultResult = (_: spaceProp): void => {};
export default function Bottle({
  letter = 'A',
  index = 'hasdh767803h',
  enable = true,
  onResult = defaultResult,
  ...props
}) {
  const refBubble1 = useRef<HTMLImageElement>(null);
  const refBubble2 = useRef<HTMLImageElement>(null);
  const refBubble3 = useRef<HTMLImageElement>(null);
  const refCorcho = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!enable && refBubble1.current && refBubble2.current && refBubble3.current && refCorcho.current) {
      gsap.to(refBubble1.current, { x: 30 + Math.random() * 70, y: -50, opacity: 0, duration: Math.random() * 3 });
      gsap.to(refBubble2.current, { x: 30 + Math.random() * 70, y: -50, opacity: 0, duration: Math.random() * 3 });
      gsap.to(refBubble3.current, { x: 30 + Math.random() * 70, y: -50, opacity: 0, duration: Math.random() * 3 });
      gsap.to(refCorcho.current, {
        x: 10 + Math.random() * 70,
        y: -60,
        opacity: 0,
        rotate: 450,
        duration: 1.5,
        onComplete: () => onResult({ index, letter })
      });
    }
  }, [enable]);
  return (
    <button
      {...props}
      className={css.container}
      style={{ animationDelay: `${Math.random() * 3}s` }}
      aria-label={'letra  ' + letter}
      disabled={!enable}>
      <div className={css.container__responsive}>
        <img src={!enable ? 'assets/images/Botella_sin_corcho.webp' : 'assets/images/Botella.webp'} />
        {!enable && (
          <>
            <img src="assets/images/Corcho.webp" className={css.corcho} ref={refCorcho} />
            <img
              src="assets/images/Burbuja_de_aire.webp"
              className={css.bubble}
              style={{ transform: `scale(0.2)` }}
              ref={refBubble1}
            />
            <img
              src="assets/images/Burbuja_de_aire.webp"
              className={css.bubble}
              style={{ transform: `scale(0.2)` }}
              ref={refBubble2}
            />
            <img
              src="assets/images/Burbuja_de_aire.webp"
              className={css.bubble}
              style={{ transform: `scale(0.2)` }}
              ref={refBubble3}
            />
          </>
        )}
        <p className={css.letter} style={{ opacity: !enable ? 0.3 : 1 }}>
          {letter}
        </p>
      </div>
    </button>
  );
}
