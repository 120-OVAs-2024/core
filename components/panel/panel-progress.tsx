import { forwardRef, useMemo, useRef } from 'react';
import { usePanelContext as usePanel } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';
import { eventUpdateTitle } from '@/shared/utils/eventUpdateTitle';

import { i18n } from './consts';
import { usePanelCoreContext } from './panel-context';

import css from './panel.module.css';

/**
 * Se crea un objeto que no se puede cambiar para
 * almacenar el keyCode de las teclas left y right.
 */
const KEYCODE = Object.freeze({
  LEFT: 37,
  RIGHT: 39
});

export const PanelProgress = () => {
  const { lang } = useOvaContext();
  const { titles } = usePanelCoreContext();
  const { validation, handleToggle, sectionsId, isOpen } = usePanel();

  const LAST_SECTION_INDEX = sectionsId.length - 1;
  const FIRST_SECTION_INDEX = 0;

  /**
   * Creamos está referencia para almacenar
   * las referencias de los botones usados
   * para navegar entre secciones.
   */
  const refSections = useRef<HTMLButtonElement[]>([]);

  /**
   * Indice de la sección que está visible.
   */
  const currentSection = useMemo(() => sectionsId.findIndex((uid) => uid === isOpen), [isOpen, sectionsId]);

  /**
   * Objeto que almacena el valor de la sección a la cual el botón
   * tiene que redirigir dependiendo el tipo de este.
   */
  const BUTTON_TYPE = useMemo(() => {
    const previous = currentSection - 1;
    const next = currentSection + 1;

    return {
      previous: previous >= 0 ? previous : 0, // Asegurarse de que no sea negativo
      next: next < sectionsId.length ? next : sectionsId.length - 1 // Asegurarse de que no sea mayor que el máximo índice
    };
  }, [currentSection, sectionsId]);

  /**
   * Función utilizada para obtener y almacenar las referencias de los botones.
   *
   * @param {HTMLButtonElement} ref - Referencia del botón.
   * @returns {HTMLButtonElement[]} - Arreglo de referencias actualizado.
   */
  const addNewRef = (ref: HTMLButtonElement): HTMLButtonElement[] => {
    if (!refSections.current.includes(ref) && ref) {
      // Agrega la nueva referencia al arreglo y actualiza refSections.current
      refSections.current = [...refSections.current, ref];
    }
    return refSections.current;
  };

  /**
   * Función utilizada en el evento KeyDown del botón,
   * permite decidir el focus del siguiente elemento
   * utilizando las teclas ArrowLeft o ArrowRight.
   *
   * @param {Event} event - Evento disparado por KeyDown
   */
  const handleKeyTrap = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Obtenemos la primera sección.
    const FIRST_SECTION = refSections.current[0];
    // Obtenemos la última sección.
    const LAST_SECTION = refSections.current[refSections.current.length - 1];

    // Si la tecla pulsada ArrowLeft
    if ((event.keyCode || event.which) === KEYCODE.LEFT) {
      if (event.target === FIRST_SECTION) {
        LAST_SECTION.focus();
      } else {
        const prevFocusButton = refSections.current.indexOf(event.target as HTMLButtonElement) - 1;
        // Agregamos el focus al botón anterior
        refSections.current[prevFocusButton].focus();
      }
    } else if ((event.keyCode || event.which) === KEYCODE.RIGHT) {
      // Si la tecla pulsada es ArrowRight
      if (event.target === LAST_SECTION) {
        FIRST_SECTION.focus();
      } else {
        const nextFocusButton = refSections.current.indexOf(event.target as HTMLButtonElement) + 1;
        // Agregamos el focus al siguiente botón
        refSections.current[nextFocusButton].focus();
      }
    }
  };
  /**
   * Maneja el evento onClick para mostrar la sección correspondiente.
   *
   * @param {string} section - Identificador de la sección que se desea mostrar.
   */
  const handleClick = (section: string) => {
    // Manejar el cambio de sección
    handleToggle(section);

    if (titles.length <= 0) return;

    // Encontrar el índice de la sección actual en el array sectionsId
    const currentIndex = sectionsId.findIndex((uid) => uid === section);

    if (currentIndex !== -1) {
      // Obtener el título correspondiente a la sección actual
      const currentTitle = titles[currentIndex];
      if (currentTitle) eventUpdateTitle(currentTitle);
    }
  };

  return (
    <div className={`${css['progress']} u-wrapper u-mt-5`}>
      <h2 id="panel-progress-navigation" className="u-sr-only">
        {i18n[lang].role}
      </h2>
      <p className="u-sr-only" aria-atomic="true" aria-live="polite">
        {i18n[lang].a11y} {currentSection + 1} {i18n[lang].sectionBy} {sectionsId.length}
      </p>
      <p aria-hidden="true">
        {i18n[lang].section} {currentSection + 1} / {sectionsId.length}
      </p>
      <ul
        className={css['progress__list']}
        role="tablist"
        aria-labelledby="panel-progress-navigation"
        aria-orientation="horizontal">
        <li role="presentation">
          <button
            onClick={() => handleClick(sectionsId[BUTTON_TYPE.next])}
            className={css['progress__button']}
            aria-label={i18n[lang].ariaNext}
            disabled={true && currentSection >= (LAST_SECTION_INDEX || 0)}>
            {i18n[lang].next}
          </button>
        </li>
        {sectionsId.map((uid, index) => (
          <PanelProgressItem
            key={`section-${uid}`}
            ref={addNewRef}
            uid={uid}
            section={index}
            beforeToActive={index < currentSection + 1}
            isSelected={validation(sectionsId[index])}
            handleNavigation={handleClick}
            handleKeyDown={handleKeyTrap}
          />
        ))}
        <li role="presentation">
          <button
            onClick={() => handleClick(sectionsId[BUTTON_TYPE.previous])}
            className={css['progress__button']}
            aria-label={i18n[lang].ariaPrev}
            disabled={true && currentSection <= FIRST_SECTION_INDEX}>
            {i18n[lang].previous}
          </button>
        </li>
      </ul>
    </div>
  );
};

interface PanelProgresItemProps {
  uid: string;
  section: number;
  isSelected: boolean;
  beforeToActive: boolean;
  handleNavigation: (uid: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const PanelProgressItem = forwardRef<HTMLButtonElement, PanelProgresItemProps>(function PanelProgressItem(
  { uid, section, isSelected, beforeToActive, handleKeyDown, handleNavigation },
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <li role="presentation" className={css['progress__item']}>
      <button
        ref={ref}
        role="tab"
        className={`${css['progress__item-button']} ${beforeToActive ? css['progress__item-button--active'] : ''}`}
        tabIndex={isSelected ? 0 : -1}
        aria-selected={isSelected}
        onClick={() => handleNavigation(uid)}
        onKeyDown={handleKeyDown}
        aria-label={`Sección ${section}`}>
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="clipPath" clipPathUnits="objectBoundingBox">
              <path d="M 0.2,0.088 Q 0.936,0.392 0.938,0.518 Q 0.934,0.642 0.216,0.908 Q 0.076,0.99 0.074,0.826 L 0.076,0.152 Q 0.072,0.01 0.2,0.088 Z"></path>
            </clipPath>
          </defs>
        </svg>
      </button>
    </li>
  );
});
