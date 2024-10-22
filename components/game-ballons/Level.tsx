import { ReactNode, useState } from 'react';
import { Audio, Col, Panel, Row } from 'books-ui';

import { Button, FullScreenAlert, Icon } from '@/shared/components';

import { CorrectIcon, WrongIcon } from './icons_/icons';
import { letterProp, spaceProp, TypeWord } from './types/types';
import Ballon from './Ballon';
import { Parallax } from './parallax';

import css from './styles/level.module.css';

interface propsLevel {
  baseWords: TypeWord;
  index?: number;
  onResult?(result: boolean): void;
  content?: ReactNode;
  title?: string;
  alt?: string;
  audio_success?: string;
  audio_wrong?: string;
}

function initialState(word: string[]): letterProp[] {
  return word.map((letter: string) => ({
    letter,
    index: crypto.randomUUID(),
    enable: true
  }));
}

export default function Level({ baseWords, index, onResult, title, alt, content }: propsLevel) {
  const [openModal, setOpenModal] = useState<'success' | 'wrong' | null>(null);
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const [words, setWords] = useState<letterProp[]>(() => initialState(baseWords.word));
  const [spaces, setSpaces] = useState<spaceProp[]>(() => Array.from({ length: words.length }, () => null));

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
    if (!spaces[selectIndex]) return;

    const updatedWords = words.map((word) =>
      word.index === spaces[selectIndex]?.index ? { ...word, enable: true } : word
    );

    // Establece el espacio seleccionado como nulo para eliminar la letra.
    spaces[selectIndex] = null;

    setSpaces([...spaces]);
    setWords(updatedWords as letterProp[]);
  };

  const checkAnswer = () => {
    const sentenceByUser = spaces
      .map((obj) => obj?.letter || '')
      .join(' ')
      .toLowerCase();

    const sentence = baseWords?.sentence || baseWords.word.join(' ')
    const isCorrect = sentence.toLowerCase() === sentenceByUser;
    setOpenModal(isCorrect ? 'success' : 'wrong');

    if (onResult) {
      onResult(isCorrect);
    }
  };

  const reset = () => {
    setWords(words.map((word) => ({ ...word, enable: true })));
    setSpaces(spaces.map(() => null));
    setOpenModal(null);
  };

  const ALREADY_FILL = !spaces.some((obj) => obj === null);
  const PARCIAL_WORD = spaces.map((obj) => obj?.letter || '').join('');

  return (
    <>
      {baseWords?.a11y && <Audio a11y src={baseWords.a11y} />}
      {baseWords?.content && <Audio src={baseWords.content} addClass="u-mb-2" />}

      <Row alignItems="center" justifyContent="center">
        <Col xs="11" mm="10" lg="9" hd="8" addClass="u-mb-2 u-flow">
          {content}
          <FullScreenAlert />
        </Col>
        <Col xs="11" mm="10" lg="9" hd="8" addClass="u-flow">
          <Parallax>
            <>
              {/* GLOBOS */}
              {openModal === null && (
                <div className={css.container__bottles}>
                  {words.map((props, i) => (
                    <Ballon key={props.index} onClick={() => addLetter(props)} role={i} {...props} />
                  ))}
                </div>
              )}

              {/* Palabra */}
              <div className={`${css.container_word} ${css[openModal || '']}`}>
                <p aria-live="assertive" className="u-sr-only">
                  {`frase armada ${PARCIAL_WORD}`}
                </p>

                {openModal ? openModal === 'wrong' ? <WrongIcon /> : <CorrectIcon /> : null}

                {spaces[selectIndex] && openModal === null && (
                  <button
                    className={css.cancel_button}
                    onClick={removeLetter}
                    aria-label="eliminar palabra seleccionada">
                    <Icon size="small" name="close" />
                  </button>
                )}
                {spaces.map((obj, i) => (
                  <button
                    key={obj?.index || i}
                    disabled={!!openModal}
                    className={selectIndex === i ? css.select : undefined}
                    onClick={() => setSelectIndex(i)}>
                    {obj?.letter || '____'}
                  </button>
                ))}
              </div>
            </>
          </Parallax>

          <p className="u-text-center u-font-italic">
            <strong>{title} </strong>
            {alt}
          </p>

          <div className={css.container_controls}>
            <Button
              label="Comprobar"
              id="button-comprobar"
              disabled={!ALREADY_FILL || openModal !== null}
              onClick={checkAnswer}
            />
            <Button label="Reintentar" addClass="js-button-reset" disabled={openModal !== 'wrong'} onClick={reset} />
            {openModal === 'success' && index && (
              <Panel.Button section={index}>
                <Button label="Continuar" />
              </Panel.Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}
