import { useHashLocation } from 'wouter/use-hash-location';

import { Footer } from '../footer';
import { Header } from '../header';

interface Props {
  paths: string[];
  children: JSX.Element[] | JSX.Element;
}

const HOME_PATH = '/';

export const Layout: React.FC<Props> = ({ paths, children }) => {
  const [location] = useHashLocation();

  console.log('render layout component 🪁', paths)
  return (
    <>
      <Header />
      <main id="#main">{children}</main>
      {location !== HOME_PATH ? <Footer /> : null}
    </>
  );
};
