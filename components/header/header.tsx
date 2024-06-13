import { useCallback, useEffect, useId, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import { useOvaContext } from '@/context/ova-context';
import { EVENTS } from '@/shared/consts/events';

import { Icon } from '../icon';

import { HOME_PATH, i18n, PATH_REGEX } from './consts';

import css from './header.module.css';

export const Header = () => {
  return (
    <header className={`${css['header']} u-px-2 u-py-0.8`}>
      <MenuA11y />
      <TitleSlide />

      <Menu />
      <img
        className={css['logo']}
        src="assets/base/logo.webp"
        alt="UNAD: Universidad Nacional Abierta y a Distancia"
        width="404"
        height="209"
      />
    </header>
  );
};

const TitleSlide = () => {
  const [title, setTitle] = useState<{ title: string; number: string }>({ title: '', number: '' });
  const uid = useId();

  const [location] = useHashLocation();
  const { routes, titles } = useOvaContext();

  // Función para actualizar el título de la página
  const updateTitle = useCallback(
    (newTitle: string) => {
      // Obtener el número de la página actual desde la URL
      const currentPageNumber = (location.match(PATH_REGEX) || ['0'])[1];

      setTitle((prev) => {
        if (prev.number === currentPageNumber) {
          // Solo actualizar el título si el número de la página no ha cambiado
          return { ...prev, title: newTitle };
        }

        // Actualizar tanto el título como el número de la página
        return {
          title: newTitle,
          number: currentPageNumber
        };
      });
    },
    [location]
  );

  useEffect(() => {
    if (routes.length === 0 || titles.length === 0) return;

    // Encontrar el índice del título actual basado en la ubicación
    const titleIndex = routes.findIndex((route) => route === location);

    if (titleIndex >= 0) {
      const currentTitle = titles[titleIndex];
      updateTitle(currentTitle);
    }
  }, [location, routes, titles, updateTitle]);

  useEffect(() => {
    /**
     * Manejador para actualizar el título cuando se despacha el evento `OVATITLEUPDATE`.
     *
     * @param event - El evento personalizado que contiene el nuevo título en `detail`.
     */
    const handleUpdateTitle = ({ detail }: CustomEvent<{ title: string }>) => {
      const currentTitle = detail.title;
      updateTitle(currentTitle);
    };

    document.addEventListener(EVENTS.OVATITLEUPDATE, handleUpdateTitle as EventListener);

    return () => {
      document.removeEventListener(EVENTS.OVATITLEUPDATE, handleUpdateTitle as EventListener);
    };
  }, [updateTitle]);

  return location !== HOME_PATH ? (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={css['title-slide']}>
      <p className={css['title-slide__number']} aria-hidden="true">
        {title.number}.
      </p>
      <h1 aria-describedby={uid} aria-hidden="true" dangerouslySetInnerHTML={{ __html: title.title }} />
      <h1 id={uid} className="u-sr-only">
        Página {title.number}, {title.title}
      </h1>
    </motion.div>
  ) : null;
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
