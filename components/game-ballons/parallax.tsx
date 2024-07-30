import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useA11yAttribute } from '@/shared/hooks/useA11yAttribute';
import { useReduceMotion } from '@/shared/hooks/useReduceMotion';

import { FullScreenButton } from '../fullscreen-button';

import css from './styles/level.module.css';

const ANIMATION_CLOUD = 45;

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Parallax: React.FC<Props> = ({ children }) => {
  const cancelAnimation = useReduceMotion();
  const { stopAnimations } = useA11yAttribute();

  const refDeph1 = useRef<HTMLImageElement>(null);
  const refDeph2 = useRef<HTMLImageElement>(null);
  const refDeph3 = useRef<HTMLImageElement>(null);
  const refDeph4 = useRef<HTMLImageElement>(null);
  const refClouds = useRef<HTMLImageElement>(null);
  const refClouds2 = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const animated1 = gsap.fromTo(
      refClouds.current,
      { left: '100%' },
      { left: '-100%', duration: ANIMATION_CLOUD, repeat: Infinity, ease: 'none' }
    );
    const animated2 = gsap.fromTo(
      refClouds2.current,
      { left: '100%' },
      { left: '-100%', duration: ANIMATION_CLOUD, repeat: Infinity, ease: 'none', delay: ANIMATION_CLOUD / 2 }
    );

    setTimeout(() => {
      if (cancelAnimation || stopAnimations) {
        animated1.pause();
        animated2.pause();
      }
    }, 100);
  }, [cancelAnimation, stopAnimations]);

  const handleDepthMove: React.MouseEventHandler = (e) => {
    if (!cancelAnimation && !stopAnimations) {
      const offsetX = window.innerWidth / 2 - e.nativeEvent.clientX;
      const offsetY = window.innerHeight / 2 - e.nativeEvent.clientY;

      if (refDeph1.current) refDeph1.current.style.left = offsetX / 50 + 'px';
      if (refDeph2.current) refDeph2.current.style.left = offsetX / 75 + 'px';

      if (refDeph3.current) refDeph3.current.style.left = offsetX / 150 + 'px';
      if (refDeph4.current) refDeph4.current.style.left = offsetX / 200 + 'px';

      if (refDeph1.current) refDeph1.current.style.top = offsetY / 50 + 'px';
      if (refDeph2.current) refDeph2.current.style.top = offsetY / 75 + 'px';

      if (refDeph3.current) refDeph3.current.style.top = offsetY / 150 + 'px';
      if (refDeph4.current) refDeph4.current.style.top = offsetY / 200 + 'px';
    }
  };

  return (
    <div className={css.wrapper_depths} onMouseMove={handleDepthMove}>
      {/* Animacion de Profundidad*/}
      <img src="assets/images/Fondo_cielo.webp" className={css.image_back} alt="" />
      <img src="assets/images/Fondo_cielo.webp" className={css.image_depth} ref={refDeph4} alt="" />
      <img src="assets/images/Fondo_montañas2.webp" className={css.image_depth} ref={refDeph3} alt="" />

      {/* Nubes */}
      <img src="assets/images/Fondo nubes.webp" className={css.image_depth_clouds} ref={refClouds} alt="" />
      <img src="assets/images/Fondo nubes.webp" className={css.image_depth_clouds} ref={refClouds2} alt="" />
      <img src="assets/images/Fondo_montañas.webp" alt="" ref={refDeph2} className={css.image_depth} />

      {/* Bush  */}
      <img src="assets/images/Fondo_Primer_plano_arbustos.webp" className={css.image_depth} ref={refDeph1} alt="" />
      <FullScreenButton elementId="fullscreen__section" addClass={css.fullScreen__button} />

      {children}
    </div>
  );
};
