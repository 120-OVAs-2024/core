import { useOvaContext } from '@/context/ova-context';

import { Icon } from '../icon';

import { MenuOptions } from './types/types';
import { i18n } from './consts';
import { useHeaderContext } from './header-context';

import css from './header.module.css';

export const MenuA11y = () => {
  const { expanded, handleExpanded } = useHeaderContext();
  const { lang } = useOvaContext();

  return (
    <>
      <div className={css['menu-a11y']}>
        <ul role="list" className={css['list']}>
          <li>
            <button aria-label="activar audio" className={`${css['menu-a11y__button']} js-button-audio-a11y`}>
              <Icon name="play" /> <span>{i18n[lang].audio}</span>
            </button>
          </li>

          <li className={css['list__item']}>
            <button
              aria-label="Accesibilidad"
              aria-pressed={expanded.a11y}
              className={`${css['menu-a11y__button']} js-button-a11y`}
              onClick={() => handleExpanded(MenuOptions.A11Y)}>
              <Icon name="hand-a11y" /> <span>{i18n[lang].a11y}</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
