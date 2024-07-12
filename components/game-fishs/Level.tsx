import { useRef, useState } from 'react';
import { Audio, Col, Panel, Row } from 'books-ui';
import { Panel as PanelUI } from 'books-ui';

import { Button, FullScreenButton } from '@/shared/components';
import { useA11yAttribute } from '@/shared/hooks/useA11yAttribute';
import { useReduceMotion } from '@/shared/hooks/useReduceMotion';

import { DATA_fishs } from './data/data';
import { question_game } from './types/types';

import css from './styles/level.module.css';

const scales = ['-1', '1'];

const MARGIN_FISH = 0.7;
const PERCENT_SPACE_FISHS = 80;
interface propsLevel {
  question?: question_game;
  index?: number;
  intro?: boolean;
  onResult?(result: boolean): void;
  title?: string;
  alt?: string;
  audio_success?: string;
  audio_wrong?: string;
}

const DEFAULT_QUESTON: question_game = {
  mockAnswers: [],
  paragraphParts: [
    {
      type: 'text',
      content:
        'Seleccione el pez que lleva la palabra correcta para cada  oración. Los peces van nadando y usted debe hacer clic el que lleva la palabra correcta'
    }
  ]
};
export default function Level({
  question = DEFAULT_QUESTON,
  index,
  intro,
  onResult,
  title,
  alt,
  audio_success,
  audio_wrong
}: propsLevel) {
  const cancelAnimation = useReduceMotion();
  const { stopAnimations } = useA11yAttribute();

  const [selectAnswers, setSelectAnswers] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<'success' | 'wrong' | null>(null);

  const refDeph1 = useRef<HTMLImageElement>(null);
  const refDeph2 = useRef<HTMLImageElement>(null);
  const refDeph3 = useRef<HTMLImageElement>(null);
  const refDeph4 = useRef<HTMLImageElement>(null);

  const spaceBlank = question.paragraphParts.filter((part) => part.type === 'space');
  const answers = [...question.mockAnswers];

  const addSelectAnswer = (answer: string) => {
    if (spaceBlank.length > selectAnswers.length) {
      selectAnswers.push(answer);
      setSelectAnswers([...selectAnswers]);
    }
  };

  const selectParagraph = (indexPart: number) => {
    if (selectAnswers.length === indexPart) {
      return css.selectPart;
    }

    return '';
  };
  const checkAnswers = () => {
    for (const spaceIndex in spaceBlank) {
      if (spaceBlank[spaceIndex].content !== selectAnswers[spaceIndex]) {
        onResult ? onResult(false) : setOpenModal('wrong');
        return;
      }
    }
    onResult ? onResult(true) : setOpenModal('success');
  };

  const handleDepthMove: React.MouseEventHandler = (e) => {
    if (!cancelAnimation && !stopAnimations) {
      const offsetX = window.innerWidth / 2 - e.nativeEvent.clientX;
      const offsetY = window.innerHeight / 2 - e.nativeEvent.clientY;

      if (refDeph1.current) refDeph1.current.style.left = offsetX / 25 + 'px';
      if (refDeph2.current) refDeph2.current.style.left = offsetX / 100 + 'px';
      if (refDeph3.current) refDeph3.current.style.left = offsetX / 150 + 'px';
      if (refDeph4.current) refDeph4.current.style.left = offsetX / 100 + 'px';

      if (refDeph1.current) refDeph1.current.style.top = offsetY / 25 + 'px';
      if (refDeph2.current) refDeph2.current.style.top = offsetY / 100 + 'px';
      if (refDeph3.current) refDeph3.current.style.top = offsetY / 150 + 'px';
      if (refDeph4.current) refDeph4.current.style.top = offsetY / 100 + 'px';
    }
  };
  return (
    <Row alignItems="center" justifyContent="center">
      <Col addClass="u-mb-2 u-flow">
        {question.audio_description && openModal === null && <Audio src={question.audio_description} a11y />}
        {question.audio_content && openModal === null && <Audio src={question.audio_content} />}
        {audio_success && openModal === 'success' && <Audio src={audio_success} />}
        {audio_wrong && openModal === 'wrong' && <Audio src={audio_wrong} />}
      </Col>
      <Col lg="12" mm="11" className="u-flow">
        <div className={css.wrapper_depths} onMouseMove={handleDepthMove}>
          <img src="assets/images/Fondo_mar.webp" className={css.image_back} alt="" />
          <img src="assets/images/Fondo_mar.webp" className={css.image_depth} ref={refDeph4} alt="" />
          <img
            src="assets/images/Fondo_algas_detras_de_la_arena.webp"
            className={css.image_depth}
            ref={refDeph3}
            alt=""
          />
          <img src="assets/images/Fondo_arena.webp" className={css.image_depth} ref={refDeph2} alt="" />
          <img src="assets/images/Fondo_Primer_plano.webp" className={css.image_depth} ref={refDeph1} alt="" />
          <FullScreenButton elementId="fullscreen__section" addClass={css.fullScreen__button} />

          <div className={css.container__question}>
            <img src="assets/images/Ancla.webp" alt="" />
            <p className="u-font-bold u-text-center">
              {question.paragraphParts.map((part, index) =>
                part.type === 'text' ? (
                  <span key={index + part.content}>{part.content}</span>
                ) : (
                  <span key={index + part.content} className={selectParagraph(part.index)}>
                    {part.index < selectAnswers.length ? ' ' + selectAnswers[part.index] + ' ' : '____'}
                  </span>
                )
              )}
            </p>
            <img src="assets/images/Ancla.webp" alt="" />
          </div>
          {intro && (
            <PanelUI.Button section={1}>
              <button className={css.init_button}>INICIO</button>
            </PanelUI.Button>
          )}
          {answers.map((q, i) => (
            <button
              key={q + i}
              aria-label={q}
              className={`${css.fish} ${selectAnswers.includes(q) && css.selectAnswer}`}
              style={{
                top: `${35 + Math.random() * 40}%`,
                left: (PERCENT_SPACE_FISHS / answers.length) * (i + MARGIN_FISH) + '%',
                animationDelay: Math.random() * 2 + 's'
              }}
              onClick={() => addSelectAnswer(q)}>
              <img
                src={DATA_fishs[i].image}
                style={{ transform: `scaleX(${scales[Math.round(Math.random())]})` }}
                alt={q}
              />
              <p className={css.paragraph__fish}>{q}</p>
            </button>
          ))}

          {[...Array(8)].map((_, index) => (
            <img
              key={`bubble-${index}`}
              src="assets/images/Burbuja_de_aire.webp"
              className={css.bubble}
              style={{ animationDelay: 2 + Math.random() * 10 + 's', left: Math.random() * 100 + '%' }}
              alt=""
            />
          ))}
          {openModal === 'wrong' && (
            <img
              src="assets/images/Ova_002_sld_15_Haz_fallado.webp"
              className={css.modal_depth}
              alt="has fallado, vuelve a intentar"
            />
          )}
          {openModal === 'success' && (
            <img
              src="assets/images/Ova_002_sld_15_Felicidades.webp"
              className={css.modal_depth}
              alt="Felicitaciones, has completado correctamente tu ejercicio."
            />
          )}
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
            disabled={spaceBlank.length !== selectAnswers.length || intro || openModal !== null}
            onClick={checkAnswers}
            id="button-comprobar"
          />
          <Button
            disabled={intro || openModal !== 'wrong'}
            label="Reintentar"
            onClick={() => {
              setSelectAnswers([]);
              setOpenModal(null);
            }}
          />
          {openModal === 'success' && index && (
            <Panel.Button section={index + 1}>
              <Button label="Continuar" />
            </Panel.Button>
          )}
        </div>
      </Col>
    </Row>
  );
}
