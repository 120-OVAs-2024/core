import { useEffect } from 'react';
import { Audio, useMedia } from 'books-ui';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useBackground } from '@shared/hooks/useBackground';
import { focusMainElement } from '@shared/utils/focusMain';

import { useOvaContext } from '@/context/ova-context';

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

const i18n = {
  es: {
    label: 'Iniciar'
  },
  en: {
    label: 'Start'
  }
};

export const CoverTitle: React.FC<Props> = ({ title, url = 'assets/base/cover.webp', audio }) => {
  const [, setBackground] = useBackground();
  const { lang } = useOvaContext();

  const currentURL = useMedia(['(max-width: 1024px)'], ['assets/base/cover-mobile.webp'], url);

  useEffect(() => {
    setBackground(currentURL);
  }, [currentURL, setBackground]);

  return (
    <motion.section
      className={css['cover-title']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <div className={css['cover-title__audio']}>{audio ? <Audio a11y src={audio.a11y} /> : null}</div>
      <div className={`${css['cover-title__title']} u-px-9`}>
        {audio ? <Audio src={audio.title} type="button" addClass="u-mx-auto" /> : null}
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <Link
          to="/page-1"
          className={css['cover-title__link']}
          aria-label={i18n[lang].label}
          onClick={focusMainElement}>
          {i18n[lang].label} <Icon name="arrow-right-home" />
        </Link>
      </div>
    </motion.section>
  );
};
