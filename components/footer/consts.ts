import { PaginationItemType } from './types';

export const QUARTER = 4;

// Constantes para los tipos de ítems de paginación
export const PAGINATION_ITEM_TYPE = {
  PAGE: 'page',
  NEXT: 'next',
  PREVIOUS: 'previous'
};

// Constantes para los tipos de íconos utilizados en los botones de paginación
export const ICON_TYPE: Record<PaginationItemType, string> = {
  page: '',
  next: 'arrow-right-footer',
  previous: 'arrow-left-footer'
};

// Constantes para las etiquetas de navegación en múltiples idiomas
export const i18n = {
  es: {
    previous: 'atrás',
    next: 'siguiente'
  },
  en: {
    previous: 'back',
    next: 'next'
  }
};
