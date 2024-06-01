import { useId } from 'react';
import { Link } from 'wouter';

import { useOvaContext } from '@/context/ova-context';

import { Icon } from '../icon';

import { i18n } from './consts';

import css from './header.module.css';

export const Header = () => {
  return (
    <header className={`${css['header']} u-px-2 u-py-0.8`}>
      <MenuA11y />
      <TitleSlide />

      <Menu />
      <img
        className={css['logo']}
        src="assets/images/logo.webp"
        alt="UNAD: Universidad Nacional Abierta y a Distancia"
        width="404"
        height="209"
      />
    </header>
  );
};

const TitleSlide = () => {
  const uid = useId();

  return (
    <div className={css['title-slide']}>
      <p className={css['title-slide__number']} aria-hidden="true">
        1.
      </p>
      <h1 aria-describedby={uid} aria-hidden="true">
        Objetivo de aprendizaje
      </h1>
      <h1 id={uid} className="u-sr-only">
        Página 1, Objetivo de aprendizaje
      </h1>
    </div>
  );
};

const MenuA11y = () => {
  const { lang } = useOvaContext();

  return (
    <div className={css['menu-a11y']}>
      <ul role="list" className="u-flow">
        <li>
          <button aria-label="activar audio" className={css['menu-a11y__button']}>
            <Icon name="play" /> {i18n[lang].audio}
          </button>
        </li>

        <li>
          <button aria-label="Accesibilidad" className={css['menu-a11y__button']}>
            <Icon name="hand-a11y" /> {i18n[lang].a11y}
          </button>
        </li>
      </ul>
    </div>
  );
};

export const Menu = () => {
  const { lang } = useOvaContext();

  return (
    <nav role="navigation" className={css['menu']}>
      <ul role="list" className={css['menu__list']}>
        <li>
          <Link to="/" className={css['menu__button']}>
            <Icon name="home" />
            <span>{i18n[lang].home}</span>
          </Link>
        </li>
        <li>
          <button className={css['menu__button']}>
            <Icon name="menu" />
            <span>{i18n[lang].menu}</span>
          </button>
        </li>
        <li>
          <button className={css['menu__button']}>
            <Icon name="help" />
            <span>{i18n[lang].help}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
