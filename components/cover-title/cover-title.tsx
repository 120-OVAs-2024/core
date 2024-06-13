import { useEffect } from 'react';
import { Audio } from 'books-ui';
import { Link } from 'wouter';
import { useBackground } from '@shared/hooks/useBackground';
import { focusMainElement } from '@shared/utils/focusMain';

import { Icon } from '../icon';

import css from './cover-title.module.css';

interface Props {
  title: string;
  url?: string;
  audio?: {
    a11y: string;
    title: string;
  };
}

export const CoverTitle: React.FC<Props> = ({ title, url = 'assets/base/cover.webp', audio }) => {
  const [, setBackground] = useBackground();

  useEffect(() => {
    setBackground(url);
  }, [url, setBackground]);

  return (
    <div className={css['cover-title']}>
      <div className={css['cover-title__audio']}>
        {audio ? <Audio src={audio.a11y} /> : null}
      </div>
      <div className={`${css['cover-title__title']} u-px-9`}>
        {audio ? <Audio src={audio.a11y} type="button" addClass="u-mx-auto" /> : null}
        <h1>{title}</h1>
        <Link to="/page-1" className={css['cover-title__link']} aria-label="Iniciar" onClick={focusMainElement}>
          Iniciar <Icon name="arrow-right-home" />
        </Link>
      </div>
    </div>
  );
};
