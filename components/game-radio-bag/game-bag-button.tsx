import { cloneElement } from 'react';

import { useGameBagContext } from './game-radio-context';

interface Props {
  type?: 'reset';
  children: React.ReactElement;
}

export const BagButton: React.FC<Props> = ({ type, children }) => {
  const { handleValidation, handleReset, button, validation, result } = useGameBagContext();

  return cloneElement(children, {
    ...children.props,
    disabled: type !== 'reset' ? button : validation ? result : true,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      if (children.props.onClick) {
        children.props.onClick(event);
      }
      type === 'reset' ? handleReset() : handleValidation();
    }
  });
};
