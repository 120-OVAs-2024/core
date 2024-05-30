import { useId } from 'react';
import { Link } from 'wouter';

import { Icon } from '../icon';

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
  return (
    <div className={css['menu-a11y']}>
      <ul role="list" className="u-flow">
        <li>
          <button aria-label="activar audio" className={css['menu-a11y__button']}>
            <Icon name="play" /> Activar audio
          </button>
        </li>

        <li>
          <button aria-label="Accesibilidad" className={css['menu-a11y__button']}>
            <Icon name="hand-a11y" /> Accesibilidad
          </button>
        </li>
      </ul>
    </div>
  );
};

export const Menu = () => {
  return (
    <nav role="navigation" className={css['menu']}>
      <ul role="list" className={css['menu__list']}>
        <li>
          <Link to="/" className={css['menu__button']}>
            <Icon name="home" />
            <span>inicio</span>
          </Link>
        </li>
        <li>
          <button className={css['menu__button']}>
            <Icon name="help" />
            <span>ayuda</span>
          </button>
        </li>
        <li>
          <button className={css['menu__button']}>
            <Icon name="menu" />
            <span>menu</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
