import { useId } from 'react';

import css from './svg-card.module.css';

interface PropsInputRadio {
  id: string;
  answer: string;
  label: string;
  onChange: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputRadio: React.FC<PropsInputRadio> = ({ id, answer, label, onChange }) => {
  const radioID = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.checked) {
      onChange(target.value);
    }
  };

  return (
    <div className={`${css.radio__svg}`}>
      <input
        id={radioID}
        type="radio"
        name={`radio-svg-question-${id}`}
        value={answer}
        onChange={handleChange}
        data-input="svg"
        data-state=""
      />
      <label htmlFor={radioID}>{label}</label>
    </div>
  );
};
