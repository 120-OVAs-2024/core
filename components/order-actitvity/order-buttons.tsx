import { Children, cloneElement } from 'react';

import { focusMainElement } from '@/shared/utils/focusMain';

import { useOrderActivityContext } from './order-context';

interface Props {
  type?: 'reset';
  children: React.ReactElement;
}

export const OrderButton: React.FC<Props> = ({ type, children }) => {
  const { handleValidation, handleReset, button, validation, result } = useOrderActivityContext();

  const handleResetOrderActivity = () => {
    handleReset();
    focusMainElement();
  };

  return Children.map(children, (child) =>
    cloneElement(child, {
      ...child.props,
      disabled: type !== 'reset' ? button : validation ? result : true,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        if (child.props.onClick) {
          child.props.onClick(event);
        }
        type === 'reset' ? handleResetOrderActivity() : handleValidation();
      }
    })
  );
};
