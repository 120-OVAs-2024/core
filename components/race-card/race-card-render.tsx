/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import { Col, Row } from 'books-ui';

import { FullScreenAlert, FullScreenButton } from '@/shared/components';

import { InputRadio } from './input-radio';
import { RaceCard } from './race-card';
import { CartColors } from './types';

import css from './svg-card.module.css';

interface PropsSvgPag12TWO {
  options: { choices: { state: string; option: string }[]; activity: string };
  modal: { audioSuccess: string; textSuccess: string; audioWrong: string; textWrong: string };
  question: string;
  title?: string;
  alt?: string;
  isEnd?: boolean;
  id: string;
  colorsCarts?: CartColors;
}

export const RaceCardRender: React.FC<PropsSvgPag12TWO> = ({
  options,
  question,
  id,
  title,
  alt,
  modal,
  colorsCarts,
  ...props
}) => {
  const newChoices = useMemo(() => {
    if (!options) return [];

    return options?.choices?.map((choice) => ({
      // Generate a unique ID for each choice using crypto.randomUUID()
      id: crypto.randomUUID(),
      ...choice // Spread the properties of the original choice
    }));
  }, [options]);

  const [selected, setSelected] = useState<string>('');

  const onChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string;

    if (typeof value === 'string') {
      newValue = value;
    } else {
      newValue = value.target.value;
    }

    // Update the selected state with the new value
    setSelected(newValue);
  };

  const resetSelected = () => {
    setSelected(''); // Limpiar el estado seleccionado
  };

  return (
    <>
      <FullScreenAlert />
      <FullScreenButton elementId={id} />
      <Row justifyContent="center" addClass={css['svg-content']} id={id}>
        <Col xs="11" mm="11" md="9" lg="10" hd="3">
          <div className={`${css.content__radio}`}>
            {newChoices.map((choise) => (
              <InputRadio
                key={choise.id}
                id={options.activity}
                answer={choise.state}
                label={choise.option}
                onChange={onChange}
              />
            ))}
          </div>
        </Col>

        <Col xs="11" mm="11" md="9" lg="10" hd="6" addClass={css.content__game}>
          <RaceCard
            colorsCartInitial={colorsCarts}
            isEnd={false}
            question={question}
            selected={selected}
            resetSelected={resetSelected}
            modalFinal={modal}
            {...props}
          />
        </Col>
      </Row>
    </>
  );
};
