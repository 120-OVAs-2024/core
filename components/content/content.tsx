import { useEffect } from 'react';
import { motion } from 'framer-motion';

import type { VideoURLs } from '@/shared/hooks/useInterpreter';
import { useInterpreter } from '@/shared/hooks/useInterpreter';

import css from './content.module.css';

interface Props {
  addClass?: string;
  children: React.ReactNode;
  interpreter?: VideoURLs;
}

export const Content: React.FC<Props> = ({ addClass, children, interpreter, ...props }) => {
  const [updateVideoSources] = useInterpreter();

  useEffect(() => {
    if (!interpreter) return;
    updateVideoSources({ mode: 'fixed', ...interpreter });
  }, [interpreter, updateVideoSources]);

  return (
    <motion.section
      className={`${css['content']} ${addClass ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}>
      {children}
    </motion.section>
  );
};
