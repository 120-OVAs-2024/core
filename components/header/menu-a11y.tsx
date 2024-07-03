import { useOvaContext } from '@/context/ova-context';

import { useA11y } from '../a11y-overlay/hooks/useA11y';
import { ConfigA11yProperty } from '../a11y-overlay/types/types';
import { Icon } from '../icon';

import { MenuOptions } from './types/types';
import { i18n } from './consts';
import { useHeaderContext } from './header-context';

import css from './header.module.css';

export const MenuA11y = () => {
  const { lang } = useOvaContext();
  const { expanded, handleExpanded } = useHeaderContext();
  const { config, setConfig } = useA11y();

  const toggleAudioA11y = () => {
    setConfig(ConfigA11yProperty.Audio);
  };

  return (
    <div className={css['menu-a11y']}>
      <ul role="list" className={css['list']}>
        <li>
          <button
            aria-pressed={config.audio}
            aria-label={config.audio ? i18n[lang].audioActive : i18n[lang].audioPause}
            className={`${css['menu-a11y__button']} js-button-audio-a11y`}
            onClick={toggleAudioA11y}>
            <Icon name={config.audio ? 'pause' : 'play'} />{' '}
            <span>{config.audio ? i18n[lang].audioActive : i18n[lang].audioPause}</span>
          </button>
        </li>

        <li className={css['list__item']}>
          <button
            aria-label={i18n[lang].a11y}
            aria-pressed={expanded.a11y}
            className={`${css['menu-a11y__button']} js-button-a11y`}
            onClick={() => handleExpanded(MenuOptions.A11Y)}>
            <Icon name="a11y" /> <span>{i18n[lang].a11y}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
