import { useRef, useState } from 'react';
import { Audio, Col, Panel, Row } from 'books-ui';

import { Button, FullScreenButton } from '@/shared/components';
import { useA11yAttribute } from '@/shared/hooks/useA11yAttribute';
import { useReduceMotion } from '@/shared/hooks/useReduceMotion';

import { letterProp, spaceProp } from './types/types';
import Bottle from './Bottle';
import Crab from './Crab';

import css from './styles/level.module.css';

interface propsLevel {
  word?: string;
  index?: number;
  onResult?(result: boolean): void;
  title?: string;
  alt?: string;
  audio_success?: string;
  audio_wrong?: string;
}

export default function Level({ word = 'sofia', index, onResult, title, alt, audio_success, audio_wrong }: propsLevel) {
  const cancelAnimation = useReduceMotion();
  const { stopAnimations } = useA11yAttribute();

  const [openModal, setOpenModal] = useState<'success' | 'wrong' | null>(null);
  const [words, setWords] = useState<letterProp[]>(
    word
      .split('')
      .map((letter) => ({ letter, index: crypto.randomUUID(), enable: true }))
      .sort(() => Math.random() - 0.5)
  );
  const [spaces, setSpaces] = useState<spaceProp[]>([...Array(word.length)].map(() => null));

  const [selectIndex, setSelectIndex] = useState<number>(0);

  const refDeph1 = useRef<HTMLImageElement>(null);
  const refDeph2 = useRef<HTMLImageElement>(null);
  const refDeph3 = useRef<HTMLImageElement>(null);
  const refDeph4 = useRef<HTMLImageElement>(null);
  const crabContainer = useRef<HTMLDivElement>(null);

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
      .join('')
      .toLowerCase();
    if (word.toLowerCase() === finalyWord) {
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

      if (refDeph1.current) refDeph1.current.style.left = offsetX / 25 + 'px';
      if (refDeph2.current) refDeph2.current.style.left = offsetX / 100 + 'px';
      if (crabContainer.current) crabContainer.current.style.left = offsetX / 100 + 'px';
      if (refDeph3.current) refDeph3.current.style.left = offsetX / 150 + 'px';
      if (refDeph4.current) refDeph4.current.style.left = offsetX / 100 + 'px';

      if (refDeph1.current) refDeph1.current.style.top = offsetY / 25 + 'px';
      if (refDeph2.current) refDeph2.current.style.top = offsetY / 100 + 'px';
      if (crabContainer.current) crabContainer.current.style.top = offsetY / 100 + 'px';
      if (refDeph3.current) refDeph3.current.style.top = offsetY / 150 + 'px';
      if (refDeph4.current) refDeph4.current.style.top = offsetY / 100 + 'px';
    }
  };

  const ALREADY_FILL = spaces.find((obj) => obj === null) === undefined ? true : false;
  return (
    <Row alignItems="center" justifyContent="center">
      <Col addClass="u-mb-2 u-flow">
        {audio_success && openModal === 'success' && <Audio src={audio_success} />}
        {audio_wrong && openModal === 'wrong' && <Audio src={audio_wrong} />}
      </Col>
      <Col lg="12" mm="11" className="u-flow">
        <div className={css.wrapper_depths} onMouseMove={handleDepthMove}>
          {/* Animacion de Profundidad*/}
          <img src="assets/images/Fondo_mar.webp" className={css.image_back} alt="" />
          <img src="assets/images/Fondo_mar.webp" className={css.image_depth} ref={refDeph4} alt="" />
          <img
            src="assets/images/Fondo_algas_detras_de_la_arena.webp"
            className={css.image_depth}
            ref={refDeph3}
            alt=""
          />
          <img src="assets/images/Fondo_arena.webp" alt="" ref={refDeph2} className={css.image_depth} />
          <div className={css.crab_container}>
            <div className={css.crap_surface} ref={crabContainer}>
              <Crab />
            </div>
          </div>
          <img src="assets/images/Fondo_Primer_plano.webp" className={css.image_depth} ref={refDeph1} alt="" />

          <FullScreenButton elementId="fullscreen__section" addClass={css.fullScreen__button} />
          {/* Bottellas */}
          {openModal === null && (
            <div className={css.container__bottles}>
              {words.map((props) => (
                <Bottle key={props.index} onClick={() => addLetter(props)} {...props} />
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
            {spaces[selectIndex] && (
              <button className={css.cancel_button} onClick={removeLetter}>
                ❌
              </button>
            )}
            {spaces.map((obj, i) => (
              <button
                key={obj?.index || i}
                className={selectIndex === i ? css.select : undefined}
                onClick={() => setSelectIndex(i)}>
                {obj?.letter || '_'}
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
