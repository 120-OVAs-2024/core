import { motion } from 'framer-motion';

import css from './content.module.css';

interface Props {
  addClass?: string;
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ addClass, children, ...props }) => {
  console.log('Content component render 🦑');
  return (
    <motion.section
      className={`${css['content']} ${addClass ?? ''}`}
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      {...props}
    >
      {children}
    </motion.section>
  );
};
