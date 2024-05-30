import { Pagination } from 'books-ui';
import { useLocation } from 'wouter';

import css from './footer.module.css';

export const Footer = () => {
  const [, setLocation] = useLocation();

  const handleNavigation = (_, value) => {
    setLocation(`page-${value}`);
  };

  return (
    <footer className={css['footer']}>
      <Pagination count={2} onChange={handleNavigation} />
    </footer>
  );
};
