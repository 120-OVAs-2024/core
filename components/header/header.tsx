import { useState } from 'react';

import { A11yOverlay } from '../a11y-overlay';

import { type MenuExpanded, MenuOptions, PropertyType } from './types/types';
import { HeaderProvider } from './header-context';
import { HeaderTitle } from './header-title';
import { Menu } from './menu';
import { MenuA11y } from './menu-a11y';

import css from './header.module.css';

export const Header = () => {
  const [expanded, setExpanded] = useState<MenuExpanded>({
    menu: false,
    help: false,
    a11y: false
  });

  /**
   * Función que permite controlar el valor
   * (true/false) de las propiedades del objeto extended.
   *
   * @param {string} property - Propiedad del objeto del extended.
   */
  const handleExpanded = (property: PropertyType) => {
    setExpanded((prev) => {
      // Colocamos todas las propiedades de extended en false.
      const newState: MenuExpanded = Object.keys(prev).reduce(
        (object, key) => ({ ...object, [key as keyof MenuExpanded]: false }),
        {} as MenuExpanded
      );

      if (property === MenuOptions.RESET) return newState;

      return {
        ...newState,
        [property]: !expanded[property]
      };
    });
  };

  return (
    <HeaderProvider value={{ expanded, handleExpanded }}>
      <header id="header" className={`${css['header']} u-px-2 u-py-0.8`}>
        <MenuA11y />
        <HeaderTitle />
        <Menu />
        <img
          className={css['logo']}
          src="assets/base/logo.webp"
          alt="UNAD: Universidad Nacional Abierta y a Distancia"
          width="404"
          height="209"
        />
      </header>
      <A11yOverlay isOpen={expanded.a11y} onClose={() => handleExpanded(MenuOptions.A11Y)} />
    </HeaderProvider>
  );
};
