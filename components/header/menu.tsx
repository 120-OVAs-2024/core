import { Link } from 'wouter';

import { useOvaContext } from '@/context/ova-context';

import { Icon } from '../icon';

import { MenuOptions } from './types/types';
import { i18n } from './consts';
import { useHeaderContext } from './header-context';
import { MenuButton } from './menu-button';
import { MenuList } from './menu-list';

import css from './header.module.css';

export const Menu = () => {
  const { lang, titles, routes } = useOvaContext();
  const { expanded, handleExpanded } = useHeaderContext();

  return (
    <nav role="navigation" className={css['menu']}>
      <ul role="list" className={css['list']}>
        <li className={css['list__item']}>
          <Link to="/" className={css['menu__button']}>
            <Icon name="home" />
            <span>{i18n[lang].home}</span>
          </Link>
        </li>
        <li className={css['list__item']}>
          <MenuButton aria-expanded={expanded.menu} onClick={() => handleExpanded(MenuOptions.MENU)}>
            <Icon name="menu" />
            <span>{i18n[lang].menu}</span>
          </MenuButton>

          {expanded.menu && (
            <MenuList>
              {titles.map((title, index) => (
                <li key={index}>
                  <Link to={routes[index]} className={css['menu-list__button']}>
                    <span className="u-font-bold" aria-hidden="true">
                      {index + 1}.
                    </span>
                    {title}
                  </Link>
                </li>
              ))}
            </MenuList>
          )}
        </li>
        <li className={css['list__item']}>
          <MenuButton aria-expanded={expanded.help} onClick={() => handleExpanded(MenuOptions.HELP)}>
            <Icon name="help" />
            <span>{i18n[lang].help}</span>
          </MenuButton>

          {expanded.help && (
            <MenuList data-underline="true">
              <li>
                <button className={css['menu-list__button']}>
                  <Icon name="keyboard" />
                  Atajos de teclado
                </button>
              </li>
              <li>
                <button className={css['menu-list__button']}>
                  <Icon name="info" />
                  Tour
                </button>
              </li>
              <li>
                <button className={css['menu-list__button']}>
                  <Icon name="settings" />
                  Especificaciones técnicas
                </button>
              </li>
            </MenuList>
          )}
        </li>
      </ul>
    </nav>
  );
};
