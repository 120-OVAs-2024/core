import { useCallback, useLayoutEffect, useState } from 'react';
import { useHashLocation } from 'wouter/use-hash-location';

import { useOvaContext } from '@/context/ova-context';

import { Footer } from '../footer';
import { Header } from '../header';

const HOME_PATH = '/';
const PATH_REGEX = /\/page-(\d+)/;
interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [location] = useHashLocation();
  const { titles, baseTitle } = useOvaContext();

  /**
   * Actualiza el título de la página según la página actual.
   */
  const updatePageTitle = useCallback(() => {
    const currentPageTitle = titles[currentPage - 1];

    if (currentPageTitle) {
      document.title = currentPageTitle;
    } else {
      document.title = baseTitle;
    }
  }, [titles, currentPage, baseTitle]);

  /**
   * Actualiza el estado de la página actual basado en la URL.
   * Se ejecuta después de que los cambios de diseño del DOM se han aplicado.
   */
  useLayoutEffect(() => {
    const currentPageNumber = (location.match(PATH_REGEX) || [null, '0'])[1];
    setCurrentPage(+currentPageNumber);
    updatePageTitle();
  }, [location, updatePageTitle]);

  return (
    <>
      <Header />
      <main id="#main">{children}</main>
      {location !== HOME_PATH ? <Footer currentPage={currentPage} /> : null}
    </>
  );
};
