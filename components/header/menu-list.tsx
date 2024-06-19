import { useCallback, useRef } from 'react';
import { useInteractOutside } from 'books-ui';

import { MenuOptions } from './types/types';
import { KEYCODE } from './consts';
import { useHeaderContext } from './header-context';

import css from './header.module.css';

interface Props extends React.OlHTMLAttributes<HTMLOListElement> {
  children: JSX.Element | JSX.Element[];
  addClass?: string;
}

export const MenuList: React.FC<Props> = ({ addClass, children, ...props }) => {
  const { handleExpanded } = useHeaderContext();
  const refList = useRef<HTMLUListElement>(null!);

  /**
   * Función que se utiliza para filtrar
   * los elementos del DOM que no deben cerrar
   * el <MenuList/> cuando se interactúe fuera de este.
   * @param {HTMLElement} element - Elemento del DOM
   * @returns {boolean}
   */
  const shouldCloseOnInteractOutside = (element: HTMLElement) => {
    if (element.tagName !== 'BUTTON' && element.tagName !== 'svg') return false;
    return element.dataset && element.dataset?.type === 'menu-button';
  };

  /**
   * Función que se ejecuta al momento de
   * presionar o tocar fuera del MenuList.
   * @param {MouseEvent} event - Evento mousedown | touchstart
   */
  const onInteractionOutside = (event: MouseEvent) => {
    if (!shouldCloseOnInteractOutside(event.target as HTMLElement)) {
      handleExpanded(MenuOptions.RESET);
      event.stopPropagation();
      event.preventDefault();
    }
  };

  /**
   * Custom hook que ejecuta un método
   * cuando se interactúa fuera del elemento <ref>
   */
  useInteractOutside({ ref: refList, onInteractionOutside });

  /**
   * Función para cerrar el <MenuList/> cuando el último elemento
   * dentro de este ha perdido el focus.
   * @param {HTMLUListElement} element - Referencia del elemento del <ul> del DOM.
   */
  const handleLastFocusable = (element: HTMLUListElement) => {
    const focusableElements = element.querySelectorAll('a, button');
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    lastFocusableElement.addEventListener('keydown', (event: KeyboardEvent) => {
      if ((event.key === 'Tab' || event.keyCode === KEYCODE.TAB) && !event.shiftKey) {
        handleExpanded(MenuOptions.RESET);
      }
    });
  };

  /**
   * Función para cerrar el <MenuList/> cuando
   * se presiona la tecla ESC.
   *
   * @param {React.KeyDownEvent<HTMLListElement>} event - Evento keydown.
   */
  const handleKeyDownForMenuList = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if ((event.keyCode || event.which) === KEYCODE.ESC) {
      handleExpanded(MenuOptions.RESET);
    }
  };

  const getRefElement = useCallback((node: HTMLUListElement) => {
    if (node !== null) {
      handleLastFocusable(node);
    }
    refList.current = node;
  }, []);

  return (
    <ul
      ref={getRefElement}
      role="list"
      onKeyDown={handleKeyDownForMenuList}
      className={`${css['menu-list']} ${addClass ?? ''}`}
      {...props}>
      {children}
    </ul>
  );
};
