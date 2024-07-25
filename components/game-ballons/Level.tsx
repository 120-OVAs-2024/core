import { useRef, useState } from 'react';
import { Audio, Col, Panel, Row } from 'books-ui';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Button, FullScreenButton } from '@/shared/components';
import { useA11yAttribute } from '@/shared/hooks/useA11yAttribute';
import { useReduceMotion } from '@/shared/hooks/useReduceMotion';

import { letterProp, spaceProp, TypeWord } from './types/types';
import Ballon from './Ballon';

import css from './styles/level.module.css';

interface propsLevel {
  word: TypeWord;
  index?: number;
  onResult?(result: boolean): void;
  title?: string;
  alt?: string;
  audio_success?: string;
  audio_wrong?: string;
}

const ANIMATION_CLOUD = 45;

export default function Level({ word, index, onResult, title, alt }: propsLevel) {
  const cancelAnimation = useReduceMotion();
  const { stopAnimations } = useA11yAttribute();

  const [openModal, setOpenModal] = useState<'success' | 'wrong' | null>(null);
  const [words, setWords] = useState<letterProp[]>(
    word.word
      .split(' ')
      .map((letter) => ({ letter, index: crypto.randomUUID(), enable: true }))
      .sort(() => Math.random() - 0.5)
  );
  const [spaces, setSpaces] = useState<spaceProp[]>([...Array(words.length)].map(() => null));

  const [selectIndex, setSelectIndex] = useState<number>(0);

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

    if (cancelAnimation || stopAnimations) {
      console.log('pause');
      animated1.pause();
      animated2.pause();
    }
  }, [cancelAnimation, stopAnimations]);

  const addLetter = (obj: letterProp) => {
    //evitar re-render si ta esta inhabilitado
    if (!obj.enable) return;
    //inhabilitar la botella seleccionada y habilitar la que ya estaba en el lugar
    const newWords = words.map((sel) => {
      if (spaces[selectIndex] && sel.index === spaces[selectIndex]?.index) {
        return { ...spaces[selectIndex], enable: true };
      }
      if (sel.index === obj.index) return { ...obj, enable: false };
      return sel;
    });
    setWords(newWords as letterProp[]);

    //añadir la nueva letra seleccionada
    spaces[selectIndex] = { ...obj };
    setSpaces([...spaces]);
    //avanzar el indice
    setSelectIndex(selectIndex >= spaces.length - 1 ? 0 : selectIndex + 1);
  };

  const removeLetter = () => {
    if (spaces[selectIndex]) {
      const newWords = words.map((word) => {
        if (word.index === spaces[selectIndex]?.index) {
          return { ...word, enable: true };
        } else {
          return word;
        }
      });
      spaces[selectIndex] = null;
      setSpaces([...spaces]);
      setWords(newWords as letterProp[]);
    }
  };

  const checkAnswer = () => {
    const finalyWord = spaces
      .map((obj) => obj?.letter)
      .join(' ')
      .toLowerCase();
    if (word.word.toLowerCase() === finalyWord) {
      setOpenModal('success');
      onResult && onResult(true);
    } else {
      setOpenModal('wrong');
      onResult && onResult(false);
    }
  };

  const reset = () => {
    setWords(words.map((word) => ({ ...word, enable: true })));
    setSpaces(spaces.map(() => null));
    setOpenModal(null);
  };

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

  const ALREADY_FILL = spaces.find((obj) => obj === null) === undefined ? true : false;
  const PARCIAL_WORD = spaces.map((obj) => (obj ? obj.letter : '')).join('');

  return (
    <Row alignItems="center" justifyContent="center">
      <Col addClass="u-mb-2 u-flow">
        {word.a11y && <Audio a11y src={word.a11y} />}
        {word.content && <Audio src={word.content} />}
      </Col>
      <Col lg="12" mm="11" className="u-flow">
        <div className={css.wrapper_depths} onMouseMove={handleDepthMove}>
          {/* Animacion de Profundidad*/}
          <img src="assets/images/Fondo_cielo.webp" className={css.image_back} alt="" />
          <img src="assets/images/Fondo_cielo.webp" className={css.image_depth} ref={refDeph4} alt="" />
          <img src="assets/images/Fondo_montañas2.webp" className={css.image_depth} ref={refDeph3} alt="" />
          <img src="assets/images/Fondo nubes.webp" className={css.image_depth_clouds} ref={refClouds} alt="" />
          <img src="assets/images/Fondo nubes.webp" className={css.image_depth_clouds} ref={refClouds2} alt="" />
          <img src="assets/images/Fondo_montañas.webp" alt="" ref={refDeph2} className={css.image_depth} />

          <img src="assets/images/Fondo_Primer_plano_arbustos.webp" className={css.image_depth} ref={refDeph1} alt="" />

          <FullScreenButton elementId="fullscreen__section" addClass={css.fullScreen__button} />
          {/* Bottellas */}
          {openModal === null && (
            <div className={css.container__bottles}>
              {words.map((props, i) => (
                <Ballon key={props.index} onClick={() => addLetter(props)} role={i} {...props} />
              ))}
            </div>
          )}

          {/* Burbujas */}
          {[...Array(8)].map((_, index) => (
            <img
              key={`bubble-${index}`}
              src="assets/images/Burbuja_de_aire.webp"
              className={css.bubble}
              style={{
                animationDelay: 2 + Math.random() * 10 + 's',
                left: Math.random() * 100 + '%',
                transform: `scale(${Math.min(Math.random(), 0.4)})`
              }}
              alt=""
            />
          ))}
          {/* Palabra */}
          <div className={`${css.container_word} ${css[openModal || '']}`}>
            <p aria-live="assertive" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
              {'palabra armada : ' + PARCIAL_WORD}
            </p>
            {openModal && (
              <img
                src={
                  openModal === 'wrong'
                    ? 'assets/images/ic--round-cancel.svg'
                    : 'assets/images/ph--seal-check-duotone.svg'
                }
                className={css.icon}
              />
            )}
            {spaces[selectIndex] && openModal === null && (
              <button className={css.cancel_button} onClick={removeLetter} aria-label="eliminar letra seleccionada">
                ❌
              </button>
            )}
            {spaces.map((obj, i) => (
              <button
                key={obj?.index || i}
                className={selectIndex === i ? css.select : undefined}
                onClick={() => setSelectIndex(i)}>
                {obj?.letter || '____'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="u-text-center u-font-italic">
            <b>{title} </b>
            {alt}
          </p>
        </div>
        <div className={css.container_controls}>
          <Button
            label="Comprobar"
            id="button-comprobar"
            disabled={!ALREADY_FILL || openModal !== null}
            onClick={checkAnswer}
          />
          <Button label="Reintentar" disabled={openModal !== 'wrong'} onClick={reset} />
          {openModal === 'success' && index && (
            <Panel.Button section={index}>
              <Button label="Continuar" />
            </Panel.Button>
          )}
        </div>
      </Col>
    </Row>
  );
}
