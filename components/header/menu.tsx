import { useLayoutEffect, useState } from 'react';
import { Kbd, Tour } from 'books-ui';
import { Link } from 'wouter';

import { useOvaContext } from '@/context/ova-context';

import { useA11y } from '../a11y-overlay/hooks/useA11y';
import { Icon } from '../icon';
import { Modal } from '../modal';

import { MenuOptions } from './types/types';
import { i18n, i18nTour, MODAL, SPANISH_LANGUAGE } from './consts';
import { useHeaderContext } from './header-context';
import { MenuButton } from './menu-button';
import { MenuList } from './menu-list';

import css from './header.module.css';

export const Menu = () => {
  const { lang, titles, routes } = useOvaContext();
  const { expanded, handleExpanded } = useHeaderContext();
  const { updateHTMLAttributesFromLocalStorage } = useA11y();

  // Usado para controlar la apertura y cierre
  // del componente  <Modal/>
  const [modal, setOpenModal] = useState<string | null>(null);

  /**
   * Función para abrir los modales.
   * @param {string} modal
   */
  const toggleModal = (modal?: string) => {
    setOpenModal(modal || null);
  };

  useLayoutEffect(() => {
    /**
     * Obtiene las opciones de accesiblidad que
     * están en el localStorage y las aplica en el elemento HTML.
    */
   updateHTMLAttributesFromLocalStorage();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav role="navigation" aria-label={i18n[lang].nav} className={css['menu']}>
        <HamburguerButton />
        <ul role="list" className={`${css['list']} ${css['list--menu']}`}>
          <li className={css['list__item']}>
            <Link to="/" className={`${css['menu__button']} js-link-home`}>
              <Icon name="home" />
              <span>{i18n[lang].home}</span>
            </Link>
          </li>
          <li className={css['list__item']}>
            <MenuButton
              aria-expanded={expanded.menu}
              addClass="js-button-menu"
              onClick={() => handleExpanded(MenuOptions.MENU)}>
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
            <MenuButton
              aria-expanded={expanded.help}
              addClass="js-button-help"
              onClick={() => handleExpanded(MenuOptions.HELP)}>
              <Icon name="help" />
              <span>{i18n[lang].help}</span>
            </MenuButton>

            {expanded.help && (
              <MenuList data-underline="true" addClass={css['menu-list--fit']}>
                <li>
                  <button
                    className={`${css['menu-list__button']} js-button-shortcuts`}
                    onClick={() => toggleModal(MODAL.SHORTCUTS)}>
                    <Icon name="keyboard" />
                    {i18n[lang].shortcuts}
                  </button>
                </li>
                <li>
                  <TourButton />
                </li>
                <li>
                  <button
                    className={`${css['menu-list__button']} js-button-specifications`}
                    onClick={() => toggleModal(MODAL.ESPECIFICATION)}>
                    <Icon name="settings" />
                    {i18n[lang].specifications}
                  </button>
                </li>
              </MenuList>
            )}
          </li>
        </ul>
      </nav>

      <Modal isOpen={modal === MODAL.SHORTCUTS} onClose={toggleModal} finalFocusRef=".js-button-shortcuts">
        <section className={`${css['modal__wrapper']} u-flow u-px-3 u-py-2`}>
          <h2 className={`${css['modal__title']} u-mb-4`}>
            {lang === SPANISH_LANGUAGE ? 'Atajos de teclado' : 'Keyboard Shortcuts'}
          </h2>
          <ul className={css.shortcuts}>
            <li>
              <p className={css['shortcuts__box']}>
                <Icon name="arrow-right-footer" />
                <span>{lang === SPANISH_LANGUAGE ? 'Siguiente página' : 'Next page'}</span>
              </p>

              <div>
                <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>D</Kbd>
              </div>
            </li>

            <li>
              <p className={css['shortcuts__box']}>
                <Icon name="arrow-left-footer" />
                <span>{lang === SPANISH_LANGUAGE ? 'Página anterior' : 'Previous Page'}</span>
              </p>

              <div>
                <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>S</Kbd>
              </div>
            </li>

            <li>
              <p className={css['shortcuts__box']}>
                <Icon name="home" />
                <span>{lang === SPANISH_LANGUAGE ? 'Inicio' : 'Home'}</span>
              </p>

              <div>
                <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>C</Kbd>
              </div>
            </li>

            <li>
              <p className={css['shortcuts__box']}>
                <Icon name="hand-a11y" />
                <span>{lang === SPANISH_LANGUAGE ? 'Accesibilidad' : 'Accessibility'}</span>
              </p>

              <div>
                <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>A</Kbd>
              </div>
            </li>

            <li>
              <p className={css['shortcuts__box']}>
                <Icon name="help" />
                <span>{lang === SPANISH_LANGUAGE ? 'Ayuda' : 'Help'}</span>
              </p>

              <div>
                <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>H</Kbd>
              </div>
            </li>
          </ul>
        </section>
      </Modal>

      <Modal isOpen={modal === MODAL.ESPECIFICATION} onClose={toggleModal} finalFocusRef=".js-button-specifications">
        <section className={`${css['modal__wrapper']} u-flow u-px-3 u-py-2`}>
          {lang === SPANISH_LANGUAGE ? (
            <>
              <h2 className={css['modal__title']}>ESPECIFICACIONES TÉCNICAS</h2>
              <article>
                <h3>Requisitos técnicos</h3>
                <ul>
                  <li>Conexión estable a internet superior o igual a 3G.</li>
                  <li>Software de asistencia recomendados: NVDA, JAWS, VoiceOver (macOs).</li>
                </ul>
              </article>
              <article>
                <h3>Requerimientos de hardware</h3>
                <ul>
                  <li>Memoria RAM mínima 4GB.</li>
                  <li>Dispositivo con conexión a internet.</li>
                  <li>
                    Monitor monocromático, pantalla plana SVGA, se recomienda una la resolución estándar WXGA o
                    superior.
                  </li>
                  <li>
                    Smarthphone con sistema operativo superior o igual a:
                    <ul>
                      <li>Android 5</li>
                      <li>IOS 12</li>
                    </ul>
                  </li>
                </ul>
              </article>
              <article>
                <h3>Versión de navegadores</h3>
                <ul>
                  <li>Google Chrome: Versión 126</li>
                  <li>Safarí: Versión 17.5</li>
                  <li>Mozilla Firefox: Versión 127</li>
                </ul>
              </article>
            </>
          ) : (
            <>
              <h2 className={css['modal__title']}>TECHNICAL SPECIFICATIONS</h2>
              <article>
                <h3>Technical Requirements</h3>
                <ul>
                  <li>Stable internet connection equal to or greater than 3G.</li>
                  <li>Recommended assistive software: NVDA, JAWS, VoiceOver (macOS).</li>
                </ul>
              </article>
              <article>
                <h3>Hardware Requirements</h3>
                <ul>
                  <li>Minimum 4GB RAM.</li>
                  <li>Device with internet connection.</li>
                  <li>Monochrome monitor, flat screen SVGA, standard WXGA resolution or higher is recommended.</li>
                  <li>
                    Smartphone with operating system equal to or greater than:
                    <ul>
                      <li>Android 5</li>
                      <li>iOS 12</li>
                    </ul>
                  </li>
                </ul>
              </article>
              <article>
                <h3>Browser Versions</h3>
                <ul>
                  <li>Google Chrome: Version 126</li>
                  <li>Safari: Version 17.5</li>
                  <li>Mozilla Firefox: Version 127</li>
                </ul>
              </article>
            </>
          )}
        </section>
      </Modal>
    </>
  );
};

const HamburguerButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className={css['hamburguer__button']}
      aria-controls="main-menu"
      aria-label="Menú principal"
      aria-expanded={isOpen}
      onClick={handleOpen}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  );
};

