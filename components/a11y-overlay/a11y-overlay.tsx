import { useId, useRef } from 'react';
import { Accordion, Kbd } from 'books-ui';

import { Icon } from '../icon';

import { useModal } from './hooks/useModal';
import { A11yButtton } from './a11y-button';
import { A11yCard } from './a11y-card';

import css from './a11y-overlay.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}


export const A11yOverlay: React.FC<Props> = ({ isOpen, onClose }) => {
  const uid = useId();
  const refModal = useRef<HTMLDivElement>(null);

  const { handleKeyDown } = useModal({ ref: refModal, isOpen, onClose });

  return (
    <div
      ref={refModal}
      role="dialog"
      hidden={!isOpen}
      tabIndex={-1}
      aria-modal="true"
      onKeyDown={handleKeyDown}
      aria-labelledby={`a11y-overlay-${uid}`}
      className={css['modal']}>
      <div className={css['modal__header']}>
        <h2 id={`a11y-overlay-${uid}`} className="u-sr-only">
          Menú de accesibilidad, puedes utilizar las teclas Ctrl + Alt + D para abrir y cerrar este menu
        </h2>
        <h2 aria-labelledby={`a11y-overlay-${uid}`} aria-hidden="true" className={css['modal__title']}>
          Menú de accesibilidad
          <Kbd>Ctrl</Kbd> + <Kbd>Alt</Kbd> + <Kbd>D</Kbd>
        </h2>

        <button aria-label="Cerrar modal" className={css['modal__button']} onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>

      <div className={css['modal__main']}>
        <A11yButtton label="Modo oscuro" icon="dark-mode" />
        <A11yButtton label="Detener animaciones" icon="stop-animations" />

        <Accordion defaultIndex={0} allowMultiple>
          <Accordion.Item addClass={css['accordion']}>
            <Accordion.Button
              addClass={css['accordion__button']}
              expandedIcon={<Icon name="square-expand" />}
              closedIcon={<Icon name="square-close-expanded" />}>
              Ajuste del contraste
            </Accordion.Button>

            <Accordion.Panel addClass={css['accordion__panel']}>
              <A11yCard icon="contrast" title="Contraste personalizado" main="Ajusta el contraste del sitio." />
              <ul className={css['button-list']}>
                <li>
                  <A11yButtton label="Escala de grises" icon="monochrome" />
                </li>
                <li>
                  <A11yButtton label="Alto contraste" icon="high-contrast" />
                </li>
                <li>
                  <A11yButtton label="Invertir colores" icon="invert-colors" />
                </li>
                <li>
                  <A11yButtton label="Amarillo con negro" icon="filter" />
                </li>
                <li>
                  <A11yButtton label="Blanco con rojo" icon="filter" />
                </li>
                <li>
                  <A11yButtton label="Verde con azul" icon="filter" />
                </li>
                <li>
                  <A11yButtton label="Amarillo con azul" icon="filter" />
                </li>
                <li>
                  <A11yButtton label="Blanco con negro" icon="filter" />
                </li>
              </ul>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item addClass={css['accordion']}>
            <Accordion.Button
              addClass={css['accordion__button']}
              expandedIcon={<Icon name="square-expand" />}
              closedIcon={<Icon name="square-close-expanded" />}>
              Ajuste del tamaño de fuente
            </Accordion.Button>
            <Accordion.Panel addClass={css['accordion__panel']}>
              <A11yCard icon="font-size" title="Tamaño de fuente" main="Aumentar y disminuir el tamaño de la fuente." />
              <ul className={css['button-list']}>
                <li>
                  <A11yButtton label="Tamaño de letra 1" icon="font-perfect" />
                </li>
                <li>
                  <A11yButtton label="Tamaño de letra 2" icon="font-increase" />
                </li>
                <li>
                  <A11yButtton label="Tamaño de letra 2" icon="font-big" />
                </li>
              </ul>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item addClass={css['accordion']}>
            <Accordion.Button
              addClass={css['accordion__button']}
              expandedIcon={<Icon name="square-expand" />}
              closedIcon={<Icon name="square-close-expanded" />}>
              Ajuste la altura de la línea
            </Accordion.Button>
            <Accordion.Panel addClass={css['accordion__panel']}>
              <A11yCard icon="line-height" title="Altura de la línea" main="Aumenta el tamaño de la línea." />
              <ul className={css['button-list']}>
                <li>
                  <A11yButtton label="Altura x1.5" icon="line-height-15" />
                </li>
                <li>
                  <A11yButtton label="Altura x1.75" icon="line-height-175" />
                </li>
                <li>
                  <A11yButtton label="Altura x2" icon="line-height-2" />
                </li>
              </ul>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item addClass={css['accordion']}>
            <Accordion.Button
              addClass={css['accordion__button']}
              expandedIcon={<Icon name="square-expand" />}
              closedIcon={<Icon name="square-close-expanded" />}>
              Ajuste el espaciado de texto
            </Accordion.Button>
            <Accordion.Panel addClass={css['accordion__panel']}>
              <A11yCard icon="letter-spacing" title="Espaciado de texto" main="Aumenta espaciado de texto." />
              <ul className={css['button-list']}>
                <li>
                  <A11yButtton label="Espaciado ligero" icon="letter-spacing-small" />
                </li>
                <li>
                  <A11yButtton label="Espaciado medio" icon="letter-spacing-mid" />
                </li>
                <li>
                  <A11yButtton label="Espaciado pesado" icon="letter-spacing-big" />
                </li>
              </ul>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};
