import { useRef, useState } from 'react';
import { Panel } from 'books-ui';

import { Button } from '@/shared/components';

import { DATA_fishs } from './data/data';
import { question_game } from './types/types';

import css from './styles/ova-02-p09.module.css';

const scales = ['-1', '1'];

interface propsLevel {
  question: question_game;
  index: number;
}
export default function Level({ question, index }: propsLevel) {
  const [selectAnswers, setSelectAnswers] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<'success' | 'wrong' | null>(null);

  const refDeph1 = useRef<HTMLImageElement>(null);
  const refDeph2 = useRef<HTMLImageElement>(null);
  const refDeph3 = useRef<HTMLImageElement>(null);
  const refDeph4 = useRef<HTMLImageElement>(null);

  const spaceBlank = question.paragraphParts.filter((part) => part.type === 'space');
  const answers = [...question.mockAnswers, ...spaceBlank.map((ans) => ans.content)];

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
    for (const space of spaceBlank) {
      if (!selectAnswers.includes(space.content)) {
        setOpenModal('wrong');
        setSelectAnswers([]);
        return;
      }
    }
    setOpenModal('success');
    return;
  };

  const handleDepthMove: React.MouseEventHandler = (e) => {
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
  };
  return (
    <>
      <div className={css.wrapper_depths} onMouseMove={handleDepthMove}>
        <img src="assets/images/page-9/Fondo_mar.webp" />
        <img src="assets/images/page-9/Fondo_mar.webp" className={css.image_depth} ref={refDeph4} />
        <img
          src="assets/images/page-9/Fondo_algas detrás de la arena.webp"
          className={css.image_depth}
          ref={refDeph3}
        />
        <img src="assets/images/page-9/Fondo_arena.webp" className={css.image_depth} ref={refDeph2} />
        <img src="assets/images/page-9/Fondo_Primer plano.webp" className={css.image_depth} ref={refDeph1} />
        <div className={css.container__question}>
          <img src="assets/images/page-9/Ancla.webp" />
          <p className="u-font-bold u-text-center">
            {question.paragraphParts.map((part, index) =>
              part.type === 'text' ? (
                <span key={index}>{part.content}</span>
              ) : (
                <span key={index} className={selectParagraph(part.index)}>
                  {part.index < selectAnswers.length ? ' ' + selectAnswers[part.index] + ' ' : '____'}
                </span>
              )
            )}
          </p>
          <img src="assets/images/page-9/Ancla.webp" />
        </div>
        {answers.map((q, i) => (
          <button
            key={q}
            className={`${css.fish} ${selectAnswers.includes(q) && css.selectAnswer}`}
            style={{
              top: `${35 + Math.random() * 40}%`,
              left: 5 + i * 12 + '%',
              animationDelay: Math.random() * 2 + 's'
            }}
            onClick={() => addSelectAnswer(q)}>
            <img src={DATA_fishs[i].image} style={{ transform: `scaleX(${scales[Math.round(Math.random())]})` }} />
            <p className={css.paragraph__fish}>{q}</p>
          </button>
        ))}
        <p className={css.score}>Puntaje</p>
        {[...Array(8)].map(() => (
          <img
            src="assets/images/page-9/Burbuja de aire.webp"
            className={css.bubble}
            style={{ animationDelay: 2 + Math.random() * 10 + 's', left: Math.random() * 100 + '%' }}
          />
        ))}
        {openModal === 'wrong' && (
          <img src="assets/images/Ova_002_sld_15_Haz fallado.webp" className={css.modal_depth} />
        )}
        {openModal === 'success' && (
          <img src="assets/images/Ova_002_sld_15_Felicidades.webp" className={css.modal_depth} />
        )}
      </div>
      <div className={css.container_controls}>
        <Button
          label="Comprobar"
          disabled={spaceBlank.length > selectAnswers.length}
          onClick={checkAnswers}
          id="button-comprobar"
        />
        <Button
          label="Reintentar"
          onClick={() => {
            setSelectAnswers([]);
            setOpenModal(null);
          }}
        />
        {openModal === 'success' && (
          <Panel.Button section={index + 1}>
            <Button label="Continuar" />
          </Panel.Button>
        )}
      </div>
    </>
  );
}
