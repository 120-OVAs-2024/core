import { useEffect, useRef } from 'react';

import { useA11yAttribute } from '@/shared/hooks/useA11yAttribute';
import { useReduceMotion } from '@/shared/hooks/useReduceMotion';

import css from './gif.module.css';

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  alt: string;
  title?: string;
  size?: string;
  addClass?: string;
  noCaption?: boolean;
  hasHtml?: boolean;
}

export const Gif: React.FC<Props> = ({
  src,
  alt,
  title = 'Animation 1.',
  size,
  addClass,
  noCaption = false,
  hasHtml,
  ...props
}) => {
  const { stopAnimations } = useA11yAttribute();
  const reduceMotion = useReduceMotion();

  const ref = useRef<HTMLVideoElement>(null);

  const Element = noCaption ? 'div' : 'figure';
  const parsedAlt = hasHtml ? alt.replace(/<[^>]*>/g, '') : alt;

  useEffect(() => {
    const videoElement = ref.current;
    if (!videoElement) return;

    // Si el usuario prefiere reducir la animación o detener las animaciones
    if (reduceMotion || stopAnimations) {
      videoElement.setAttribute('controls', 'true');
      videoElement.pause();
    } else {
      videoElement.removeAttribute('controls');
      videoElement.play();
    }

    return () => {
      if (videoElement) videoElement.removeAttribute('controls');
    };
  }, [stopAnimations, reduceMotion]);

  return (
    <Element
      className={`${css.gif} u-my-0.5 ${addClass ?? ''}`}
      {...(size && {
        style: { '--gif-max-width': size } as React.CSSProperties
      })}>
      <video ref={ref} autoPlay loop muted playsInline aria-label={`${title} ${parsedAlt}`} {...props}>
        <source src={src} type="video/webm" />
      </video>

      {!noCaption && (
        <figcaption className={css['gif__figcaption']}>
          <p className="u-font-bold">{title}</p>&nbsp;
          <p dangerouslySetInnerHTML={{ __html: alt }}></p>
        </figcaption>
      )}
    </Element>
  );
};
