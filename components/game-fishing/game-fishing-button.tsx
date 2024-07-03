import {cloneElement,FC } from 'react';

import { useFishingActivityContext } from './game-fishing-context';

interface Props {
  type?: 'reset';
  children: React.ReactElement;
}

export const RadioButton: FC<Props> = ({ type, children }) => {
  const { handleValidation, handleReset, button, validation, result } = useFishingActivityContext();

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
