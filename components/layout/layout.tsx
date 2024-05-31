import { useLayoutEffect, useState } from 'react';
import { useHashLocation } from 'wouter/use-hash-location';

import { Footer } from '../footer';
import { Header } from '../header';

const HOME_PATH = '/';
const PATH_REGEX = /\/page-(\d+)/;
interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [location] = useHashLocation();
  const [currentPage, setCurrentPage] = useState<number>(0);

  /**
   * Actualiza el estado de la página actual basado en la URL.
   * Se ejecuta después de que los cambios de diseño del DOM se han aplicado.
   */
  useLayoutEffect(() => {
    const currentPageNumber = parseInt((location.match(PATH_REGEX) || ['0'])[1])
    setCurrentPage(currentPageNumber);
  }, [location]);

  return (
    <>
      <Header />
      <main id="#main">{children}</main>
      {location !== HOME_PATH ? <Footer currentPage={currentPage} /> : null}
    </>
  );
};
