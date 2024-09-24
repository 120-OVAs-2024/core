import css from './game-radio-basket.module.css';

interface Props {
  name: string;
  id: string;
  value: string;
  option: string;
  disabled: boolean;
  isChecked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioInput: React.FC<Props> = ({ name, id, value, onChange, isChecked, option, disabled, ...props }) => {
  return (
    <label className={`${css.radio__option} ${isChecked ? `${css.checked}` : ''} `} htmlFor={id}>
      <input
        disabled={disabled}
        data-state=""
        className={css.input}
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={isChecked}
        {...props}
      />
      <span className={css.label}>{option}</span>
    </label>
  );
};
