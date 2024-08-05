import { ReactNode, useRef, useState } from 'react';
import { Audio, Col, Panel, Row } from 'books-ui';
import { Panel as PanelUI } from 'books-ui';

import { Button, FullScreenButton } from '@/shared/components';
import { useA11yAttribute } from '@/shared/hooks/useA11yAttribute';
import { useReduceMotion } from '@/shared/hooks/useReduceMotion';

import { DATA_fishs } from './data/data';
import { question_game } from './types/types';

import css from './styles/level.module.css';

const MARGIN_FISH = 0.7;
const PERCENT_SPACE_FISHS = 80;
interface propsLevel {
  question?: question_game;
  index?: number;
  intro?: boolean;
  onResult?(result: boolean): void;
  content?: ReactNode;
  title?: string;
  alt?: string;
  audio_success?: string;
  audio_wrong?: string;
  isSpace?: boolean;
}

export default function Level({
  question,
  index,
  intro,
  onResult,
  title,
  alt,
  audio_success,
  audio_wrong,
  content
}: propsLevel) {
  const cancelAnimation = useReduceMotion();
  const { stopAnimations } = useA11yAttribute();

  const [selectAnswers, setSelectAnswers] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<'success' | 'wrong' | null>(null);

  const refDeph2 = useRef<HTMLImageElement>(null);
  const refDeph3 = useRef<HTMLImageElement>(null);
  const refDeph4 = useRef<HTMLImageElement>(null);

  const addSelectAnswer = (answer: string) => {
    setSelectAnswers(answer);
  };

  const checkAnswers = () => {
    if (selectAnswers === question?.correct) {
      onResult && onResult(true);
      setOpenModal('success');
    } else {
      onResult && onResult(false);
      setOpenModal('wrong');
    }
  };

  const handleDepthMove: React.MouseEventHandler = (e) => {
    if (!cancelAnimation && !stopAnimations) {
      const offsetX = window.innerWidth / 2 - e.nativeEvent.clientX;
      const offsetY = window.innerHeight / 2 - e.nativeEvent.clientY;

      if (refDeph2.current) refDeph2.current.style.left = offsetX / 100 + 'px';
      if (refDeph3.current) refDeph3.current.style.left = offsetX / 300 + 'px';
      if (refDeph4.current) refDeph4.current.style.left = offsetX / 100 + 'px';

      if (refDeph2.current) refDeph2.current.style.top = offsetY / 100 + 'px';
      if (refDeph3.current) refDeph3.current.style.top = offsetY / 300 + 'px';
      if (refDeph4.current) refDeph4.current.style.top = offsetY / 100 + 'px';
    }
  };
  return (
    <Row alignItems="center" justifyContent="center">
      <Col addClass="u-mb-2 u-flow">
        {question?.audio_description && openModal === null && <Audio src={question.audio_description} a11y />}
        {question?.audio_content && openModal === null && <Audio src={question.audio_content} />}
        {audio_success && openModal === 'success' && <Audio src={audio_success} />}
        {audio_wrong && openModal === 'wrong' && <Audio src={audio_wrong} />}
        {content}
      </Col>
      <Col lg="12" mm="11" className="u-flow">
        <div className={css.wrapper_depths} onMouseMove={handleDepthMove}>
          <img src="assets/images/Fondo_cielo.webp" className={css.image_back} alt="" />
          <img src="assets/images/Fondo_cielo.webp" className={css.image_depth} ref={refDeph4} alt="" />
          <img src="assets/images/Fondo_nubes.webp" className={`${css.image_depth} ${css.image_cloud}`} alt="" />
          <img
            src="assets/images/Fondo_nubes.webp"
            className={`${css.image_depth} ${css.image_cloud}`}
            alt=""
            style={{ animationDelay: '9s' }}
          />
          <img src="assets/images/Fondo_montañas.webp" className={css.image_depth} ref={refDeph3} alt="" />
          <img src="assets/images/Fondo_primer_plano.webp" className={css.image_depth} ref={refDeph2} alt="" />
          <FullScreenButton elementId="fullscreen__section" addClass={css.fullScreen__button} />

          <div
            className={css.container__question}
            style={{ backgroundColor: !openModal ? '#D2E8DA' : openModal === 'success' ? '#CBE080' : '#FCB6B6' }}>
            <img src="assets/images/Ancla.webp" alt="" />
            <p className="u-font-bold u-text-center">
              {question?.question || 'Haga clic en la opción que lleva la palabra correcta para cada oración.'}
            </p>
            <img src="assets/images/Ancla.webp" alt="" />
          </div>
          {intro && (
            <PanelUI.Button section={1}>
              <button className={css.init_button}>INICIO</button>
            </PanelUI.Button>
          )}
          {question?.answers.map((q, i) => (
            <button
              key={q + i}
              aria-label={q}
              className={`${css.fish} ${selectAnswers === q && css.selectAnswer}`}
              style={{
                top: `${20 + Math.random() * 40}%`,
                left: (PERCENT_SPACE_FISHS / question.answers.length) * (i + MARGIN_FISH) + '%',
                animationDelay: Math.random() * 2 + 's'
              }}
              onClick={() => addSelectAnswer(q)}>
              <img src={DATA_fishs[i].image} alt={q} />
              <p className={css.paragraph__fish}>{q}</p>
            </button>
          ))}
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
            disabled={!selectAnswers || intro || openModal !== null}
            onClick={checkAnswers}
            id="button-comprobar"
          />
          <Button
            disabled={intro || openModal !== 'wrong'}
            label="Reintentar"
            onClick={() => {
              setSelectAnswers(null);
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
