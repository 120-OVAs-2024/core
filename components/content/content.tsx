import { motion } from 'framer-motion';

import css from './content.module.css';

interface Props {
  addClass?: string;
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ addClass, children, ...props }) => {
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
