import { Pagination } from 'books-ui';
import { Link, useLocation } from 'wouter';

import { useOvaContext } from '@/context/ova-context';
import { focusMainElement } from '@/shared/utils/focusMain';

import { Icon } from '../icon';

import { i18n, ICON_TYPE, PAGINATION_ITEM_TYPE, QUARTER } from './consts';
import type { PaginationItemProps, PaginationItemType, Props } from './types';

import css from './footer.module.css';

export const Footer: React.FC<Props> = ({ currentPage }) => {
  const [, navigate] = useLocation();
  const { routes, lang } = useOvaContext();

  /**
   * Maneja la navegación cuando se cambia la página en la paginación.
   */
  const handleNavigation = (_: React.MouseEvent<HTMLButtonElement>, value: number) => {
    navigate(`/page-${value}`);
  };

  // Calcula el número de elementos límite para la paginación
  const boundaryCount = Math.floor(routes.length / QUARTER);

  return (
    <footer className={css['footer']}>
      <Pagination
        boundaryCount={boundaryCount}
        siblingCount={1}
        count={routes.length}
        addClass="js-pagination-element"
        defaultPage={currentPage}
        onChange={handleNavigation}
        renderItem={(item) => <PaginationItem item={item} lang={lang} />}
      />
    </footer>
  );
};

const PaginationItem: React.FC<PaginationItemProps> = ({ item, lang }) => {
  const { onClick, type, page, disabled } = item;

  /**
   * Maneja el evento de clic en el ítem de paginación.
   *
   * @param event - Evento de clic
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    focusMainElement();
  };

  return type === PAGINATION_ITEM_TYPE.PAGE ? (
    <Link
      to={`/page-${page}`}
      className={css['footer__nav-link']}
      onClick={focusMainElement}
      aria-current={item['aria-current']}>
      <span className="u-sr-only">Slide</span> {page}
    </Link>
  ) : type === PAGINATION_ITEM_TYPE.NEXT || type === PAGINATION_ITEM_TYPE.PREVIOUS ? (
    <button
      className={`${css['footer__nav-button']} u-px-2 ${type === PAGINATION_ITEM_TYPE.NEXT ? 'js-pagination-link-next' : 'js-pagination-link-previous'}`}
      onClick={handleClick}
      data-type={type}
      data-page={page}
      disabled={disabled}>
      <Icon addClass={css['footer__nav-button-icon']} name={ICON_TYPE[type as PaginationItemType]} />
      <span>{type === PAGINATION_ITEM_TYPE.NEXT ? i18n[lang].next : i18n[lang].previous}</span>
    </button>
  ) : (
    <span className={css['footer__nav-ellipsis']}>...</span>
  );
};
