import type { ButtonProps as ButtonPropsUI } from 'books-ui';
import { Button as ButtonUI } from 'books-ui';

import { Icon } from '../icon';

import css from './button.module.css';

interface Props extends ButtonPropsUI {
  addClass?: string;
}

export const Button: React.FC<Props> = ({ addClass, label, ...props }) => {
  return (
    <ButtonUI addClass={`${css['button']} ${addClass ?? ''}`} label={label} {...props} hasAriaLabel>
      {label}
      <Icon name="arrow-right-button" />
    </ButtonUI>
  );
};
