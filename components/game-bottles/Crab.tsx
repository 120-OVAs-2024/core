import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { useA11yAttribute } from '@/shared/hooks/useA11yAttribute';
import { useReduceMotion } from '@/shared/hooks/useReduceMotion';

import css from './styles/crab.module.css';
export default function Crab() {
  const cancelAnimation = useReduceMotion();
  const { stopAnimations } = useA11yAttribute();

  const refContainer = useRef<HTMLDivElement>(null);
  const refPatDer = useRef<HTMLImageElement>(null);
  const refPatIzq = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!cancelAnimation && !stopAnimations) {
      const ctx = gsap.context(() => {
        gsap.to(refPatIzq.current, { rotate: 30, duration: 0.5, repeat: Infinity, yoyo: true });
        gsap.to(refPatDer.current, { rotate: -15, duration: 0.5, repeat: Infinity, yoyo: true });
        gsap.to(refContainer.current, { x: 300, duration: 8, repeat: Infinity, yoyo: true, ease: 'power1.inOut' });
      });
      return () => ctx.clear();
    }
  }, [cancelAnimation, stopAnimations]);
  return (
    <div className={css.container} ref={refContainer}>
      <img src="assets/images/Cangrejo 1_pat_izq.webp" className={css.pat_izq} ref={refPatIzq} />
      <img src="assets/images/Cangrejo1_torso.webp" className={css.torso} />
      <img src="assets/images/Cangrejo 1_pat_der.webp" className={css.pat_der} ref={refPatDer} />
      <img src="assets/images/Cangrejo 1_tenaza.webp" className={css.tenaza_izq} />
      <img src="assets/images/Cangrejo 1_tenaza.webp" className={css.tenaza_der} />
      <img src="assets/images/Cangrejos_sombras.webp" className={css.shadow} />
    </div>
  );
}
