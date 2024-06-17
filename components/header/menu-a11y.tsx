// import { Accordion } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';

import { Icon } from '../icon';

import { MenuOptions } from './types/types';
import { i18n } from './consts';
import { useHeaderContext } from './header-context';

// import { MenuList } from './menu-list';
import css from './header.module.css';

export const MenuA11y = () => {
  const { expanded, handleExpanded } = useHeaderContext();
  const { lang } = useOvaContext();

  return (
    <>
      <div className={css['menu-a11y']}>
        <ul role="list" className={css['list']}>
          <li>
            <button aria-label="activar audio" className={css['menu-a11y__button']}>
              <Icon name="play" /> {i18n[lang].audio}
            </button>
          </li>

          <li className={css['list__item']}>
            <button
              aria-label="Accesibilidad"
              aria-pressed={expanded.a11y}
              className={css['menu-a11y__button']}
              onClick={() => handleExpanded(MenuOptions.A11Y)}>
              <Icon name="hand-a11y" /> {i18n[lang].a11y}
            </button>

            {/* {expanded.a11y && (
            <MenuList data-underline="true">
              <Accordion>
                <li>
                  <button className={css['menu-list__button']}>
                    <Icon name="dark-mode" />
                    Modo oscuro
                  </button>
                </li>
                <li>
                  <button className={css['menu-list__button']}>
                    <Icon name="stop-animations" />
                    Detener animaciones
                  </button>
                </li>
                <li>
                  <Accordion.Item addClass={css['accordion']}>
                    <Accordion.Button addClass={css['accordion__button']}>
                      <Icon name="contrast" />
                      Contraste
                    </Accordion.Button>
                    <Accordion.Panel addClass={css['accordion__panel']}>
                      <ul>
                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Sin tema</span>
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Escala de grises</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Alto constraste</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Invertir colores</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Amarillo sobre negro</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Blanco sobre rojo</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Verde sobre azul</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Amarillo sobre azul</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Blanco sobre negro</span>
                            <Icon name="check" />
                          </button>
                        </li>
                      </ul>
                    </Accordion.Panel>
                  </Accordion.Item>
                </li>
                <li>
                  <Accordion.Item addClass={css['accordion']}>
                    <Accordion.Button addClass={css['menu-list__button']}>
                      <Icon name="font-size" />
                      Tamaño de letra
                    </Accordion.Button>
                    <Accordion.Panel addClass={css['accordion__panel']}>
                      <ul>
                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Tamaño de letra 1</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Tamaño de letra 2</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Tamaño de letra 3</span>
                            <Icon name="check" />
                          </button>
                        </li>
                      </ul>
                    </Accordion.Panel>
                  </Accordion.Item>
                </li>
                <li>
                  <Accordion.Item addClass={css['accordion']}>
                    <Accordion.Button addClass={css['menu-list__button']}>
                      <Icon name="letter-spacing" />
                      Espaciado de texto
                    </Accordion.Button>
                    <Accordion.Panel addClass={css['accordion__panel']}>
                      <ul>
                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Sin espaciado</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Espaciado ligero</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Espaciado moderado</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Espaciado pesado</span>
                            <Icon name="check" />
                          </button>
                        </li>
                      </ul>
                    </Accordion.Panel>
                  </Accordion.Item>
                </li>
                <li>
                  <Accordion.Item addClass={css['accordion']}>
                    <Accordion.Button addClass={css['menu-list__button']}>
                      <Icon name="line-height" />
                      Altura de la línea
                    </Accordion.Button>
                    <Accordion.Panel addClass={css['accordion__panel']}>
                      <ul>
                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Sin altura</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Altura x1.5</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Altura x1.75</span>
                            <Icon name="check" />
                          </button>
                        </li>

                        <li>
                          <button className={css['accordion__panel-button']}>
                            <span>Altura x2.0</span>
                            <Icon name="check" />
                          </button>
                        </li>
                      </ul>
                    </Accordion.Panel>
                  </Accordion.Item>
                </li>
              </Accordion>
            </MenuList>
          )} */}
          </li>
        </ul>
      </div>
    </>
  );
};
