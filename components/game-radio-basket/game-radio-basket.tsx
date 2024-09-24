import { useState } from 'react';
import { Button } from '@shared/components';

import { RadioInput } from './radio-input';

import css from './game-radio-basket.module.css';

type Data = {
  id: string;
  name: string;
  value: string;
  option: string;
};

interface Props {
  children: React.ReactNode;
  onResult: (state: string | null) => void;
  data: Data[];
  isBallon?: boolean;
}

export const GameRadioBasket: React.FC<Props> = ({ data, onResult, isBallon = true, children }) => {
  const [state, setState] = useState<string | null>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [disabledInput, setDisabledInput] = useState<boolean>(false);

  const [disabledButton, setDisabledButton] = useState({ check: true, reset: true });

  /**
   * Maneja el cambio de selección en los radio buttons.
   * Actualiza el estado de selección (`state`) y el ID seleccionado (`selectedId`),
   * y habilita el botón de validación mientras deshabilita el botón de reinicio.
   *
   * @param event El evento de cambio de input que contiene el nuevo valor y ID del radio button seleccionado.
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    setSelectedId(event.target.id);
    setDisabledButton({ check: false, reset: true });
  };

  /**
   * Realiza la validación de la selección de un radio button y actualiza el estado visual en consecuencia.
   * Deshabilita la interacción con los radio buttons después de la validación y llama a `onResult`
   * con el estado actual.
   */
  const validation = () => {
    if (selectedId !== null) {
      const inputElement = document.getElementById(selectedId) as HTMLInputElement | null;

      if (inputElement && inputElement.id === selectedId) {
        const newState = state === 'success' ? 'correct' : 'incorrect';
        const disableCheck = true;
        const disableReset = state === 'success' ? true : false;

        // Actualiza visualmente el estado `data-state` del contenedor.
        const parentElement = inputElement.closest(`.${css.radio__option}`);
        if (parentElement) {
          parentElement.setAttribute('data-state', newState);
        }

        setDisabledButton({ check: disableCheck, reset: disableReset });
      }
    }

    setDisabledInput(true);

    // Llama a la función `onResult` con el estado actual (`state`).
    if (onResult) {
      onResult(state);
    }
  };

  /**
   * Reinicia la actividad a sus valores iniciales
   */
  const handleReset = () => {
    const inputElements = document.querySelectorAll(`.${css.radio__option}`);
    inputElements.forEach((element) => {
      element.setAttribute('data-state', '');
    });
    setSelectedId(null);
    setState(null);
    setDisabledInput(false);
    setDisabledButton({ reset: true, check: true });
  };

  return (
    <div className={css.radios__container}>
      <div className={css.radio__options}>
        <div className={css.radio__options_container}>
          {data.map((element) => (
            <RadioInput
              key={element.id}
              id={element.id}
              name={element.name}
              value={element.value}
              onChange={onChange}
              option={element.option}
              disabled={disabledInput}
              isChecked={selectedId === element.id}
            />
          ))}
        </div>
        <div className={`u-mt-3 ${css['game-radio-basket-buttons']}`}>
          <Button disabled={disabledButton.check} label="Comprobar" onClick={validation} />
          <Button type="reset" disabled={disabledButton.reset} label="Reiniciar" onClick={handleReset} />
        </div>

        {isBallon && (
          <div className={css.img__basket}>
            <img src="assets/images/ova_33_sld_12_ball.webp" alt="Balon de basket" />
          </div>
        )}
      </div>
      <div className={css.radio__question}>{children}</div>
      <p className="u-my-3 u-font-italic">
        <strong>Imagen 13.</strong> Juego actividad de selección múltiple.
      </p>
    </div>
  );
};