const TourButton = () => {
  const { lang } = useOvaContext();
  const [openTour, setOpenTour] = useState<boolean>(false);

  const handleTour = () => {
    setOpenTour(!openTour);
  };

  const TOUR_STEPS = [
    {
      target: '.js-button-audio-a11y',
      content: i18nTour[lang].a11yAudio
    },
    {
      target: '.js-button-a11y',
      content: i18nTour[lang].a11y
    },
    {
      target: '.js-link-home',
      content: i18nTour[lang].home
    },
    {
      target: '.js-button-menu',
      content: i18nTour[lang].menu
    },
    {
      target: '.js-button-help',
      content: i18nTour[lang].help
    },
    {
      target: '.js-pagination-element',
      content: i18nTour[lang].navigation
    },
    {
      target: '.js-pagination-link-previous',
      content: i18nTour[lang].previous
    },
    {
      target: '.js-pagination-link-next',
      content: i18nTour[lang].next
    }
  ];

  return (
    <>
      <button className={`${css['menu-list__button']} js-button-tour`} onClick={handleTour}>
        <Icon name="info" />
        Tour
      </button>

      <Tour steps={TOUR_STEPS} isOpen={openTour} onClose={handleTour} finalFocusRef=".js-button-tour">
        <Tour.Layer addClass={css['tour__layer']} />
        <Tour.Modal addClass={css['tour__element']} />
      </Tour>
    </>
  );
};