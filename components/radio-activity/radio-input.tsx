import css from './radio-activity.module.css';

interface Props {
  name: string;
  id: string;
  value: string;
  option: string;
  disabled: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioInput: React.FC<Props> = ({ name, id, value, onChange, option, disabled }) => {
  return (
    <label className={`${css.radio__option}`} htmlFor={id}>
      <input
        disabled={disabled}
        data-state=""
        className={css.input}
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      <span className={css.label}>{option}</span>
    </label>
  );
};
