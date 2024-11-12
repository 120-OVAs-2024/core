import { ReactNode, useId, useState } from 'react';
import { Audio, Col, Panel, Row } from 'books-ui';

import { Button, FullScreenAlert } from '@/shared/components';

import { question_game } from './types/types';
import { Box } from './box';
import { Parallax } from './parrallax';

import css from './styles/level.module.css';

interface propsLevel {
  question?: question_game;
  index?: number;
  intro?: boolean;
  onResult?(result: boolean): void;
  content?: ReactNode;
  title?: string;
  alt?: string;
}

export default function Level({ question, index, intro, onResult, title, alt, content }: propsLevel) {
  const uid = useId();
  const [selectAnswers, setSelectAnswers] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<'success' | 'wrong' | null>(null);

  const addSelectAnswer = (answer: string) => {
    setSelectAnswers(answer);
  };

  const checkAnswers = () => {
    const isCorrect = selectAnswers === question?.correct;
    setOpenModal(isCorrect ? 'success' : 'wrong');

    if (onResult) {
      onResult(isCorrect);
    }
  };

  return (
    <>
      <Row id={uid} alignItems="center" justifyContent="center">
        <Col xs="11" mm="10" md="9" lg="8" hd="7" addClass="u-mb-2 u-flow">
          {question?.audio_description && <Audio src={question.audio_description} a11y />}

          {question?.audio_content && <Audio src={question.audio_content} />}

          {content}
          <FullScreenAlert />
        </Col>
        <Col xs="11" mm="10" lg="9" hd="8" addClass="u-flow u-mb-4">
          <Parallax id={uid}>
            <>
              <div
                className={`${css.container__question} u-py-1.5 u-px-0.5`}
                {...(openModal && {
                  style: { '--bg': openModal === 'success' ? '#CBE080' : '#FCB6B6' } as React.CSSProperties
                })}>
                <img src="assets/images/Ancla.webp" alt="" />
                <p className="u-font-bold u-text-center">
                  {question?.question || 'Haga clic en la opción que lleva la palabra correcta para cada oración.'}
                </p>
                <img src="assets/images/Ancla.webp" alt="" />
              </div>

              {intro && (
                <Panel.Button section={1}>
                  <button className={css.init_button}>INICIO</button>
                </Panel.Button>
              )}

              {question?.answers.map((q, i) => (
                <Box
                  key={q + i}
                  id={i}
                  question={q}
                  isDisabled={!!openModal}
                  isPressed={q === selectAnswers}
                  isCorrect={openModal === 'success'}
                  totalQuestions={question.answers.length}
                  addSelectAnswer={addSelectAnswer}
                />
              ))}
            </>
          </Parallax>

          <p className="u-text-center u-font-italic">
            <strong>{title} </strong>
            {alt}
          </p>

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
    </>
  );
}
